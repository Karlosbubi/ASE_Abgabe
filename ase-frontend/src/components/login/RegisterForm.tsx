import React from "react";
import {useNavigate} from "react-router-dom";
import {SetCurrentUserJwt} from "@/utils/storageWrapper.ts";
import toast from 'react-hot-toast';

function RegisterForm() {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        toast.loading("Registering...");

        e.preventDefault();

        const dto = {
            name: e.target.Username.value,
            email: e.target.Email.value,
            password: e.target.Password.value
        };

        console.log(dto);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(dto),
        };

        const response = await fetch("http://localhost:3000/user", requestOptions);

        if (response.status === 400) {
            toast.dismiss();
            toast.error("Email already exists! Please use another email and try again.")
            return;
        } else if (response.status === 500) {
            toast.dismiss();
            toast.error("Internal Server Error! Please try again later.")
            return;
        } else if (response.status === 201) {
            const loginDto = {
                email: dto.email,
                password: dto.password
            };

            const loginRequestOptions = {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(loginDto),
            };

            await fetch("http://localhost:3000/auth", loginRequestOptions).then( async response => {
                const json = await response.json();
                console.log(json);
                SetCurrentUserJwt(json.JWT);
                navigate("/");
                toast.dismiss()
                toast.success("Registered successfully.");
            });
        } else {
            console.error(`Unexpected status code: ${response.status}`);
            return;
        }
    };

    return <>
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-center font-bold text-lg mb-4">
                    <h1>Register</h1>
                </div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input type="text" name="Email" data-testid="register-email-input"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username:
                    <input type="text" name="Username" data-testid="register-name-input"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                    <input type="password" name="Password" data-testid="register-password-input"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label>
                    <input type="submit" name="Submit" value="Register Now" data-testid="register-now-button"
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                </label>

            </form>
        </div>
    </>
}

export default RegisterForm;