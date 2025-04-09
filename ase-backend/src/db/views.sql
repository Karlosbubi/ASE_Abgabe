CREATE OR REPLACE FUNCTION get_mindmap_nodes(mindmap_id INT)
    RETURNS TABLE
            (
                node_id INT,
                title   TEXT,
                content TEXT,
                parent  INT
            )
AS
$$
BEGIN
    RETURN QUERY
        WITH RECURSIVE mindmap_tree
AS (SELECT mn.id,
           mn.title,
           mn.content,
           mn.parent
    FROM mindmap_node mn
             JOIN
         mindmaps m ON mn.id = m.start_node
    WHERE m.id = mindmap_id

    UNION ALL

    SELECT mn.id,
           mn.title,
           mn.content,
           mn.parent
    FROM mindmap_node mn
             JOIN
         mindmap_tree mt ON mn.parent = mt.id)
        SELECT id AS node_id,
               title,
               content,
               parent
        FROM mindmap_tree;
END;
$$ LANGUAGE plpgsql;
