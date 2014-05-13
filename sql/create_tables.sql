-- **************************** CREATES TABLES *********************************************************
CREATE TABLE word
(
	id                      INT(6)           PRIMARY KEY        AUTO_INCREMENT      ,
	value                   VARCHAR(20)      NOT NULL           UNIQUE              ,
        number_of_syllabes      INT(1)           NOT NULL                               ,
        category                VARCHAR(16)      NOT NULL                               
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
-- **************************** INSERTS *********************************************************
-- Insert rows in table word
INSERT INTO word (value, number_of_syllabes, category) VALUES ('calculadora', 5, 'llana');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('avi&oacute;n', 2, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('Barcelona', 4, 'llana');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('de', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('la', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('el', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('los', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('las', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('nos', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('se', 1, 'aguda');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('esdr&uacute;jula', 4, 'esdr&uacute;jula');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('sabi&eacute;ndolo', 4, 'esdr&uacute;jula');
INSERT INTO word (value, number_of_syllabes, category) VALUES ('car&aacute;cteres', 4, 'esdr&uacute;jula');
-- Insert rows in table game
INSERT INTO game 
(
    name,
    short_description,
    rules,
    punctuation_at_the_first_attempt,
    punctuation_at_the_second_attempt,
    time_of_first_attempt,
    time_of_second_attempt,
    num_of_words
) VALUES 
(
    '&iquest;Cu&aacute;ntas s&iacute;labas tiene esta palabra?',
    'Juego que consiste en acertar el n&uacute;mero de s&iacute;labas que contiene una palabra',
    'Reglas del juego de contar n&uacute;meros de s&iacute;labas',
    10,
    1,
    10,
    10,
    10
);
INSERT INTO game 
(
    name,
    short_description,
    rules,
    punctuation_at_the_first_attempt,
    punctuation_at_the_second_attempt,
    time_of_first_attempt,
    time_of_second_attempt,
    num_of_words
) VALUES 
(
    '&iquest;Cu&aacute;ntos monos&iacute;labos puedes encontrar?',
    'Juego que consiste en encontrar todas las palabras monos&iacute;labas que hay en una lista de palabras',
    'Reglas del juego de encontrar palabras monos&iacute;labas',
    10,
    NULL,
    10,
    NULL,
    10
);
INSERT INTO game 
(
    name,
    short_description,
    rules,
    punctuation_at_the_first_attempt,
    punctuation_at_the_second_attempt,
    time_of_first_attempt,
    time_of_second_attempt,
    num_of_words
) VALUES 
(
    '&iquest;De qu&eacute; categor&iacute;a es esta palabra?',
    'Juego que consiste en acertar la categor&iacute;a de la palabra',
    'Reglas del juego de acertar la categor&iacute;a de la palabra',
    10,
    1,
    10,
    10,
    10
);
INSERT INTO game 
(
    name,
    short_description,
    rules,
    punctuation_at_the_first_attempt,
    punctuation_at_the_second_attempt,
    time_of_first_attempt,
    time_of_second_attempt,
    num_of_words
) VALUES 
(
    '&iquest;Esta palabra tiene acento?',
    'Juego que consiste en acertar si la palabra tiene un acento o no',
    'Reglas del juego de acertar si la palabra tiene un acento o no',
    6,
    NULL,
    10,
    NULL,
    10
);
-- Insert rows in table user
INSERT INTO user 
(
    username,
    password,
    name,
    surnames
) VALUES 
(
    'pepe1', 
    'bf38983aac6827fb6b65f2824aafe3f2', -- the username is the password
    'Pepe',
    'Gonz&aacute;lez Villalba'
);
INSERT INTO user 
(
    username,
    password,
    name,
    surnames
) VALUES 
(
    'juan1', 
    'e3a96c29002aed35295dc9c062e1f331', -- the username is the password
    'Juan',
    'Baena Bandera'
);
INSERT INTO user 
(
    username,
    password,
    name,
    surnames
) VALUES 
(
    'marta1', 
    '17d3bc461c7594dd9b719bcc21afcc47', -- the username is the password
    'Marta',
    'Monta&ntilde;a Prado'
);
INSERT INTO user 
(
    username,
    password,
    name,
    surnames
) VALUES 
(
    'rodrigo1', 
    '588260d7c5e8510565c34f6579e62cc8', -- the username is the password
    'Rodrigo',
    'Ventana Pared'
);
-- Insert rows in table province
INSERT INTO province (value) VALUES ('Barcelona');
INSERT INTO province (value) VALUES ('Tarragona');
INSERT INTO province (value) VALUES ('Lleida');
INSERT INTO province (value) VALUES ('Girona');
-- Insert rows in table student
INSERT INTO student 
(
    id_user,
    id_province,
    school,
    city,
    course,
    date_of_birth
) VALUES 
(
    1,
    1,
    'Escuela de Pepe',
    'Ciudad de Pepe',
    '1A',
    '2009/03/01'
);
INSERT INTO student 
(
    id_user,
    id_province,
    school,
    city,
    course,
    date_of_birth
) VALUES 
(
    2,
    2,
    'Escuela de Juan',
    'Ciudad de Juan',
    '2A',
    '2009/03/02'
);
-- Insert rows in table teacher
INSERT INTO teacher 
(
    id_user,
    id_province,
    school,
    city,
    courses
) VALUES 
(
    2, -- Rellenar a partir de aqui
    2,
    'Escuela de Juan',
    'Ciudad de Juan',
    '2A',
    '2009/03/02'
);









-- 
-- CREATE TABLE teacher
-- (
-- 	id_user         INT(6)          PRIMARY KEY                             ,
--         id_province     INT(6)                                                  ,
--         school          VARCHAR(50)     NOT NULL                                ,
--         city            VARCHAR(50)     NOT NULL                                ,
--         courses         VARCHAR(50)     NOT NULL                                ,
--         FOREIGN KEY(id_user) REFERENCES user(id)                                ,
--         FOREIGN KEY(id_province) REFERENCES province(id) 
-- ) ENGINE=InnoDB;
-- 
-- 
-- 
-- 
-- 





































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