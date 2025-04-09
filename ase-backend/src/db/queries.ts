import pg from 'pg';
import { MindmapNode } from './types/mindmap_node';

export async function get_mindmap_nodes(client: pg.Client, id: number) {
  const res = await client.query<MindmapNode>(
    'select * from get_mindmap_nodes($1)',
    [id],
  );
  return res.rows;
}
