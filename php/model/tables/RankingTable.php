<?php
    class RankingTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "ranking";
        private static $COL_ID = "id";
        private static $COL_ID_USER = "id_user";
        private static $COL_ID_GAME = "id_game";
        private static $COL_POINTS = "points";
        private static $COL_NUMBER_OF_HITS = "number_of_hits";
        private static $COL_NUMBER_OF_FAILURES = "number_of_failures";
        private static $COL_NUMBER_OF_ATTEMPTS = "number_of_attempts";
        // ==================================== Methods =======================================
        /**
          * findByUser()
          * Function that seeks to obtain the rankings corresponding to the specified user
          * @author Sergio Baena López
          * @version 1.0
          * @param {User object} $user the user that we want to get her/his rankings
          * @return {Array of Rankings object} the rankings corresponding to the specified user
          */
         public static function findByUser($user)
         {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME .
                    " WHERE " . self::$NAME . "." . self::$COL_ID_USER . " = ?;";
            $stmt = $db->prepare($sql);
            // associate values
            $stmt->bind_param("i", $user->getId());
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result
            (
                    $id,
                    $idUser, 
                    $idGame,
                    $points,
                    $numberOfHits, 
                    $numberOfFailures,
                    $numberOfAttempts
            );
            $rankingList = array();
            for($i = 0; $i < 4; $i++)
            {
                // get the value
                $stmt->fetch();
                // create a "Ranking" object container for all these values.
                $aRanking = new Ranking
                (
                        $id,
                        $user,
                        GameTable::findById($idGame),
                        $points,
                        $numberOfHits,
                        $numberOfFailures, 
                        $numberOfAttempts
                );
                // put in rankingList
                $rankingList[] = $aRanking;
            }
            // close connection
            $db->close();
            // return the rankingList
            return $rankingList;
         }
        
        
        
        
        
        
        
        
        
        
        
        
    }
?>