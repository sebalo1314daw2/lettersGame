<?php
    require_once "../model/tables/RankingTable.php";
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
         *      "rankingList" {Array of Rankings object} the user rankings
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
                // get the 4 rankings of the user
                $arrayToReturn["sessionContent"]["rankingList"] = RankingTable::findByUser($user);
                // obtain full details of the user that is logging (the teacher or student or webmaster object)
                if(StudentTable::isThisId($user->getId()))
                {
                    // is this id in student table --> is student
                    $arrayToReturn["sessionContent"]["teacherOrStudentOrWebmaster"] = StudentTable::findByUser($user);
                }
                else if(TeacherTable::isThisId($user->getId()))
                {
                    // is this id in teacher table --> is teacher
                    $arrayToReturn["sessionContent"]["teacherOrStudentOrWebmaster"] = TeacherTable::findByUser($user);
                }
                else
                {
                    // by elimination --> is webmaster
                    $arrayToReturn["sessionContent"]["teacherOrStudentOrWebmaster"] = WebmasterTable::findByUser($user);
                }
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
         * Function that seeks to indicate whether a user's session is open or not
         * @author Sergio Baena López
         * @version 1.0
         * @return {bool} indicate whether an user's session is open or not
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