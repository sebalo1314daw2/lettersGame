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
        /**
         * convertStringToSound()
         * Procedure that aims to transform a string to a mp3 sound file.
         * @author Sergio Baena López
         * @version 1.0
         * @param {String} $string the string to convert
         * @param {String} $path the path where will be the sound file (must end with /)
         * @param {String} $fileName the file name of the created sound (without file extension)
         */
        public static function convertStringToSound($string, $path, $fileName)
        {
            $cmd = "espeak -ves+f5 -s150 '" . $string . "' -w /tmp/" . $fileName . ".wav";
//            echo $cmd;
            shell_exec($cmd);
            // we have the sound format "wav"
            // changed it to mp3.
            $cmd = "lame /tmp/" . $fileName . ".wav " . $path . $fileName . ".mp3";
//            echo $cmd;
            shell_exec($cmd);
            // remove the file "wav".
            $cmd = "rm /tmp/" . $fileName . ".wav";
//            echo $cmd;
            shell_exec($cmd);
        }
    }
    // Testeo
//    Utilities::convertStringToSound("Hola isaac", "/var/www/", "prueba");
?>