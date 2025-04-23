import { useEffect, useState } from "react";
import NavBar from "../navigation/NavBar.tsx";
import { GetCurrentUser } from "../../utils/storageWrapper.ts";
import AllUsersCard from "../admin/AllUsersCard.tsx";

const user = GetCurrentUser();

const getIsAdmin = async () => {
    if (!user?.JWT) throw new Error("User not authenticated.");
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${user?.JWT}` },
    };

    const response = await fetch(`http://localhost:3000/user/`, requestOptions);
    const data = await response.json();

    return data.isadmin;
};

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            try {
                const result = await getIsAdmin();
                setIsAdmin(result);
            } catch (error) {
                console.error("Failed to fetch admin status", error);
                setIsAdmin(false);
            }
        };

        fetchIsAdmin();
    }, []);

    if (isAdmin === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />

            <main className="pt-16">
                <div className="flex justify-center items-start h-screen pt-20 bg-gray-200">
                    {isAdmin ? (
                        <AllUsersCard />
                    ) : (
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="text-center font-bold text-lg mb-4">
                                <h1> Danger Zone </h1>
                            </div>
                            <p> You are not logged in as Admin </p>
                            <p> state: {isAdmin} </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default AdminDashboard;