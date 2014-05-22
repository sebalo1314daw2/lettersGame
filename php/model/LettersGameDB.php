<?php
    class LettersGameDB extends mysqli
    {
        function __construct()
	{
		parent::__construct
                (
			"localhost",
			"root",
			"",
			"letters_game_db"
		);
	}
    }
?>
