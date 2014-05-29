<?php
    class Game 
    {
        // =========================================== Attributes ============================
        private $id;
        private $name;
        private $shortDescription;
        private $rules;
        private $punctuationAtTheFirstAttempt;
        private $punctuationAtTheSecondAttempt;
        private $timeOfFirstAttempt;
        private $timeOfSecondAttempt;
        private $numOfWords;
        // =========================================== Constructor ============================
        function __construct($id, $name, $shortDescription, $rules, $punctuationAtTheFirstAttempt, $punctuationAtTheSecondAttempt, $timeOfFirstAttempt, $timeOfSecondAttempt, $numOfWords) {
            $this->id = $id;
            $this->name = $name;
            $this->shortDescription = $shortDescription;
            $this->rules = $rules;
            $this->punctuationAtTheFirstAttempt = $punctuationAtTheFirstAttempt;
            $this->punctuationAtTheSecondAttempt = $punctuationAtTheSecondAttempt;
            $this->timeOfFirstAttempt = $timeOfFirstAttempt;
            $this->timeOfSecondAttempt = $timeOfSecondAttempt;
            $this->numOfWords = $numOfWords;
        }
        // ============================================= Accessors =================================
        public function getId() {
            return $this->id;
        }

        public function getName() {
            return $this->name;
        }

        public function getShortDescription() {
            return $this->shortDescription;
        }

        public function getRules() {
            return $this->rules;
        }

        public function getPunctuationAtTheFirstAttempt() {
            return $this->punctuationAtTheFirstAttempt;
        }

        public function getPunctuationAtTheSecondAttempt() {
            return $this->punctuationAtTheSecondAttempt;
        }

        public function getTimeOfFirstAttempt() {
            return $this->timeOfFirstAttempt;
        }

        public function getTimeOfSecondAttempt() {
            return $this->timeOfSecondAttempt;
        }

        public function getNumOfWords() {
            return $this->numOfWords;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setName($name) {
            $this->name = $name;
        }

        public function setShortDescription($shortDescription) {
            $this->shortDescription = $shortDescription;
        }

        public function setRules($rules) {
            $this->rules = $rules;
        }

        public function setPunctuationAtTheFirstAttempt($punctuationAtTheFirstAttempt) {
            $this->punctuationAtTheFirstAttempt = $punctuationAtTheFirstAttempt;
        }

        public function setPunctuationAtTheSecondAttempt($punctuationAtTheSecondAttempt) {
            $this->punctuationAtTheSecondAttempt = $punctuationAtTheSecondAttempt;
        }

        public function setTimeOfFirstAttempt($timeOfFirstAttempt) {
            $this->timeOfFirstAttempt = $timeOfFirstAttempt;
        }

        public function setTimeOfSecondAttempt($timeOfSecondAttempt) {
            $this->timeOfSecondAttempt = $timeOfSecondAttempt;
        }

        public function setNumOfWords($numOfWords) {
            $this->numOfWords = $numOfWords;
        }
        // ============================================= Methods =================================
    }
?>
