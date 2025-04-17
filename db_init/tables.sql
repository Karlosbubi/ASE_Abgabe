create table if not exists mindmap_user(
    id serial primary key,
    name text not null,
    email text not null,
    password text not null,
    isAdmin bool not null,
    constraint unique_email unique (email)
);

create table if not exists mindmap (
    id serial primary key,
    title text,
    owner int not null,
    graph jsonb not null,
    foreign key (owner) references mindmap_user(id) on delete cascade
);

create table if not exists mindmap_rights (
      mindmap_user int not null,
      mindmap int not null,
      can_read bool not null,
      can_write bool not null,
      foreign key (mindmap_user) references mindmap_user(id) on delete cascade,
      foreign key (mindmap) references mindmap(id) on delete cascade,
      primary key (mindmap_user, mindmap),
      constraint write_implies_read
          check (not (can_write = true and can_read = false))
);
