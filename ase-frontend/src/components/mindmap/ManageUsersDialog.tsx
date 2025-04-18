import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../../utils/storageWrapper.ts";

type ManageUsersDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    mindmapId: number;
};

const ManageUsersDialog = ({ isOpen, onClose, mindmapId }: ManageUsersDialogProps) => {
    const [users, setUsers] = useState<{ email: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const user = GetCurrentUser();
            if (!user || !user.JWT) {
                throw new Error("User not authenticated.");
            }

            const response = await fetch(`http://localhost:3000/mindmap/${mindmapId}/share`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${user.JWT}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch users.");
            }

            const data = await response.json();

            const combinedUsers = [
                ...data.edit.map((user: { email: string }) => user),
                ...data.read_only.map((user: { email: string }) => user),
            ];

            setUsers(combinedUsers);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An error occurred");
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen, mindmapId]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Users List</DialogTitle>
                </DialogHeader>
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <ul className="py-4">
                    {/* Dynamisch geladene Nutzer anzeigen */}
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <li key={index} className="py-2">
                                {user.email}
                            </li>
                        ))
                    ) : (
                        <li className="py-2">No users found</li>
                    )}
                </ul>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ManageUsersDialog;