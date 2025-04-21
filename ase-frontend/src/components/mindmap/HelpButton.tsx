import { useState } from 'react';

const HelpButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 text-black text-lg font-bold flex items-center justify-center shadow-md"
                title="Help"
            >
                ?
            </button>
            {open && (
                <div className="absolute top-10 right-0 bg-white text-sm text-black p-4 rounded-xl shadow-xl w-72 z-50">
                    <p className="mb-2 font-semibold">How to use the Mindmap</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>➕ Add node:</strong> Drag from one of the two small dots on an existing node.
                            Releasing the mouse creates a new node at the end of the line.
                        </li>
                        <li>
                            <strong>🗑️ Delete node:</strong> Select a node (it will be
                            <span className="font-semibold text-[oklch(0.7_0.2_160)]"> highlighted</span>,
                            then press <kbd>Delete</kbd> or <kbd>Backspace</kbd>. The selected node and all its children
                            will be deleted.
                        </li>
                        <li>
                            <strong>✏️ Rename node:</strong> Click on the text of a node to rename it.
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HelpButton;