import {GetCurrentUser} from "../../utils/storageWrapper.ts";
import React from "react";
const user = GetCurrentUser();

const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto = {
        name: e.target.Name.value,
        email: e.target.Email.value,
        password: null
    }

    console.log(dto);

    const requestOptions = {
        method: 'PATCH',
        headers: {Authorization: `Bearer ${user?.JWT}`},
        body: JSON.stringify(dto),
    };

    await fetch("http://localhost:3000/user", requestOptions).then( async response => {
        const json = await response.json();
        console.log(json);
    });
}

const PersonalInfoCard = () => {
    return (
        <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-center font-bold">Personal Info</h1>

            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:
                <input type="text" name="Name" defaultValue={user?.name}
                       className="w-full px-3 py-2 text-gray-700 border rounded"/>
                </label>

                <label className="block text-gray-700 text-sm font-bold mb-2">E-Mail:
                <input type="text" name="Email" defaultValue={user?.email}
                       className="w-full px-3 py-2 text-gray-700 border rounded"/>
                </label>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    <input type="submit" name="Submit" value="Change"
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                </label>
            </form>
        </div>
    );
};

export default PersonalInfoCard;