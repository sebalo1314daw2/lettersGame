<?php
    require_once "../model/tables/ProvinceTable.php";
    require_once "../model/tables/TeacherTable.php";
    require_once "../model/tables/UserTable.php";
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
//                    case "2":
//                        // Action: register a new user in the system
//                        echo $this->registerNewUser($this->params["user"]);
//                        break;
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
        /**
         * registerNewUser()
         * Function that seeks to register the specified user on the system. Before that, however, check 
         * that the username is unique and will be a correction to the data. To register, which will be a 
         * "INSERTS" (user table, teacher, student, ranking).
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $user the user to register (Student or Teacher) (JSON format)
         * @return POR ESPECIFICAR
         */
//        private function registerNewUser($user)
//        {
//            // decode the object.
//            $user = json_decode(stripslashes($user));
//            $province = new Province($user->province->value);
//            $province->setId($user->province->id);
//            // look if this is a Student or Teacher.
//            if($user->TYPE == "Teacher")
//            {
//                // the user is a teacher
//                $user = new Teacher
//                (
//                        new User
//                        (
//                                $user->user->username,
//                                $user->user->password, 
//                                $user->user->name,
//                                $user->user->surnames
//                        ), 
//                        $province,
//                        $user->school, 
//                        $user->city,
//                        $user->courses
//                );
//            }
//            else
//            {
//                // the user is a student
//                $user = new Student
//                (
//                        new User
//                        (
//                                $user->user->username,
//                                $user->user->password, 
//                                $user->user->name,
//                                $user->user->surnames
//                        ),
//                        $province, 
//                        $user->school, 
//                        $user->city, 
//                        $user->course,
//                        $user->dateOfBirth
//                );
//            }
//            // We have already created the Student or Teacher object.
//            // Let's see if the username is unique (second validation)
//            $validationArray = array();
//            $validationArray[0] = true;
//            $validationArray[1] = array();
//            $validationArray[2] = array();
//            // ----------------------- Validation username ----------------
//            if(UserTable::isUniqueUsername($user->getUser()->getUsername()))
//            {
//                // is valid
//                $validationArray[1]["username"] = true;
//            }
//            else
//            {
//                // is invalid
//                $validationArray[0] = false;
//                $validationArray[1]["username"] = false;
//                $validationArray[2][4] = "[Nombre de usuario] Este nombre de usuario ya se est&aacute; usando";
//            }
//            // Validation done
//            if($validationArray[0])
//            {
//                // all valid
//                // correction to the data
//                $user->correct();
//                // correction done
//                // TODO
//                
//                
//                
//                
//            }
//        }
    }
?>
