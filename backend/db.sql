-- Active: 1676149430686@@127.0.0.1@3306@reactgram
CREATE DATABASE
    IF NOT EXISTS reactgram DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

USE reactgram;

CREATE TABLE
    IF NOT EXISTS users (
        `id` INT AUTO_INCREMENT,
        `name` VARCHAR(20) NOT NULL,
        `nick` VARCHAR(20) NOT NULL,
        `email` VARCHAR(30) NOT NULL,
        `password` VARCHAR(20) NOT NULL,
        `avatar_url` VARCHAR(1000),
        `cover_url` VARCHAR(1000),
        PRIMARY KEY(id)
    );

INSERT INTO
    reactgram.users (
        `name`,
        `nick`,
        `email`,
        `password`,
        `avatar_url`,
        `cover_url`
    )
VALUES (
        "Gabriel Dias",
        "biel",
        "gabriel.dias.fern@gmail.com",
        "12345678",
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
        "https://c4.wallpaperflare.com/wallpaper/483/576/977/abstract-hexagon-simple-minimalism-wallpaper-preview.jpg"
    );
