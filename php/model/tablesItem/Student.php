<?php
    require_once 'User.php';
    require_once 'Province.php';
    require_once 'Teacher.php';
//    require_once '../Utilities.php';
    class Student 
    {
        // =========================================== Attributes ============================
        private $user; // (User object)
        private $province; // (Province object)
        private $teacher; // (Teacher object)
        private $school; // (String)
        private $city; // (String)
        private $course; // (String)
        private $dateOfBirth; // (String)
        public $TYPE = "Student"; // (String)
        // =========================================== Constructor ============================
        function __construct($user, $province, $teacher, $school, $city, $course, $dateOfBirth) {
            $this->user = $user;
            $this->province = $province;
            $this->teacher = $teacher;
            $this->school = $school;
            $this->city = $city;
            $this->course = $course;
            $this->dateOfBirth = $dateOfBirth;
        }
        // ============================================= Accessors =================================
        public function getUser() {
            return $this->user;
        }

        public function getProvince() {
            return $this->province;
        }

        public function getSchool() {
            return $this->school;
        }

        public function getCity() {
            return $this->city;
        }

        public function getCourse() {
            return $this->course;
        }

        public function getDateOfBirth() {
            return $this->dateOfBirth;
        }
        public function getTeacher() {
            return $this->teacher;
        }

        public function setTeacher($teacher) {
            $this->teacher = $teacher;
        }

        public function setUser($user) {
            $this->user = $user;
        }

        public function setProvince($province) {
            $this->province = $province;
        }

        public function setSchool($school) {
            $this->school = $school;
        }

        public function setCity($city) {
            $this->city = $city;
        }

        public function setCourse($course) {
            $this->course = $course;
        }

        public function setDateOfBirth($dateOfBirth) {
            $this->dateOfBirth = $dateOfBirth;
        }
        // ============================================= Methods =================================
        /**
         * correct()
         * Procedure aims to correct the attributes of this object.
         * @author Sergio Baena López
         * @version 1.0
         */
        public function correct()
        {
            // ------------------------------------- user ----------------------------------------------
            $this->user->correct();
            // ------------------------------------- school ----------------------------------------------
            $this->school = Utilities::correctProperName($this->school);
            // ------------------------------------- city ----------------------------------------------
            $this->city = Utilities::correctProperName($this->city);
            // ------------------------------------- course ----------------------------------------------
            $this->course = strtoupper($this->course);   
        }
        /**
         * toAssociativeArray()
         * Function that seeks to convert this Student object to an associative array
         * @author Sergio Baena López
         * @version 1.0
         * @return {Associative array} an associative array that represent this Student object
         */
        public function toAssociativeArray()
        {
            $namesAttr = array("school", "city", "course", "dateOfBirth", "TYPE");
            $attrNamesThatAreObj = array("user", "province", "teacher");
            $theAssociativeArray = array();
            for($i = 0; $i < count($attrNamesThatAreObj); $i++)
            {
                eval
                (
                        '$theAssociativeArray["' .
                        $attrNamesThatAreObj[$i] .
                        '"] = $this->'           . 
                        $attrNamesThatAreObj[$i] .
                        '->toAssociativeArray();' 
                );
            }
            for($i = 0; $i < count($namesAttr); $i++)
            {
                eval('$theAssociativeArray["' . $namesAttr[$i] . '"] = $this->' . $namesAttr[$i] . ';');
            }
            return $theAssociativeArray;
        }
    }
?>
