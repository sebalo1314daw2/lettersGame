<?php
//    require_once "../model/tablesItem/Player.php";
//    require_once "../model/tables/PlayerTable.php";
//    require_once "../model/tables/RankingTable.php";
    class Session 
    {
        // =========================================== Attributes ============================
        private static $NAME = "activeRankingAndStudentOrTeacher"; // the name of the session
        // ========================================= Methods ==================================
        /**
         * open()
         * Function that seeks to open session to specified user, if it exists in the database.
         * @author Sergio Baena López
         * @version 1.0
         * @param {User object} $user the user we want to open session
         * @return {Array} an associative array with this format:
         * "sessionOpened" {boolean} if the user opened session or not
         * "sessionContent" {Associative array} an associative array with this format:
         *      "ranking" {Ranking object} the user ranking
         *      "teacherOrStudentOrWebmaster" {Teacher object | Student object | Webmaster object} 
         *      the user log. 
         */
        public static function open($user)
        {
            // First, we look at whether the user exists in database            
            $arrayToReturn = array();
            $arrayToReturn["sessionOpened"] = UserTable::exists($user);
            if($arrayToReturn["sessionOpened"])
            {
                // the user exists in database --> open session
                $user = UserTable::findByUsername($user->getUsername());
                $arrayToReturn["sessionContent"] = array();
                
                
                
                
                
//                        RankingTable::findByPlayer($player);
                $_SESSION[self::$NAME] = $arrayToReturn["sessionContent"];
            }
            return $arrayToReturn;
        }
        /**
         * enable()
         * Procedure that aims to enable the use of sessions.
         * @author Sergio Baena López
         * @version 1.0
         */
        public static function enable()
        {
            session_start();
        }
        /**
         * isOpen()
         * Function that seeks to indicate whether a player's session is open or not
         * @author Sergio Baena López
         * @version 1.0
         * @return {boolean} indicate whether a player's session is open or not
         */
        public static function isOpen()
        {
            return isset($_SESSION[self::$NAME]);
        }
        /**
         * close()
         * Procedure which aims to close the active user session.
         * @author Sergio Baena López
         * @version 1.0
         */
        public static function close()
        {
            session_destroy();
        }
    }
?>