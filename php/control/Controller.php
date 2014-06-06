<?php
    require_once "../model/tables/ProvinceTable.php";
    require_once "../model/tables/TeacherTable.php";
    require_once "../model/tables/UserTable.php";
    require_once "../model/tables/StudentTable.php";
    require_once "../model/tables/TeacherTable.php";
    require_once "../model/tables/GameTable.php";
    require_once "../model/tables/WordTable.php";
    require_once "../model/Session.php";
    require_once "../model/Utilities.php";
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
                Session::enable();
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
                    case "2":
                        // Action: register a new user in the system
                        echo $this->registerNewUser($this->params["user"]);
                        break;
                    case "3":
                        // Action: pass a string to sound.
                        echo $this->passStringToSound($this->params["string"], $this->params["fileName"]);
                        break;
                    case "4":
                        // Action: Log in a user in the system
                        echo $this->logIn($this->params["user"]);
                        break;
                    case "5":
                        // Action: get the game that has the "id" specified.
                        echo $this->obtainGame($this->params["id"]);
                        break;
                    case "6":
                        // Action: get random words
                        echo $this->obtainRandomWords($this->params["numWords"]);
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
        /**
         * registerNewUser()
         * Function that seeks to register the specified user on the system. Before that, however, check 
         * that the username is unique and will be a correction to the data. To register, which will be a 
         * "INSERTS" (user table, teacher, student, ranking).
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $user the user to register (Student or Teacher) (JSON format)
         * @return {String} Array format --> first element:
         * a boolean indicating whether all valid attributes; second element: an associative array as the key the key of the fields attribute  and values​as a boolean indicating
         * whether the fields is valid or not; third element: an array of errors (JSON encoded)
         */
        private function registerNewUser($user)
        {
            // decode the object.
            $user = json_decode(stripslashes($user));
            $province = new Province($user->province->value);
            $province->setId($user->province->id);
            // look if this is a Student or Teacher.
            if($user->TYPE == "Teacher")
            {
                // the user is a teacher
                $user = new Teacher
                (
                        new User
                        (
                                $user->user->username,
                                $user->user->password, 
                                $user->user->name,
                                $user->user->surnames
                        ), 
                        $province,
                        $user->school, 
                        $user->city,
                        $user->courses
                );
            }
            else
            {
                // the user is a student
                $theAtrrUserOfTheTeacher = new User
                (
                        $user->teacher->user->username,
                        $user->teacher->user->password, 
                        $user->teacher->user->name, 
                        $user->teacher->user->surnames
                );
                $theAtrrUserOfTheTeacher->setId($user->teacher->user->id);
                $theAttrProvinceOfTheTeacher = new Province($user->teacher->province->value);
                $theAttrProvinceOfTheTeacher->setId($user->teacher->province->id);
                $teacher = new Teacher
                (
                        $theAtrrUserOfTheTeacher,
                        $theAttrProvinceOfTheTeacher,
                        $user->teacher->school,
                        $user->teacher->city,
                        $user->teacher->courses
                );
                $user = new Student
                (
                        new User
                        (
                                $user->user->username,
                                $user->user->password, 
                                $user->user->name,
                                $user->user->surnames
                        ),
                        $province,
                        $teacher,
                        $user->school, 
                        $user->city, 
                        $user->course,
                        $user->dateOfBirth
                );
            }
            // We have already created the Student or Teacher object.
            // Let's see if the username is unique (second validation)
            $validationArray = array();
            $validationArray[0] = true;
            $validationArray[1] = array();
            $validationArray[2] = array();
            // ----------------------- Validation username ----------------
            if(UserTable::isUniqueUsername($user->getUser()->getUsername()))
            {
                // is valid
                $validationArray[1]["username"] = true;
            }
            else
            {
                // is invalid
                $validationArray[0] = false;
                $validationArray[1]["username"] = false;
                $validationArray[2][4] = "[Nombre de usuario] Este nombre de usuario ya se está usando";
            }
            // Validation done
            if($validationArray[0])
            {
                // all valid
                // correction to the data
                $user->correct();
                // correction done
                // We do the INSERTS
                UserTable::insert($user->getUser());
                // We get the id_user for the second insert
                $idUser = UserTable::findByUsername($user->getUser()->getUsername())->getId();
                // We put the id_user into this object
                $user->getUser()->setId($idUser);
                if($user->TYPE == "Student")
                {
                    StudentTable::insert($user);
                }
                else
                {
                    TeacherTable::insert($user);
                }
            }
            return json_encode($validationArray);
        }
        /**
         * passStringToSound()
         * Function which aims to pass the string sound comes from client and put the name it provided.
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $string the string we want to pass sound.
         * @param {String} $fileName the name of the file we want to have
         * @return {boolean} returns true because you have to return something.
         */
        private function passStringToSound($string, $fileName)
        {
            Utilities::convertStringToSound($string, "../../mp3/dynamicSounds/", $fileName);
            return true;
        }
        /**
         * logIn()
         * Function aims log in a user in the system. This function will look at the user exists and, if so, 
         * will open session on the server.
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $user the user who you want to log (JSON format)
         * @return {String} an associative array with this format (JSON format):
         * "sessionOpened" {bool} if the user opened session or not
         * "sessionContent" {Associative array} an associative array with this format (JSON format):
         *      "rankingList" {Array of Rankings object} the user rankings
         *      "teacherOrStudentOrWebmaster" {Teacher object | Student object | Webmaster object} 
         *      the user log. 
         */
        private function logIn($user)
        {
            // decode the user object
            $user = json_decode(stripslashes($user));
            $user = new User
            (
                    $user->username,
                    $user->password, 
                    "",
                    ""
            );
            $sessionArray = Session::open($user);
            // We convert the rankings object of the $sessionArray to some associative arrays 
            if(isset($sessionArray["sessionContent"]))
            {
                // is set the $sessionArray["sessionContent"]
                // we convert its to some associative arrays
                // convert the rankings
                for($i = 0; $i < count($sessionArray["sessionContent"]["rankingList"]); $i++)
                {
                    $sessionArray["sessionContent"]["rankingList"][$i] = $sessionArray["sessionContent"]["rankingList"][$i]->toAssociativeArray();
                }
                // rankings converted
                $sessionArray["sessionContent"]["teacherOrStudentOrWebmaster"] = $sessionArray["sessionContent"]["teacherOrStudentOrWebmaster"]->toAssociativeArray();  
            }
            return json_encode($sessionArray); 
        }
        /**
         * obtainGame()
         * Function that seeks to obtain the game that has the "id" specified.
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $id the id of the game to obtain
         * @return {String} an associative array with this format (JSON format):
         * "deniedAccess" {bool} if the access is denied or not
         * "exists" {bool} if the game exists or not in the database
         * "game" {Game object} the game with the specified id
         */
        private function obtainGame($id)
        {
            $dataArray = array("deniedAccess" => true);
            if(Session::isOpen())
            {
                 // is open
                 $dataArray["deniedAccess"] = false;
                 $game = GameTable::findById($id);
                 // look if the game exists or not
                 if($game->getName() == null)
                 {
                     // the game does not exist
                     $dataArray["exists"] = false;
                 }
                 else
                 {
                     // the game exists
                     $dataArray["exists"] = true;
                     $dataArray["game"] = $game->toAssociativeArray();
                 }
            }
            return json_encode($dataArray);
        }
        /**
         * obtainRandomWords()
         * Function which aims to get some random words object in word table
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $numWords the number of words to obtain 
         * @return {String} an associative array with this format (encoded to JSON):
         * "deniedAccess" {bool} if the access is denied or not
         * "wordList" {array of Word objects} the random words obtained
         */
        private function obtainRandomWords($numWords) 
        {
            $dataArray = array("deniedAccess" => true);
            if(Session::isOpen())
            {
                 // is open
                 $dataArray["deniedAccess"] = false;
                 $wordList = WordTable::obtainRandomWords($numWords);
                 for($i = 0; $i < count($wordList); $i++)
                 {
                     $wordList[$i] = $wordList[$i]->toAssociativeArray();
                 }
                 // correct wordList 
                 $dataArray["wordList"] = $wordList;
            }
            return json_encode($dataArray);
        }
    }
?>