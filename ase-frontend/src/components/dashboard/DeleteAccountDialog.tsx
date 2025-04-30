import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import toast from "react-hot-toast";
import {ClearCurrentUser, GetCurrentUser} from "@/utils/storageWrapper.ts";

const DeleteAccountDialog = ({ isOpen, onClose }: {
    isOpen: boolean,
    onClose: () => void
}) => {
    const handleDelete = async () => {
        const user = GetCurrentUser();
        if (!user?.JWT) {
            toast.error("Unauthorized, please log in again.");
            return;
        }

        const toastId = toast.loading("Deleting your account...");

        try {
            const response = await fetch("http://localhost:3000/user", {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.JWT}`,
                }
            });

            if (response.ok) {
                toast.dismiss(toastId);
                toast.success("Account deleted successfully.");

                ClearCurrentUser();

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                toast.dismiss(toastId);
                switch (response.status) {
                    case 401:
                        toast.error("Unauthorized, remember to include your Bearer Token");
                        break;
                    case 404:
                        toast.error("No User with this id");
                        break;
                    case 500:
                        toast.error("Internal server error");
                        break;
                    default:
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
                    <DialogTitle>Delete Account</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-center text-gray-700">Are you sure you want to permanently delete your account?</p>
                </div>
                <DialogFooter className="flex justify-center gap-4">
                    <Button data-testid="delete-user-yes-button" variant="destructive" onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        No
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountDialog;