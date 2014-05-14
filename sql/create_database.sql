-- Create user 'letters_user' for local access
CREATE USER 'letters_user'@'localhost' IDENTIFIED BY 'letters_user';
-- Create user 'letters_user'for remot access
CREATE USER 'letters_user'@'%' IDENTIFIED BY 'letters_user';
-- Create database letters_game_db
CREATE DATABASE letters_game_db
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;
-- Grant previleges for the users
GRANT ALL PRIVILEGES ON letters_game_db.* TO 'letters_user'@'localhost' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON letters_game_db.* TO 'letters_user'@'%' WITH GRANT OPTION;