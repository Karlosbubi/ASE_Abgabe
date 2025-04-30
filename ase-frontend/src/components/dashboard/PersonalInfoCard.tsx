import React from "react";
import { useQuery } from "react-query";
import { GetCurrentUser } from "@/utils/storageWrapper.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface PersonalInfoCardProps {
    name: string | undefined;
    email: string | undefined;
    onChangeInfo: () => void;
    onChangePassword: () => void;
    onDeleteAccount: () => void;
}

interface MindmapList {
    own: { id: number; title: string }[];
    edit: { id: number; title: string }[];
    read_only: { id: number; title: string }[];
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ name, email, onChangeInfo, onChangePassword, onDeleteAccount }) => {
    const user = GetCurrentUser();
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery<MindmapList, Error>({
        queryKey: ["get_mindmap_list"],
        queryFn: async () => {
            if (!user || !user.JWT) {
                throw new Error("User not authenticated.");
            }

            const response = await fetch("http://localhost:3000/mindmap", {
                method: "GET",
                headers: { "Authorization": `Bearer ${user.JWT}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        },
        onError: () => {
            toast.error("Failed to load mindmap statistics.");
        }
    });

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="relative w-full max-w-100 mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            {/* Personal Info Card */}
            <div>
                <h2 className="text-xl font-bold">Personal Information</h2>
                <div className="mt-4">
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Enter your name"
                            disabled
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Enter your email"
                            disabled
                        />
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="mt-4">
                <span
                    onClick={onChangeInfo}
                    className="block text-black cursor-pointer underline"
                >
                    Change Information...
                </span>

                <span
                    onClick={onChangePassword}
                    className="block text-black cursor-pointer underline mt-2"
                >
                    Change Password...
                </span>

                <span
                    data-testid="delete-user-popup"
                    onClick={onDeleteAccount}
                    className="block text-red-600 cursor-pointer underline mt-2"
                >
                    Delete Account...
                </span>
            </div>

            {/* Statistik */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">My Statistics</h3>
                <div className="mt-4 flex space-x-6">
                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{isLoading ? "..." : data?.own.length}</span>
                        <span className="text-sm text-gray-500">Owned</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{isLoading ? "..." : data?.edit.length}</span>
                        <span className="text-sm text-gray-500">Shared With Me</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-xl font-bold">{isLoading ? "..." : data?.read_only.length}</span>
                        <span className="text-sm text-gray-500">Read Only</span>
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="mt-4 text-center">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 w-full"
                >
                    My Mindmaps
                </button>
            </div>
        </div>
    );
};

export default PersonalInfoCard;