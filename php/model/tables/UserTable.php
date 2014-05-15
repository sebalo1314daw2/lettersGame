<?php
            // Testing requires
//            require_once "../LettersGameDB.php";
//            require_once "../tablesItem/User.php";

    // Real requires
    require_once "../model/LettersGameDB.php";
    require_once "../model/tablesItem/User.php";
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
    }
    // Testeo
//    $user = UserTable::findById(1);
//    echo $user->getUsername(); 
?>
