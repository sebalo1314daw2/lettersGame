<?php
    class Utilities 
    {
        // ============================== Methods =================================================
        /**
         * correctProperName()
         * Function that seeks to correct a string with proper names. What it will do is to remove the
         * spaces from the beginning and the end, double spaces and make the first letter capitalized 
         * and the rest lower case.
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $properNames the proper names to correct
         * @return {String} the proper names corrected
         */
        public static function correctProperName($properNames)
        {
            // We remove the spaces from the sides.
            $properNames = trim($properNames);
            // We remove double or more spaces from the middle
            $properNames = preg_replace('/\s+/', ' ', $properNames);  
            // We put the first letter capitalized and the rest lower case of each word
            $properNames = mb_convert_case($properNames, MB_CASE_TITLE, "UTF-8");
            // Spent all non-ASCII characters to HTML entities.
            $properNames = htmlentities($properNames, ENT_COMPAT, "UTF-8");
            return $properNames;
        }
    }
?>