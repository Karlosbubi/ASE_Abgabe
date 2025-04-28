\c postgres

insert into mindmap_user(name, email, password, isadmin) VALUES
    ('example_admin', 'admin@example.com', 'admin', true);

insert into mindmap_user(name, email, password, isadmin) VALUES
    ('example_user', 'user@example.com', 'user', false);