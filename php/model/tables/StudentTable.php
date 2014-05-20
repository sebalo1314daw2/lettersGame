<?php
    require_once "../model/LettersGameDB.php";  
    require_once '../tablesItem/Student.php';
    class StudentTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "student";
        private static $COL_ID_USER = "id_user";
        private static $COL_ID_PROVINCE = "id_province";
        private static $COL_ID_TEACHER = "id_teacher";
        private static $COL_SCHOOL = "school";
        private static $COL_CITY = "city";
        private static $COL_COURSE = "course";
        private static $COL_DATE_OF_BIRTH = "date_of_birth";
        // ==================================== Methods =======================================
        /**
         * insert()
         * Procedure which aims to insert a new student to the table.
         * @author Sergio Baena López
         * @version 1.0
         * @param {Student object} $student the student to insert
         */
        public static function insert($student)
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "INSERT INTO " . self::$NAME .  
                    " ("
                            .  self::$COL_ID_USER           . ", "
                            .  self::$COL_ID_PROVINCE       . ", "
                            .  self::$COL_ID_TEACHER        . ", "
                            .  self::$COL_SCHOOL            . ", "
                            .  self::$COL_CITY              . ", "
                            .  self::$COL_COURSE            . ", "
                            .  self::$COL_DATE_OF_BIRTH     . 
                    ") VALUES 
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    );";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param
            (
                    "iiissss", 
                    $student->getUser()->getId(),
                    $student->getProvince()->getId(),
                    $student->getTeacher()->getUser()->getId(),
                    $student->getSchool(),
                    $student->getCity(),
                    $student->getCourse(),
                    $student->getDateOfBirth()
            );
            // execute query
            $stmt->execute();
            // close connection
            $db->close();
        }
    }
?>