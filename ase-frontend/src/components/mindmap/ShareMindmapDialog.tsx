import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { useState } from "react"

const ShareMindmapDialog = () => {
    const [emails, setEmails] = useState("");
    const [readOnly, setReadOnly] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailList = emails.split(",").map(email => email.trim()).filter(Boolean);
        console.log("Sharing with:", emailList, "Read-only:", readOnly);

        // TODO: Call API to share mindmap
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
                            <Label htmlFor="emails">Email addresses</Label>
                            <Input
                                id="emails"
                                placeholder="example1@mail.com, example2@mail.com"
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

                    <DialogFooter>
                        <Button type="submit">Send Invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ShareMindmapDialog;