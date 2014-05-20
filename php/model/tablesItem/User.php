<?php
    class User 
    {
        // =========================================== Attributes ============================
        private $id;
        private $username;
        private $password;
        private $name;
        private $surnames;
        // =========================================== Constructor ============================
        function __construct($username, $password, $name, $surnames) {
            $this->username = $username;
            $this->password = $password;
            $this->name = $name;
            $this->surnames = $surnames;
        }
        // ============================================= Accessors =================================
        public function getId() {
            return $this->id;
        }

        public function getUsername() {
            return $this->username;
        }

        public function getPassword() {
            return $this->password;
        }

        public function getName() {
            return $this->name;
        }

        public function getSurnames() {
            return $this->surnames;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setUsername($username) {
            $this->username = $username;
        }

        public function setPassword($password) {
            $this->password = $password;
        }

        public function setName($name) {
            $this->name = $name;
        }

        public function setSurnames($surnames) {
            $this->surnames = $surnames;
        }
        // ============================================= Methods =================================
        /**
         * toAssociativeArray()
         * Function that seeks to convert this User object to an associative array
         * @author Sergio Baena López
         * @version 1.0
         * @return {Associative array} an associative array that represent this User object
         */
        public function toAssociativeArray()
        {
            $namesAttr = array("id", "username", "password", "name", "surnames");
            $theAssociativeArray = array();
            for($i = 0; $i < count($namesAttr); $i++)
            {
                eval('$theAssociativeArray["' . $namesAttr[$i] . '"] = $this->' . $namesAttr[$i] . ';');
            }
            return $theAssociativeArray;
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
            // ------------------------------------- name ----------------------------------------------
            $this->name = Utilities::correctProperName($this->name);
            // ------------------------------------- surnames ------------------------------------------
            $this->surnames = Utilities::correctProperName($this->surnames);
        }
    }
?>