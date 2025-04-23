import useStore from "../../components/mindmap/Store.tsx";
import {type Node} from "@xyflow/react";

interface MindmapEdge {
    id: string;
    source: string;
    target: string;
}

type SvgStyle = {
  padding: number,

  node_border_width: number,
  node_border_radius: number,
  node_border_color: string,
  node_fill_color: string,
  node_font: string,
  node_fontsize: number,
  node_text_color: string,
  note_font_weight: string | number,

  edge_color: string,
  edge_width: string,
  edge_curve_strenght: number,
}

const createSvgFromMindmap = (nodes: Node[], edges: MindmapEdge[], style: SvgStyle): string => {

  // Calculate the bounding box of the graph
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const padding = style.padding;
  nodes.forEach((node) => {
    const width = node.measured?.width || 100;
    const height = node.measured?.height || 50;
    minX = Math.min(minX, node.position.x - padding);
    minY = Math.min(minY, node.position.y - padding);
    maxX = Math.max(maxX, node.position.x + width + padding);
    maxY = Math.max(maxY, node.position.y + height + padding);
  });


  const width = maxX - minX;
  const height = maxY - minY;


  // Function to create node SVG
  const createNodeSvg = (node: Node): string => {
    const width = node.measured?.width || 100;
    const height = node.measured?.height || 50;
    const x = node.position.x - minX;
    const y = node.position.y - minY;
    const label = node.data.label;

    return(
      `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${style.node_fill_color}" stroke="${style.node_border_color}" stroke-width="${style.node_border_width}" rx="${style.node_border_radius}" ry="${style.node_border_radius}"/>`+ '\n' +
      `<text x="${x + width / 2}" y="${y + height / 2}" dominant-baseline="middle" text-anchor="middle" font-size="${style.node_fontsize}" font-family="${style.node_font}" font-weight="${style.note_font_weight}">${label}</text>`
    );
  };
  // Function to create edge SVG
  const createEdgeSvg = (edge: MindmapEdge): string => {
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);

    if (!sourceNode || !targetNode) {
        return '';
    }

    const sourceX = sourceNode.position.x - minX + (sourceNode.measured?.width || 100) / 2;
    const sourceY = sourceNode.position.y - minY + (sourceNode.measured?.height || 50) / 2;
    const targetX = targetNode.position.x - minX + (targetNode.measured?.width || 100) / 2;
    const targetY = targetNode.position.y - minY + (targetNode.measured?.height || 50) / 2;

    return `<line x1="${sourceX}" y1="${sourceY}" x2="${targetX}" y2="${targetY}" stroke="${style.edge_color}" stroke-width="${style.edge_width}" stroke-linecap="round"/>`;
  };

  const nodeSvgs = nodes.map(createNodeSvg).join('\n');
  const edgeSvgs = edges.map(createEdgeSvg).join('\n');

  return (`
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${edgeSvgs}
  ${nodeSvgs}
</svg>
`);
};

function DownloadSVGButton() {
  const edges = useStore(state => state.edges);
  const nodes = useStore(state => state.nodes);
  const title = 'Mindmap' // Get from node

  const style : SvgStyle = {
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
    edge_width: "2"
  }

  const onClick = () => {
    const blob = new Blob([createSvgFromMindmap(nodes, edges, style)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.svg`;
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button onClick={onClick}>
      Export as SVG
    </button>
  );
}

export default DownloadSVGButton;