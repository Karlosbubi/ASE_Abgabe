import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { GetCurrentUser } from "@/utils/storageWrapper.ts";
import { User } from "@/DTO/user.ts";
import toast from "react-hot-toast";

const ChangeInfoDialog = ({ isOpen, onClose, name, email }: {
    isOpen: boolean,
    onClose: () => void,
    name: string | undefined,
    email: string | undefined
}) => {
    const [isNameChecked, setIsNameChecked] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [newName, setNewName] = useState(name || "");
    const [newEmail, setNewEmail] = useState(email || "");

    useEffect(() => {
        setNewName(name || "");
        setNewEmail(email || "");
    }, [name, email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Info:", { newName, newEmail });

        const toastId = toast.loading("Updating user information...");

        let updateUser: Partial<User> = {};

        if (isNameChecked && isEmailChecked) {
            updateUser = {
                name: newName,
                email: newEmail
            };
        } else if (isNameChecked && !isEmailChecked) {
            updateUser = {
                name: newName
            };
        } else if (!isNameChecked && isEmailChecked) {
            updateUser = {
                email: newEmail
            };
        }

        const user = GetCurrentUser();
        if (!user?.JWT) {
            toast.error("You must be logged in to update user information.");
            toast.dismiss(toastId);
            return;
        }

        try {
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.JWT,
                },
                body: JSON.stringify(updateUser),
            };

            const response = await fetch("http://localhost:3000/user", requestOptions);

            if (response.ok) {
                toast.dismiss(toastId);
                toast.success("User information updated successfully.");
            } else {
                switch (response.status) {
                    case 401:
                        toast.dismiss(toastId);
                        toast.error("Unauthorized. Please log in again.");
                        break;
                    case 404:
                        toast.dismiss(toastId);
                        toast.error("No user found with the provided ID.");
                        break;
                    case 500:
                        toast.dismiss(toastId);
                        toast.error("Internal server error. Please try again later.");
                        break;
                    default:
                        toast.dismiss(toastId);
                        toast.error("An unknown error occurred.");
                        break;
                }
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Something went wrong. Please try again later.");
            console.error(error);
        }

        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change Personal Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Name bearbeiten */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Checkbox
                                    id="editName"
                                    checked={isNameChecked}
                                    onCheckedChange={(val) => setIsNameChecked(!!val)}
                                    className="w-5 h-5 border-2 border-black rounded-sm checked:bg-black checked:border-black mr-2"
                                />
                                <label htmlFor="newName" className="block text-gray-700">Edit Name</label>
                            </div>
                            {isNameChecked && (
                                <Input
                                    id="newName"
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter new name"
                                />
                            )}
                        </div>

                        {/* Email bearbeiten */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Checkbox
                                    id="editEmail"
                                    checked={isEmailChecked}
                                    onCheckedChange={(val) => setIsEmailChecked(!!val)}
                                    className="w-5 h-5 border-2 border-black rounded-sm checked:bg-black checked:border-black mr-2"
                                />
                                <label htmlFor="newEmail" className="block text-gray-700">Edit Email</label>
                            </div>
                            {isEmailChecked && (
                                <Input
                                    id="newEmail"
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="Enter new email"
                                />
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeInfoDialog;