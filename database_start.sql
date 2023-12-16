CREATE DATABASE webpost;

use webpost;

create TABLE rol(
    id int not null auto_increment primary key,
    nombre varchar(255) not null
);

create table categoria(
    id int not null auto_increment primary key,
    nombre varchar(255) not null
);

CREATE TABLE usuario(
    id int not null auto_increment primary key,
    nombre varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    rol_id int not null,
    constraint FK_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol(id)
);

create TABLE post(
    id int not null auto_increment primary key,
    usuario_id int not null,
    categoria_id int not null,
    titulo varchar(255) not null,
    cuerpo varchar(255) not null,
    veces_leido int not null ,
    me_gusta int not null,
    fecha_creacion date not null,
    constraint FK_post_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    constraint FK_post_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);


INSERT INTO categoria (id, nombre) VALUES
(1, 'base de datos'),
(2, 'Sql'),
(3, 'MySQL'),
(4, 'PHP'),
(5, 'Spring Boot'),
(6, 'Java'),
(7, 'Css'),
(8, 'Software'),
(9, 'Framework'),
(10, 'JavaScript');


INSERT into rol (nombre) values ('admin'), ('usuario');