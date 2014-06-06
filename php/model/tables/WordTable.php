<?php
    require_once "../model/LettersGameDB.php";  
    require_once "../model/tablesItem/Word.php";
    class WordTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "word";
        private static $COL_ID = "id";
        private static $COL_VALUE = "value";
        private static $COL_NUMBER_OF_SYLLABES = "number_of_syllabes";
        private static $COL_CATEGORY = "category";
        // ==================================== Methods =======================================
        /**
         * obtainRandomWords()
         * Function which aims to get some words object random word table
         * @author Sergio Baena López
         * @version 1.0
         * @param {int} $numWords the number of words to obtain
         * @return {array of Word objects} the random words
         */
        public static function obtainRandomWords($numWords)
        {
            $wordList = array();
            // get maximum id
            $maxId = self::obtainMaximumId();
            for($i = 0; $i < $numWords; $i++)
            {
                // get random id
                $randomId = rand(1, $maxId);
                // get the random word
                $randomWord = self::findById($randomId);
                // the "id" could not exist in the table.
                if($randomWord->getValue() == null)
                {
                    // the id does not exist
                    // not account for the loop
                    $i--;
                }
                else
                {
                    // the id exists --> we obtained a word
                    $wordList[] = $randomWord;
                }
            }
            return $wordList;
        }
        /**
         * obtainMaximumId()
         * Function which aims to get to maximum id of all words of the table
         * @author Sergio Baena López
         * @version 1.0
         * @return {int} the maximum id
         */
        private static function obtainMaximumId()
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =  "SELECT MAX(" . self::$NAME . "." . self::$COL_ID . ")" .
                   " FROM "       . self::$NAME . ";"; 
            $stmt = $db->prepare($sql);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($maxId);
            // get the value
            $stmt->fetch();
            // close connection
            $db->close();
            return $maxId;
        }
        /**
         * findById()
         * Function that seeks to find a word by id (primary key)
         * @author Sergio Baena López
         * @version 1.0
         * @param {int} $id the id that will filter.
         * @return {Word object} the Word object that has id.
         */
        private static function findById($id)
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_ID . " = ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("i", $id);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($id, $value, $numberOfSyllabes, $category);
            // get the value
            $stmt->fetch();
            // create a "Word" object container for all these values.
            $word = new Word($id, $value, $numberOfSyllabes, $category);
            // close connection
            $db->close();
            // return the word object
            return $word;
        }
    }
?>