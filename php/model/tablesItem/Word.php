<?php
    class Word 
    {
        // =========================================== Attributes ============================
        private $id;
        private $value;
        private $numberOfSyllabes;
        private $category;
        // =========================================== Constructor ============================
        function __construct($id, $value, $numberOfSyllabes, $category) {
            $this->id = $id;
            $this->value = $value;
            $this->numberOfSyllabes = $numberOfSyllabes;
            $this->category = $category;
        }
        // ============================================= Accessors =================================
        public function getId() {
            return $this->id;
        }

        public function getValue() {
            return $this->value;
        }

        public function getNumberOfSyllabes() {
            return $this->numberOfSyllabes;
        }

        public function getCategory() {
            return $this->category;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setValue($value) {
            $this->value = $value;
        }

        public function setNumberOfSyllabes($numberOfSyllabes) {
            $this->numberOfSyllabes = $numberOfSyllabes;
        }

        public function setCategory($category) {
            $this->category = $category;
        }
        // ============================================= Methods =================================
        /**
         * toAssociativeArray()
         * Function that seeks to convert this Word object to an associative array
         * @author Sergio Baena López
         * @version 1.0
         * @return {Associative array} an associative array that represent this Word object
         */
        public function toAssociativeArray()
        {
            $namesAttr = array("id", "value", "numberOfSyllabes", "category");
            $theAssociativeArray = array();
            for($i = 0; $i < count($namesAttr); $i++)
            {
                eval('$theAssociativeArray["' . $namesAttr[$i] . '"] = $this->' . $namesAttr[$i] . ';');
            }
            return $theAssociativeArray;
        }
    }
?>