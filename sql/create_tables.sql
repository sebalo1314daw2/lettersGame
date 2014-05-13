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
-- Create user table 
CREATE TABLE user
(
	id              INT(6)          PRIMARY KEY         AUTO_INCREMENT      ,
        username        VARCHAR(10)     NOT NULL            UNIQUE              ,
        password        VARCHAR(200)    NOT NULL                                ,
        name            VARCHAR(50)     NOT NULL                                ,
        surnames        VARCHAR(100)    NOT NULL                                                      
) ENGINE=InnoDB;
-- Create province table 
CREATE TABLE province
(
	id              INT(6)          PRIMARY KEY         AUTO_INCREMENT      ,
        value           VARCHAR(20)     NOT NULL            UNIQUE
) ENGINE=InnoDB;
-- Create student table 
CREATE TABLE student
(
	id_user         INT(6)          PRIMARY KEY                             ,
        id_province     INT(6)                                                  ,
        school          VARCHAR(50)     NOT NULL                                ,
        city            VARCHAR(50)     NOT NULL                                ,
        course          VARCHAR(2)      NOT NULL                                ,
        date_of_birth   DATE            NOT NULL                                ,
        FOREIGN KEY(id_user)     REFERENCES user(id)                            ,
        FOREIGN KEY(id_province) REFERENCES province(id) 
) ENGINE=InnoDB;
-- Create teacher table 
CREATE TABLE teacher
(
	id_user         INT(6)          PRIMARY KEY                             ,
        id_province     INT(6)                                                  ,
        school          VARCHAR(50)     NOT NULL                                ,
        city            VARCHAR(50)     NOT NULL                                ,
        courses         VARCHAR(50)     NOT NULL                                ,
        FOREIGN KEY(id_user) REFERENCES user(id)                                ,
        FOREIGN KEY(id_province) REFERENCES province(id) 
) ENGINE=InnoDB;
-- Create student_teacher table 
CREATE TABLE student_teacher
(
	 id_student     INT(6)                                  ,
         id_teacher     INT(6)                                  ,
         PRIMARY KEY(id_student, id_teacher)                    ,
         FOREIGN KEY(id_student) REFERENCES student(id_user)    ,
         FOREIGN KEY(id_teacher) REFERENCES teacher(id_user)    
) ENGINE=InnoDB;
-- Create webmaster table 
CREATE TABLE webmaster
(
	id_user                             INT(6)          PRIMARY KEY                             ,
        role                                VARCHAR(20)     NOT NULL                                ,
        description_of_their_role           VARCHAR(100)    NOT NULL                                ,
        FOREIGN KEY(id_user) REFERENCES user(id)
) ENGINE=InnoDB;
-- Create ranking table 
CREATE TABLE ranking
(
	id                      INT(6)          PRIMARY KEY         AUTO_INCREMENT      ,
        id_user                 INT(6)                                                  ,  
        id_game                 INT(6)                                                  ,
        points                  INT(20)         DEFAULT 0           NOT NULL            ,
        number_of_hits          INT(10)         DEFAULT 0           NOT NULL            ,
        number_of_failures      INT(10)         DEFAULT 0           NOT NULL            ,
        number_of_attempts      INT(10)         DEFAULT 0           NOT NULL            ,
        FOREIGN KEY(id_user) REFERENCES user(id)                                        ,
        FOREIGN KEY(id_game) REFERENCES game(id)                    
) ENGINE=InnoDB;




















































-- Delete tables
-- DROP TABLE word CASCADE;
-- DROP TABLE game CASCADE;
-- DROP TABLE user CASCADE;
-- DROP TABLE province CASCADE;
-- DROP TABLE student CASCADE;
-- DROP TABLE teacher CASCADE;
-- DROP TABLE student_teacher CASCADE;
-- DROP TABLE webmaster CASCADE;
-- DROP TABLE ranking CASCADE;
-- DROP TABLE ranking CASCADE;