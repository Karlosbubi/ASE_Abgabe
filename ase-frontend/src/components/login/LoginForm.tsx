import React from "react";
import { SetCurrentUserJwt } from "@/utils/storageWrapper.ts";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Logging you in...");

        const dto = {
            email: e.target.Email.value,
            password: e.target.Password.value
        };

        console.log(dto);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto),
        };

        try {
            const response = await fetch("http://localhost:3000/auth", requestOptions);

            if (!response.ok) {
                toast.dismiss();
                switch (response.status) {
                    case 401:
                        toast.error("The email or password you entered is incorrect. Please try again.");
                        break;
                    case 500:
                        toast.error("Internal server error. Please try again later.");
                        break;
                    default:
                        toast.error("An unexpected error occurred. Please try again later.");
                        break;
                }
                return;
            }

            const json = await response.json();
            console.log(json);

            SetCurrentUserJwt(json.JWT);
            navigate("/");

            toast.dismiss();
            toast.success("Logged in successfully.");

        } catch (error) {
            toast.dismiss();
            toast.error("Something went wrong. Please check your connection and try again.");
            console.error("Error during login:", error);
        }
    };

    return <>
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-center font-bold text-lg mb-4">
                    <h1>Login</h1>
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input type="text" name="Email" data-testid="login-email-input"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                    <input type="password" name="Password" data-testid="login-password-input"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label>
                    <input type="submit" name="Submit" value="Log In" data-testid="log-in-button"
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                </label>

            </form>
        </div>
    </>
}

export default LoginForm;