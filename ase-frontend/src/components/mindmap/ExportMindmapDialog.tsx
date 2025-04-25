import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent,
} from "../ui/select.tsx";
import { useState } from "react";
import useStore from "../mindmap/Store.tsx"; // Importiere deinen Store
import { createSvgFromMindmap } from "@/utils/createSvgFromMindmap.ts";
import { exportSvgAsPng } from "@/utils/exportSvgAsPng";

const ExportImageDialog = () => {
    const [format, setFormat] = useState<"png" | "svg">("png");
    const { centerMindmapForExport } = useStore(); // Holen der Funktion aus dem Zustand

    const handleExport = async () => {
        const centeredNodes = centerMindmapForExport();
        const edges = useStore.getState().edges;
        const title = "mindmap";

        const style = {
            padding: 20,
            node_border_width: 2,
            node_border_radius: 10,
            node_border_color: "black",
            node_fill_color: "white",
            node_font: "Helvetica",
            node_fontsize: 16,
            note_font_weight: "bold",
            node_text_color: "black",
            edge_color: "black",
            edge_width: "2",
        };

        const svgString = createSvgFromMindmap(centeredNodes, edges, style);

        if (format === "svg") {
            const blob = new Blob([svgString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${title}.svg`;
            a.click();
            URL.revokeObjectURL(url);
        } else if (format === "png") {
            await exportSvgAsPng(svgString, title);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-base font-medium shadow border">
                    Export ...
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Export Mindmap</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Label htmlFor="format-select">Choose format</Label>
                    <Select
                        value={format}
                        onValueChange={(value) => setFormat(value as "png" | "svg")}
                    >
                        <SelectTrigger className="border rounded-md px-3 py-2">
                            <SelectValue placeholder="Choose format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="svg">SVG</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DialogFooter>
                    <Button onClick={handleExport}>Export</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ExportImageDialog;