import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Info:", { newName, newEmail });

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