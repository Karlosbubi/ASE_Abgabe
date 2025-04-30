import React from "react";
import {GetCurrentUser} from "@/utils/storageWrapper.ts";
import toast from "react-hot-toast";

const BanUserCard = () => {
    const user = GetCurrentUser();
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = e.target.ID.value;
        const dto = {
            userId: Number(userId),
            suspension: true,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user?.JWT}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto),
        };

        try {
            const response = await fetch(`http://localhost:3000/admin/suspendUser`, requestOptions);
            if (response.ok) {
                toast.success("User Suspended Successfully!");
                //window.location.reload();
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
                    <h1>Ban User</h1>
                </div>

                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text" name="ID"
                            className="shadow appearance-none border rounded w-full py-2 px-3
                        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="User ID"/>

                        <input type="submit" name="Submit" value="Ban" data-testid="ban-button"
                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold
                           py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default BanUserCard;