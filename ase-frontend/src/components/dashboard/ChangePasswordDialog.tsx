import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "react-feather";
import {GetCurrentUser} from "@/utils/storageWrapper.ts";

const ChangePasswordDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Updating password...");

        const user = GetCurrentUser();
        if (!user?.JWT) {
            toast.error("You must be logged in to update your password.");
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
                body: JSON.stringify({
                    password: password,
                }),
            };

            const response = await fetch("http://localhost:3000/user", requestOptions);

            if (response.ok) {
                toast.dismiss(toastId);
                toast.success("Password updated successfully.");
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

        setPassword("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="password" className="block">New Password</label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-2 text-gray-500"
                                >
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Change Password</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordDialog;