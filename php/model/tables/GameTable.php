<?php
    class GameTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "game";
        private static $COL_ID = "id";
        private static $COL_NAME = "name";
        private static $COL_SHORT_DESCRIPTION = "short_description";
        private static $COL_RULES = "rules";
        private static $COL_PUNCTUATION_AT_THE_FIRST_ATTEMPT = "punctuation_at_the_first_attempt";
        private static $COL_PUNCTUATION_AT_THE_SECOND_ATTEMPT = "punctuation_at_the_second_attempt";
        private static $COL_TIME_OF_FIRST_ATTEMPT = "time_of_first_attempt";
        private static $COL_TIME_OF_SECOND_ATTEMPT = "time_of_second_attempt";
        private static $COL_NUM_OF_WORDS = "num_of_words";
        // ==================================== Methods =======================================
        /**
         * findById()
         * Function that seeks to find a game by id (primary key)
         * @author Sergio Baena López
         * @version 1.0
         * @param {int} $id the id that will filter.
         * @return {Game object} the Game object that has this id.
         */
        public static function findById($id)
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
            $stmt->bind_result
            (
                    $id,
                    $name,
                    $shortDescription,
                    $rules,
                    $punctuationAtTheFirstAttempt,
                    $punctuationAtTheSecondAttempt,
                    $timeOfFirstAttempt,
                    $timeOfSecondAttempt,
                    $numOfWords
            );
            // get the value
            $stmt->fetch();
            // create a "Game" object container for all these values.
            $game = new Game
            (
                    $id,
                    $name,
                    $shortDescription,
                    $rules,
                    $punctuationAtTheFirstAttempt,
                    $punctuationAtTheSecondAttempt,
                    $timeOfFirstAttempt,
                    $timeOfSecondAttempt,
                    $numOfWords
            );
            // close connection
            $db->close();
            // return the Game object
            return $game;
        }
    }
?>
