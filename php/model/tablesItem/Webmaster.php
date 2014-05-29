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
    }
?>