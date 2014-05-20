<?php
            // Testing requires
            require_once "../LettersGameDB.php";
            require_once "../tablesItem/User.php";

    // Real requires
//    require_once "../model/LettersGameDB.php";
//    require_once "../model/tablesItem/User.php";
    class UserTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "user";
        private static $COL_ID = "id";
        private static $COL_USERNAME = "username";
        private static $COL_PASSWORD = "password";
        private static $COL_NAME = "name";
        private static $COL_SURNAMES = "surnames";
        // ==================================== Methods =======================================
        /**
         * findById()
         * Function that seeks to find an user by id (primary key)
         * @author Sergio Baena López
         * @version 1.0
         * @param {int} $id the id that will filter.
         * @return {User object} the User object that has this id.
         */
        public static function findById($id)
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_ID . " = ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("i", $id);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($id, $username, $password, $name, $surnames);
            // get the value
            $stmt->fetch();
            // create a "User" object container for all these values.
            $user = new User($username, $password, $name, $surnames);
            $user->setId($id);
            // close connection
            $db->close();
            // return the user object
            return $user;
        }
        /**
         * isUniqueUsername()
         * Function that seeks to indicate whether the specified user name is unique or not in the table.
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $username the username to look
         * @return {boolean} if the username is unique or not
         */
        public static function isUniqueUsername($username)
        {
            $isUnique = true;
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT COUNT(*)
                      FROM " . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_USERNAME . "= ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("s", $username);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($numOfUsernameRepeated);
            // get the value
            $stmt->fetch();
            if($numOfUsernameRepeated > 0)
            {
                // there are usernames repeated --> it is not unique
                $isUnique = false;
            }
            // close connection
            $db->close();
            // return $isUnique
            return $isUnique;
        }
        /**
         * insert()
         * Procedure which aims to insert a new user to the table.
         * @author Sergio Baena López
         * @version 1.0
         * @param {User object} $user the user to insert
         */
        public static function insert($user)
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "INSERT INTO " . self::$NAME .  
                    " ("
                            .  self::$COL_USERNAME  . ", "
                            .  self::$COL_PASSWORD  . ", "
                            .  self::$COL_NAME      . ", "
                            .  self::$COL_SURNAMES  .
                    ") VALUES 
                    (
                        ?,
                        ?,
                        ?,
                        ?
                    );";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param
            (
                    "ssss", 
                    $user->getUsername(),
                    $user->getPassword(),
                    $user->getName(),
                    $user->getSurnames()
            );
            // execute query
            $stmt->execute();
            // close connection
            $db->close();
        }
    }
    // Testeo
//    $user = new User("sergio1", "sergio1", "Sergio", "Baena Lopez");
//    UserTable::insert($user);
?>