<?php
    class Webmaster 
    {
        // =========================================== Attributes ============================
        private $user;
        private $role;
        private $descriptionOfTheirRole;
        // =========================================== Constructor ============================
        function __construct($user, $role, $descriptionOfTheirRole) {
            $this->user = $user;
            $this->role = $role;
            $this->descriptionOfTheirRole = $descriptionOfTheirRole;
        }
        // ============================================= Accessors =================================
        public function getUser() {
            return $this->user;
        }

        public function getRole() {
            return $this->role;
        }

        public function getDescriptionOfTheirRole() {
            return $this->descriptionOfTheirRole;
        }

        public function setUser($user) {
            $this->user = $user;
        }

        public function setRole($role) {
            $this->role = $role;
        }

        public function setDescriptionOfTheirRole($descriptionOfTheirRole) {
            $this->descriptionOfTheirRole = $descriptionOfTheirRole;
        }
        // ============================================= Methods =================================
        /**
         * toAssociativeArray()
         * Function that seeks to convert this Webmaster object to an associative array
         * @author Sergio Baena López
         * @version 1.0
         * @return {Associative array} an associative array that represent this Webmaster object
         */
        public function toAssociativeArray()
        {
            $namesAttr = array("role", "descriptionOfTheirRole");
            $attrNamesThatAreObj = array("user");
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