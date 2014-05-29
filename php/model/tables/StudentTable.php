<?php
    // Testing requires
//    require_once "../LettersGameDB.php";
//    require_once "../tablesItem/Student.php";
//    require_once "UserTable.php";
//    require_once "ProvinceTable.php";
    
    // Real requires
    require_once "../model/LettersGameDB.php";    
    require_once "../model/tablesItem/Student.php";
    require_once "../model/tables/UserTable.php";
    require_once "../model/tables/ProvinceTable.php";
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
        /**
          * findByUser()
          * Function that seeks to obtain the student corresponding to the specified user
          * @author Sergio Baena López
          * @version 1.0
          * @param {User object} $user the user that we want to get her/his student
          * @return {Student object} the student corresponding to the specified user
          */
         public static function findByUser($user)
         {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME .
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
                    $idProvince, 
                    $idTeacher,
                    $school,
                    $city, 
                    $course,
                    $dateOfBirth
            );
            // get the value
            $stmt->fetch();
            // create a "Student" object container for all these values.
            $student = new Student
            (
                    $user,
                    ProvinceTable::findById($idProvince),
                    TeacherTable::findById($idTeacher),
                    $school,
                    $city,
                    $course,
                    $dateOfBirth
            );
            // close connection
            $db->close();
            // return the student
            return $student;
         }
         /**
          * isThisId()
          * Function that seeks to indicate whether the specified "id" is present in the table or not.
          * @author Sergio Baena López
          * @version 1.0
          * @param {int} $id the id to search
          * @return {bool} whether the specified "id" is present in the table or not
          */
         public static function isThisId($id)
         {
            $isTheId = false;
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT COUNT(*)
                      FROM " . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_ID_USER . "= ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("i", $id);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($numOfIdRepeated);
            // get the value
            $stmt->fetch();
            if($numOfIdRepeated > 0)
            {
                // there are id's repeated --> is this id
                $isTheId = true;
            }
            // close connection
            $db->close();
            // return $isTheId
            return $isTheId; 
         }    
    }
    // Testeo
//    if(StudentTable::isThisId(500))
//    {
//        echo "esta ese id";
//    }
//    else
//    {
//        echo "no esta ese id";
//    }
?>