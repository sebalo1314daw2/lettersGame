<?php
    class Ranking 
    {
        // =========================================== Attributes ============================
        private $id;    
        private $user;  
        private $game;
        private $points;
        private $numberOfHits;
        private $numberOfFailures;
        private $numberOfAttempts;
        // =========================================== Constructor ============================
        function __construct($id, $user, $game, $points, $numberOfHits, $numberOfFailures, $numberOfAttempts) {
            $this->id = $id;
            $this->user = $user;
            $this->game = $game;
            $this->points = $points;
            $this->numberOfHits = $numberOfHits;
            $this->numberOfFailures = $numberOfFailures;
            $this->numberOfAttempts = $numberOfAttempts;
        }
        // ============================================= Accessors =================================
        public function getId() {
            return $this->id;
        }

        public function getUser() {
            return $this->user;
        }

        public function getGame() {
            return $this->game;
        }

        public function getPoints() {
            return $this->points;
        }

        public function getNumberOfHits() {
            return $this->numberOfHits;
        }

        public function getNumberOfFailures() {
            return $this->numberOfFailures;
        }

        public function getNumberOfAttempts() {
            return $this->numberOfAttempts;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setUser($user) {
            $this->user = $user;
        }

        public function setGame($game) {
            $this->game = $game;
        }

        public function setPoints($points) {
            $this->points = $points;
        }

        public function setNumberOfHits($numberOfHits) {
            $this->numberOfHits = $numberOfHits;
        }

        public function setNumberOfFailures($numberOfFailures) {
            $this->numberOfFailures = $numberOfFailures;
        }

        public function setNumberOfAttempts($numberOfAttempts) {
            $this->numberOfAttempts = $numberOfAttempts;
        }
        // ============================================= Methods =================================
    }
?>
