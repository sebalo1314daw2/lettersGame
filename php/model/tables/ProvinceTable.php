<?php
        require_once "../LettersGameDB.php";
        require_once "../tablesItem/Province.php";

//    require_once "../model/LettersGameDB.php";
//    require_once "../model/tablesItem/Province.php";
    class ProvinceTable 
    {
        // ==================================== Attributes ===================================
        private static $NAME = "province";
        private static $COL_ID = "id";
        private static $COL_VALUE = "value";
        // ==================================== Methods =======================================
        /**
         * obtainAll()
         * Function that seeks to get all provinces of the table.
         * @author Sergio Baena López
         * @version 1.0
         * @return {array of Province object} all provinces of the table
         */
        public static function obtainAll()
        {
            // open connection
            $db = new LettersGameDB();
            // prepare query
            $sql =   "SELECT *
                      FROM " . self::$NAME . ";";
            $stmt = $db->prepare($sql);
            // execute query
            $stmt->execute();
            // link outcome variables
            $stmt->bind_result($id, $value);
            // get the values
            $provinceList = array();
            while($stmt->fetch())
            {
                // He has returned true --> the data has  been obtained (is no end table)
                // create a "Province" object container for all these values.
                $aProvince = new Province($value);
                $aProvince->setId($id);
                $provinceList[] = $aProvince;
            }
            // close connection
            $db->close();
            // return the list of provinces
            return $provinceList;
        }
        /**
         * findById()
         * Function that seeks to find a province by id (primary key)
         * @author Sergio Baena López
         * @version 1.0
         * @param {int} $id the id that will filter.
         * @return {Province object} the Province object that has this id.
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
            $stmt->bind_result($id, $value);
            // get the value
            $stmt->fetch();
            // create a "Province" object container for all these values.
            $province = new Province($value);
            $province->setId($id);
            // close connection
            $db->close();
            // return the province object
            return $province;
        }
    }
    // Testeo
//    $lista = ProvinceTable::obtainAll();
//    echo $lista[3]->getId();
?>
