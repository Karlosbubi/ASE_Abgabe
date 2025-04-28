import React from "react";

const BanUserCard = () => {
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                            type="text" name="Id" data-testid="login-email-input"
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