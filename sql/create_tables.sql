-- -- Create word table
-- CREATE TABLE word
-- (
-- 	id INT(6) PRIMARY KEY AUTO_INCREMENT,
-- 	username VARCHAR(10) NOT NULL,
-- 	password VARCHAR(500) NOT NULL,
--         name VARCHAR(50) NOT NULL,
--         surnames VARCHAR(100) 
--         
-- ) ENGINE=InnoDB;
-- Create word table
CREATE TABLE word
(
	id                      INT(6)           PRIMARY KEY        AUTO_INCREMENT      ,
	value                   VARCHAR(20)      NOT NULL           UNIQUE              ,
        number_of_syllabes      INT(1)           NOT NULL                               ,
        category                VARCHAR(10)      NOT NULL                               
) ENGINE=InnoDB;
-- Create game table
CREATE TABLE game
(
	id                                  INT(6)           PRIMARY KEY        AUTO_INCREMENT      ,
	name                                VARCHAR(50)      NOT NULL           UNIQUE              ,
        short_description                   VARCHAR(100)     NOT NULL                               ,
        rules                               VARCHAR(200)     NOT NULL           UNIQUE              ,
        punctuation_at_the_first_attempt    INT(2)           NOT NULL                               ,
        punctuation_at_the_second_attempt   INT(2)                                                  ,
        time_of_first_attempt               INT(2)           NOT NULL                               ,
        time_of_second_attempt              INT(2)                                                  ,
        num_of_words                        INT(2)           NOT NULL                               
) ENGINE=InnoDB;
-- Create game table
CREATE TABLE game
(
	id                                  INT(6)           PRIMARY KEY        AUTO_INCREMENT      ,
	                        
) ENGINE=InnoDB;