<?php
    class Teacher 
    {
        // =========================================== Attributes ============================
        private $user;
        private $province;
        private $school;
        private $city;
        private $courses;
        // =========================================== Constructor ============================
        function __construct($user, $province, $school, $city, $courses) {
            $this->user = $user;
            $this->province = $province;
            $this->school = $school;
            $this->city = $city;
            $this->courses = $courses;
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

        public function getCourses() {
            return $this->courses;
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

        public function setCourses($courses) {
            $this->courses = $courses;
        }
        // ============================================= Methods =================================
        /**
         * toAssociativeArray()
         * Function that seeks to convert this Teacher object to an associative array
         * @author Sergio Baena López
         * @version 1.0
         * @return {Associative array} an associative array that represent this Teacher object
         */
        public function toAssociativeArray()
        {
            $namesAttr = array("user", "province", "school", "city", "courses");
            $theAssociativeArray = array();
            for($i = 0; $i < count($namesAttr); $i++)
            {
                eval('$theAssociativeArray["' . $namesAttr[$i] . '"] = $this->' . $namesAttr[$i] . ';');
            }
            return $theAssociativeArray;
        }
    }
?>
