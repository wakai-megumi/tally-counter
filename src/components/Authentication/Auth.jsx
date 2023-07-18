import React, { useEffect, useState } from 'react';
import "../../styles/Auth.css"
import { toast } from 'react-hot-toast';
import { app, firestore } from '../../FireBase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../../src/redux-utils/UserReducers';
const Auth = ({ open }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector((state) => state.user); // Access the user state from the Redux store
    console.log(user);
    const dispatch = useDispatch();

    const auth = getAuth(app);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    //////////////////////////////////////


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in

                dispatch(setUser(user.email));
                // reload the page
                // window.location.reload();
            } else {
                // User is signed out
                dispatch(clearUser());

            }
        });

        return () => unsubscribe();
    }, [dispatch]);



    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // User signed up successfully

            toast.success('User signed up successfully')
        } catch (error) {
            console.log(error.message);
            // Handle sign-up error
            if (error.message === 'Firebase: Error (auth/email-already-in-use).')
                toast.error("email already in use")

        }
    };

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // User logged in successfully
            toast.success('User logged in successfully')
            open(false)
            window.location.reload();


        } catch (error) {
            console.log(error.message);
            // Handle log-in error
            if (error.message === "Firebase: Error (auth/user-not-found).")
                toast.error("user not found")
            toast.error("error occurs")

        }
    };


    return (
        <div className='auth-container '>
            <h2>Authentication</h2>
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
            />


            <button onClick={handleSignUp} >Sign Up</button>
            <button onClick={handleSignIn}>Sign In</button>




        </div >
    );
};

export default Auth;

Auth.propTypes = {
    open: PropTypes.func.isRequired,
};
