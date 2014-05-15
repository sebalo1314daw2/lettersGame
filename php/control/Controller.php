<?php
    require_once "../model/tables/ProvinceTable.php";
    class Controller 
    {
        // ======================================== Attributes =================================================
        private $params; // parameters sent from the client (associative array)
        // ========================================= Methods ===================================================
        /**
         * __construct()
         * Constructor that introduces the parameters sent from the client in the "$params" attribute.
         * @author Sergio Baena López
         * @version 1.0
         * @param {array} $params Associative array containing the parameters sent from the client.
         */
        public function __construct($params) 
        {
            $this->params = $params;
        }
        /**
         * doAction()
         * Procedure is intended to execute the action you have specified in the "action" parameter.
         * @author Sergio Baena López
         * @version 1.0
         */
        public function doAction()
        {
            if(isset($this->params["action"]))
            {
                // is set this parameter
//                Session::enable();
                switch($this->params["action"])
                {
                    case "0":
                        // Action: obtain all provinces stored in the database 
                        echo $this->obtainAllProvinces();
                        break;
                    case "1":
                        // Action: obtain all teachers stored in the database 
                        echo $this->obtainAllTeachers();
                        break;
                }
            }
        }
        /**
         * obtainAllProvinces()
         * Function that seeks to get all provinces of the ProvinceTable
         * @author Sergio Baena López
         * @version 1.0
         * @return {String} an array of objects Province's (encoded with JSON)
         */
        private function obtainAllProvinces()
        {
            // get all provinces 
            $provinceList = ProvinceTable::obtainAll();
            // objects passed an associative "array"  
            for($i = 0; $i < count($provinceList); $i++)
            {
                $provinceList[$i] = $provinceList[$i]->toAssociativeArray();
            }
            // $provinceList already can be encoded
            return json_encode($provinceList);
        }
        /**
         * obtainAllTeachers()
         * Function that seeks to get all teachers of the TeacherTable
         * @author Sergio Baena López
         * @version 1.0
         * @return {String} an array of objects Teacher's (encoded with JSON)
         */
        private function obtainAllTeachers()
        {
            // get all teachers 
            $teacherList = TeacherTable::obtainAll();
            // objects passed an associative "array"  
            for($i = 0; $i < count($teacherList); $i++)
            {
                $teacherList[$i] = $teacherList[$i]->toAssociativeArray();
            }
            // $teacherList already can be encoded
            return json_encode($teacherList);
        }
    }
?>
