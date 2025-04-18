import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../../utils/storageWrapper.ts";
import { Trash2, Check, X } from "lucide-react";
import toast from "react-hot-toast";

type ManageUsersDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    mindmapId: number;
};

type UserEntry = {
    id: number;
    email: string;
};

const ManageUsersDialog = ({ isOpen, onClose, mindmapId }: ManageUsersDialogProps) => {
    const [editUsers, setEditUsers] = useState<UserEntry[]>([]);
    const [readOnlyUsers, setReadOnlyUsers] = useState<UserEntry[]>([]);
    const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const user = GetCurrentUser();
            if (!user?.JWT) throw new Error("User not authenticated.");

            const res = await fetch(`http://localhost:3000/mindmap/${mindmapId}/share`, {
                method: "GET",
                headers: { Authorization: `Bearer ${user.JWT}` },
            });

            if (!res.ok) throw new Error("Failed to fetch users.");

            const data = await res.json();
            setEditUsers(data.edit || []);
            setReadOnlyUsers(data.read_only || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An unknown error occurred");
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false); // ← 🔧 Das hat gefehlt!
        }
    };

    const handleRemoveUser = async (userId: number) => {
        const user = GetCurrentUser();
        if (!user?.JWT) {
            toast.error("User not authenticated.");
            return;
        }

        const targetUser = [...editUsers, ...readOnlyUsers].find((u) => u.id === userId);
        if (!targetUser) {
            toast.error("User not found.");
            return;
        }

        toast.loading("Removing user...");

        try {
            const payload = {
                mindmap: mindmapId,
                recipient_email: targetUser.email,
                can_read: false,
                can_write: false,
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.JWT,
                },
                body: JSON.stringify(payload),
            };

            const response = await fetch("http://localhost:3000/mindmap/share", requestOptions);

            toast.dismiss();

            if (response.ok) {
                toast.success("User removed.");
                await fetchUsers();
            } else if (response.status === 401) {
                toast.error(`No rights to remove this user.`);
            } else if (response.status === 403) {
                toast.error("Unauthorized. Please log in again.");
            } else if (response.status === 404) {
                toast.error("Mindmap or user not found.");
            } else {
                const errorText = await response.text();
                console.error(`Unexpected error (${response.status}):`, errorText);
                toast.error("Failed to remove user.");
            }
        } catch (error) {
            toast.dismiss();
            console.error("Error removing user:", error);
            toast.error("An error occurred while removing the user.");
        } finally {
            setConfirmingDelete(null);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchUsers();
        }
    }, [isOpen, mindmapId]);

    const UserRow = ({ user }: { user: UserEntry }) => {
        return (
            <div
                className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
            >
                <span className="text-sm text-gray-800 truncate">{user.email}</span>
                <div className="flex items-center gap-2 ml-2">
                    {confirmingDelete === user.id ? (
                        <>
                            <button
                                onClick={() => handleRemoveUser(user.id)}
                                className="text-green-600 hover:text-green-800"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                onClick={() => setConfirmingDelete(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={16} />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setConfirmingDelete(user.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const renderUserList = (users: UserEntry[]) => (
        <div className="space-y-2">
            {users.length > 0 ? (
                users.map((user) => <UserRow key={user.id} user={user} />)
            ) : (
                <span className="text-gray-400 text-sm">No users</span>
            )}
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Manage Access</DialogTitle>
                </DialogHeader>

                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}

                {!loading && !error && (
                    <div className="space-y-4 py-4">
                        <div>
                            <h3 className="font-medium text-sm text-gray-600 mb-2">Edit Access</h3>
                            {renderUserList(editUsers)}
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-gray-600 mb-2">Read-Only Access</h3>
                            {renderUserList(readOnlyUsers)}
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ManageUsersDialog;