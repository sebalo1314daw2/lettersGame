<?php
    require_once "../LettersGameDB.php";
    require_once "../tablesItem/Teacher.php";
    require_once "UserTable.php";
    require_once "ProvinceTable";
    class TeacherTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "teacher";
        private static $COL_ID_USER = "id_user";
        private static $COL_ID_PROVINCE = "id_province";
        private static $COL_SCHOOL = "school";
        private static $COL_CITY = "city";
        private static $COL_COURSES = "courses";
        // ==================================== Methods =======================================
        /**
         * obtainAll()
         * Function that seeks to get all teachers of the table.
         * @author Sergio Baena López
         * @version 1.0
         * @return {array of Teacher objects} all teachers of the table
         */
        public static function obtainAll()
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME . ";";
            $stmt = $db->prepare($sql);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($idUser, $idProvince, $school, $city, $courses);
            // get the values
            $teacherList = array();
            while($stmt->fetch())
            {
                // He has returned true --> the data has  been obtained (is no end table)
                // create a "Teacher" object container for all these values.
                $aTeacher = new Teacher
                (
                        UserTable::findById($idUser), ProvinceTable::findById($idProvince), $school, $city, $courses
                );
                $teacherList[] = $aTeacher;
            }
            // close connection
            $db->close();
            // return the list of teachers
            return $teacherList;
        }        
    }
    // Testeo
    $teacherArray = TeacherTable::obtainAll();
    echo $teacherArray[0]->getCity();
?>