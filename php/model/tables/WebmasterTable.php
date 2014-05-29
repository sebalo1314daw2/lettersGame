<?php
    class WebmasterTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "webmaster";
        private static $COL_ID_USER = "id_user";
        private static $COL_ROLE = "role";
        private static $COL_DESCRIPTION_OF_THEIR_ROLE = "description_of_their_role";
        // ==================================== Methods =======================================
        /**
          * findByUser()
          * Function that seeks to obtain the webmaster corresponding to the specified user
          * @author Sergio Baena López
          * @version 1.0
          * @param {User object} $user the user that we want to get her/his webmaster
          * @return {Webmaster object} the webmaster corresponding to the specified user
          */
         public static function findByUser($user)
         {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM "  . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_ID_USER . " = ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("i", $user->getId());
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result
            (
                    $idUser,
                    $role,
                    $descriptionOfTheirRole
            );
            // get the value
            $stmt->fetch();
            // create a "Webmaster" object container for all these values.
            $webmaster = new Webmaster
            (
                    $user,
                    $role,
                    $descriptionOfTheirRole
            );
            // close connection
            $db->close();
            // return the webmaster object
            return $webmaster;
         }
    }
?>