import React, { useState } from 'react';
import Auth from "./Authentication/Auth";
import "../styles/Authbutton.css"
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getAuth } from "firebase/auth";
import { app } from "../FireBase"
import { clearUser } from '../redux-utils/UserReducers';


const Authbutton = () => {
    const user = useSelector((state) => state.user);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const auth = getAuth(app);

    const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            // User logged out successfully
            dispatch(clearUser())
            toast.success('User logged out successfully')
            window.location.reload();

        } catch (error) {
            console.log(error.message);
            // Handle log-out error
            toast.error("error occurs")
        }
    };
    const handleAuthToggle = () => {
        setIsAuthOpen(!isAuthOpen);
    };

    return (
        <div className='authbutton'>
            <button onClick={user.user === null ? handleAuthToggle : handleSignOut} >{

                user.user === null ? "Sign In" : "Sign Out"

            }</button>
            {isAuthOpen && <Auth open={setIsAuthOpen} />}
        </div>
    );
};

export default Authbutton;
