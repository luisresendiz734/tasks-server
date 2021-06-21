create table users (
  id varchar(10) not null,
  name varchar(64) not null,
  email varchar(64) not null,
  password varchar(64) not null,
  primary key (id)
);

create table tasks (
  id varchar(10) not null,
  text varchar(255) not null,
  userId varchar(10) not null,
  completed boolean not null,
  primary key (id)
);