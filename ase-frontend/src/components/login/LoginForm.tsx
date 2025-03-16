import React from "react";
import { SetCurrentUserJwt } from "../../utils/storageWrapper.ts";

function LoginForm() {
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            email: e.target.Email.value,
            password: e.target.Password.value
        };

        console.log(dto);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(dto),
        };

        await fetch("http://localhost:3000/auth", requestOptions).then( async response => {
            const json = await response.json();
            console.log(json);
            SetCurrentUserJwt(json.JWT)
        });
    };

    return <>
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-center font-bold text-lg mb-4">
                    <h1>Login</h1>
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input type="text" name="Email"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                    <input type="password" name="Password"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </label>
                <label>
                    <input type="submit" name="Submit" value="Log In"
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                </label>

            </form>
        </div>
    </>
}

export default LoginForm;