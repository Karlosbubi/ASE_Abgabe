create table if not exists mindmap_node (
    id serial primary key,
    title text,
    content text,
    parent int,
    foreign key (parent) references mindmap_node(id)
);

create table if not exists "user" (
    id serial primary key,
    name text,
    email text,
    password text
);

create table if not exists mindmaps (
    id serial primary key,
    owner int not null,
    start_node int not null,
    foreign key (owner) references "user"(id),
    foreign key (start_node) references mindmap_node(id)
);