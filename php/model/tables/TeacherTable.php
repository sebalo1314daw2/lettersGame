<?php
    // Testing requires
//    require_once "../LettersGameDB.php";
//    require_once "../tablesItem/Teacher.php";
//    require_once "UserTable.php";
//    require_once "ProvinceTable.php";
    
    // Real requires
    require_once "../model/LettersGameDB.php";    
    require_once "../model/tablesItem/Teacher.php";
    require_once "../model/tables/UserTable.php";
    require_once "../model/tables/ProvinceTable.php";
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
        /**
         * insert()
         * Procedure which aims to insert a new teacher to the table.
         * @author Sergio Baena López
         * @version 1.0
         * @param {Teacher object} $teacher the teacher to insert
         */
        public static function insert($teacher)
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "INSERT INTO " . self::$NAME .  
                    " ("
                            .  self::$COL_ID_USER      . ", "
                            .  self::$COL_ID_PROVINCE  . ", "
                            .  self::$COL_SCHOOL       . ", "
                            .  self::$COL_CITY         . ", "
                            .  self::$COL_COURSES      .
                    ") VALUES 
                    (
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
                    "iisss", 
                    $teacher->getUser()->getId(),
                    $teacher->getProvince()->getId(),
                    $teacher->getSchool(),
                    $teacher->getCity(),
                    $teacher->getCourses()
            );
            // execute query
            $stmt->execute();
            // close connection
            $db->close();
        }
        /**
          * findByUser()
          * Function that seeks to obtain the teacher corresponding to the specified user
          * @author Sergio Baena López
          * @version 1.0
          * @param {User object} $user the user that we want to get her/his teacher
          * @return {Teacher object} the teacher corresponding to the specified user
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
                    $school,
                    $city,
                    $courses
            );
            // get the value
            $stmt->fetch();
            // create a "Teacher" object container for all these values.
            $teacher = new Teacher
            (
                    $user,
                    ProvinceTable::findById($idProvince),
                    $school,
                    $city,
                    $courses
            );
            // close connection
            $db->close();
            // return the teacher object
            return $teacher;
         }
        /**
         * findById()
         * Function that seeks to find a teacher by id (primary key)
         * @author Sergio Baena López
         * @version 1.0
         * @param {int} $id the id that will filter.
         * @return {Teacher object} the Teacher object that has this id.
         */
        public static function findById($id)
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_ID_USER . " = ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("i", $id);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($idUser, $idProvince, $school, $city, $courses);
            // get the value
            $stmt->fetch();
            // create a "Teacher" object container for all these values.
            $teacher = new Teacher
            (
                    UserTable::findById($id),
                    ProvinceTable::findById($idProvince),
                    $school,
                    $city,
                    $courses
            );
            // close connection
            $db->close();
            // return the teacher object
            return $teacher;
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
//    $user = new User("", "", "", "");
//    $user->setId(8);
//    $province = new Province("");
//    $province->setId(1);
//    $teacher = new Teacher($user, $province, "Escuela de sergio", "ciudad de sergio", "3A, 1B");
//    TeacherTable::insert($teacher);
?>