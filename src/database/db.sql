create table links (
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);

alter table links
    add primary key (id);

alter table links
    modify id int(11) not null auto_increment, auto_increment =2;