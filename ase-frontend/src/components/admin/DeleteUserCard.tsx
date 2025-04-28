import React from "react";
import {GetCurrentUser} from "@/utils/storageWrapper.ts";
import toast from "react-hot-toast";

const DeleteUserCard = () => {
    const user = GetCurrentUser();
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            id: e.target.ID.value,
        }

        console.log(dto);

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user?.JWT}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto),
        };

        try {
            const response = await fetch("http://localhost:3000/user", requestOptions);
            if (response.status === 200) {
                toast.success("User Deleted");
            } else {
                toast.error("Error Occurred");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Something went wrong. Please check your connection and try again.");
            console.error("Error:", error);
        }


    }

    return (
        <>
            <div className="bg-white shadow-md rounded pt-6">
                <div className="text-center font-bold text-lg mb-4">
                    <h1>Delete User</h1>
                </div>

                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text" name="ID" data-testid="login-email-input"
                            className="shadow appearance-none border rounded w-full py-2 px-3
                        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="User ID"/>

                        <input type="submit" name="Submit" value="Delete" data-testid="delete-button"
                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                           py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeleteUserCard;