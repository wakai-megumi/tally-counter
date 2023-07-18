import React from 'react';
import PropTypes from 'prop-types';
import "../styles/Counter.css"
const Counter = ({ counter, onIncrement, onDecrement, onReset, onCounterNameChange, onCounterValueChange, onDelete }) => {
    return (
        <div className="counter">
            <button className='delete' onClick={onDelete}>X</button>
            <h3 className="counter__name">{counter.name}</h3>
            <p className="counter__value">Value: {counter.value}</p>
            <button className="counter__button" onClick={onDecrement}>Decrease</button>
            <button className="counter__button" onClick={onIncrement}>Increase</button>
            <button className="counter__button" onClick={onReset}>Reset</button>
            <div className='set-countername'>
                <label htmlFor='countername'>Counter Name:</label>
                <input
                    id='countername'
                    type='text'
                    value={counter.name}
                    onChange={(e) => onCounterNameChange(e.target.value)}
                />

                <label htmlFor='startvalue'>Start Value:</label>
                <input
                    id='startvalue'
                    type='number'
                    value={counter.value}
                    onChange={(e) => onCounterValueChange(Number(e.target.value))}
                />
            </div>
        </div>
    );
};

Counter.propTypes = {
    counter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onCounterNameChange: PropTypes.func.isRequired,
    onCounterValueChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Counter;
