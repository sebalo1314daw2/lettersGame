<?php
    class Province 
    {
        // =========================================== Attributes ============================
        private $id; 
        private $value;
        // =========================================== Constructor ============================
        function __construct($value) {
            $this->value = $value;
        }
        // ============================================= Accessors =================================
        public function getId() {
            return $this->id;
        }

        public function getValue() {
            return $this->value;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setValue($value) {
            $this->value = $value;
        }
        // ============================================= Methods =================================
        /**
         * toAssociativeArray()
         * Function that seeks to convert this Province object to an associative array
         * @author Sergio Baena López
         * @version 1.0
         * @return {Associative array} an associative array that represent this Province object
         */
        public function toAssociativeArray()
        {
            $namesAttr = array("id", "value");
            $theAssociativeArray = array();
            for($i = 0; $i < count($namesAttr); $i++)
            {
                eval('$theAssociativeArray["' . $namesAttr[$i] . '"] = $this->' . $namesAttr[$i] . ';');
            }
            return $theAssociativeArray;
        }
    }
?>