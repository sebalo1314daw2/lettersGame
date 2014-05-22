<?php
    class LettersGameDB extends mysqli
    {
        function __construct()
	{
		parent::__construct
                (
			"localhost",
			"letters_user",
			"letters_user",
			"letters_game_db"
		);
	}
    }
?>
