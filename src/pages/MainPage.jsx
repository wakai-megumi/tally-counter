import React, { useEffect, useState } from 'react';
import Counter from '../components/Counter';
import "../styles/MainPage.css"
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../FireBase';
import { useSelector } from 'react-redux';


const MainPage = () => {
    const [counters, setCounters] = useState([]);
    const [newCounterName, setNewCounterName] = useState("counter");
    const [startValue, setStartValue] = useState(0);
    const [userid, setUserId] = useState('');


    const addCounter = () => {
        const newCounter = {
            name: newCounterName,
            value: startValue,
        };

        setCounters((prevCounters) => [...prevCounters, newCounter]);
    };
    const deleteCounter = (id) => {
        const updatedCounters = counters.filter((counter, index) => index !== id);
        setCounters(updatedCounters);
    };


    const incrementCounter = (index) => {
        setCounters((prevCounters) => {
            const updatedCounters = [...prevCounters];
            updatedCounters[index] = {
                ...updatedCounters[index],
                value: updatedCounters[index].value + 1,
            };
            return updatedCounters;
        });
    };
    const decrementCounter = (index) => {
        setCounters((prevCounters) => {
            const updatedCounters = [...prevCounters];
            updatedCounters[index] = {
                ...updatedCounters[index],
                value: updatedCounters[index].value - 1,
            };
            return updatedCounters;
        });
    };




    const resetCounter = (index) => {
        setCounters((prevCounters) => {
            const updatedCounters = [...prevCounters];
            updatedCounters[index].value = startValue;
            return updatedCounters;
        });
    };

    // saving the counter information to the firebae

    const user = useSelector((state) => state.user); // Access the user state from the Redux store
    const email = user.user
    const handleSaveCounters = async () => {
        try {
            if (email === null) {
                console.log('User is not logged in');
                console.log(user)
                return;
            }

            const counterRef = collection(firestore, 'counters');
            const batch = [];
            counters.forEach((counter) => {
                const { name, value } = counter;

                if (name && value !== undefined) {
                    batch.push(addDoc(counterRef, { userId: email, name, value }));
                }
            });

            if (batch.length > 0) {
                await Promise.all(batch);
                console.log('Counters saved successfully!');
            } else {
                console.log('No valid counters to save');
            }
        } catch (error) {
            console.log(error.message);
            // Handle save error
        }
    };
    // getting the data  when the user is logged in
    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const countersRef = collection(firestore, 'counters');
                const q = query(countersRef, where('userId', '==', email));
                const querySnapshot = await getDocs(q);
                const fetchedCounters = querySnapshot.docs.map((doc) => doc.data());
                setCounters(fetchedCounters);
            } catch (error) {
                console.log(error.message);
                // Handle fetch error
            }
        };

        if (user && email) {
            fetchCounters();
        }
    }, [user]);


    return (
        <div className='main-page'>
            <h1>Counter App</h1>

            <div>
                <button onClick={addCounter}>Add Counter</button>
                <button onClick={handleSaveCounters}>Save Counters</button>
            </div>
            <div className='counter-container'>

                {counters.map((counter, index) => (
                    <Counter
                        key={index}
                        counter={counter}
                        onIncrement={() => incrementCounter(index)}
                        onDecrement={() => decrementCounter(index)}
                        onReset={() => resetCounter(index)}
                        onCounterNameChange={(newName) => {
                            const updatedCounters = [...counters];
                            updatedCounters[index].name = newName;
                            setCounters(updatedCounters);
                        }}
                        onCounterValueChange={(newValue) => {
                            const updatedCounters = [...counters];
                            updatedCounters[index].value = newValue;
                            setCounters(updatedCounters);
                        }}
                        onDelete={() => deleteCounter(index)}
                    />
                ))}
            </div>

        </div>
    );
};

export default MainPage;
