import {useEffect, useState} from "react";
import {GetCurrentUser} from "@/utils/storageWrapper.ts";
import {Usr} from "@/DTO/usr.ts";

const user = GetCurrentUser();
const getAllUsers = async () => {
    if (!user?.JWT) throw new Error("User not authenticated.");
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${user?.JWT}` },
    };

    const response = await fetch(`http://localhost:3000/admin/allUsers`, requestOptions);
    return await response.json();

};

// AHHHHHHHH das soll so nicht sein
function isFoo(bool: boolean){
    if (bool) {
        return "Frue"
    } else {
        return "False";
    }
}

const AllUsersCard = () => {
    const [allUsers, setAllUsers] = useState<Usr[]>([]); // Oder passender Typ

    useEffect(() => {
        getAllUsers().then(users => {
            setAllUsers(users);
        });
    }, []);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-center font-bold text-lg mb-4">
                <h1>Users</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">IsAdmin</th>
                        <th className="py-2 px-4 border-b">IsSuspended</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allUsers.map((user: Usr) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{isFoo(user.isadmin)}</td>
                            <td className="py-2 px-4 border-b">{isFoo(user.issuspended)}</td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsersCard;