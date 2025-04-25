import React from "react";

interface PersonalInfoCardProps {
    name: string | undefined;
    email: string | undefined;
    onChangeInfo: () => void;
    onChangePassword: () => void;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ name, email, onChangeInfo, onChangePassword }) => {
    return (
        <div className="relative w-full max-w-100 mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            {/* Personal Info Card */}
            <div>
                <h2 className="text-xl font-bold">Personal Information</h2>
                <div className="mt-4">
                    {/* Name Input (disabled) */}
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

                    {/* Email Input (disabled) */}
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

            {/* "Change Info" and "Change Password" Links */}
            <div className="mt-4">
                {/* "Change Info" Link */}
                <span
                    onClick={onChangeInfo}
                    className="block text-black cursor-pointer underline"
                >
                    Change Info...
                </span>

                {/* "Change Password" Link */}
                <span
                    onClick={onChangePassword}
                    className="block text-black cursor-pointer underline mt-2"
                >
                    Change Password...
                </span>
            </div>
        </div>
    );
};

export default PersonalInfoCard;