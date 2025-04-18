// ShareMindmapDialog.tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useState } from "react";
import useStore from "./Store.tsx";
import { toast } from "react-hot-toast";
import ManageUsersDialog from "./ManageUsersDialog"; // Importiere die neue Komponente

const ShareMindmapDialog = () => {
    const [emails, setEmails] = useState("");
    const [readOnly, setReadOnly] = useState(false);
    const [isUserListOpen, setIsUserListOpen] = useState(false);
    const mindmapId = useStore((state) => state.currentMindMapId);

    const shareMindMap = useStore((state) => state.shareMindMap);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = emails.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            return toast.error("Please enter an email address.");
        }

        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address.");
        }

        shareMindMap([email], readOnly);
        setEmails("");
    };

    const handleUserListOpen = () => {
        setIsUserListOpen(true);
    };

    const handleUserListClose = () => {
        setIsUserListOpen(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-base font-medium shadow border"
                >
                    Share ...
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Share Mindmap</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="emails">Email address</Label>
                            <Input
                                id="emails"
                                placeholder="example@mail.com"
                                value={emails}
                                onChange={(e) => setEmails(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="readonly"
                                checked={readOnly}
                                onCheckedChange={(val) => setReadOnly(!!val)}
                            />
                            <Label htmlFor="readonly">Read-only access</Label>
                        </div>
                    </div>

                    {/* User List button on the left side of the footer */}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleUserListOpen}
                            className="text-black underline"
                            disabled={!mindmapId}  // Deaktivieren des Buttons, wenn keine Mindmap geladen ist
                        >
                            Manage Users ...
                        </button>

                        <DialogFooter>
                            <Button type="submit">Send Invite</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>

            {mindmapId && (
                <ManageUsersDialog
                    isOpen={isUserListOpen}
                    onClose={handleUserListClose}
                    mindmapId={mindmapId}
                />
            )}
        </Dialog>
    );
};

export default ShareMindmapDialog;