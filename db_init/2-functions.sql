\c postgres

CREATE OR REPLACE FUNCTION check_mindmap_owner()
    RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM mindmap WHERE id = NEW.mindmap AND owner = NEW.mindmap_user) THEN
        RAISE EXCEPTION 'mindmap_user cannot be the owner of the mindmap';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_mindmap_rights_owner_check
    BEFORE INSERT OR UPDATE ON mindmap_rights
    FOR EACH ROW
EXECUTE FUNCTION check_mindmap_owner();