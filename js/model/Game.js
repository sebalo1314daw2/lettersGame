function Game
(
        id, 
        name,
        shortDescription,
        rules,
        punctuationAtTheFirstAttempt,
        punctuationAtTheSecondAttempt,
        numOfWords
)
{
    // =================================== Attributes ========================================
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.rules = rules;
    this.punctuationAtTheFirstAttempt = punctuationAtTheFirstAttempt;
    this.punctuationAtTheSecondAttempt = punctuationAtTheSecondAttempt;
    this.numOfWords = numOfWords;
}
    // ===================================== Accessors ======================================
    // ------------------------------------------ Read accessors -----------------------------------
    Game.prototype.getId = function(){return this.id;}
    Game.prototype.getName = function(){return this.name;}
    Game.prototype.getShortDescription = function(){return this.shortDescription;}
    Game.prototype.getRules = function(){return this.rules;}
    Game.prototype.getPunctuationAtTheFirstAttempts = function(){return this.punctuationAtTheFirstAttempt;}
    Game.prototype.getPunctuationAtTheSecondAttempt = function(){return this.punctuationAtTheSecondAttempt;}
    Game.prototype.getNumOfWords = function(){return this.numOfWords;}
    // ------------------------------------------ Write accessors -----------------------------------
    Game.prototype.setId = function(id){this.id = id;}
    Game.prototype.setName = function(name){this.name = name;}
    Game.prototype.setShortDescription = function(shortDescription){this.shortDescription = shortDescription;}
    Game.prototype.setRules = function(rules){this.rules = rules;}
    Game.prototype.setPunctuationAtTheFirstAttempts = function(punctuationAtTheFirstAttempt){this.punctuationAtTheFirstAttempt = punctuationAtTheFirstAttempt;}
    Game.prototype.setPunctuationAtTheSecondAttempt = function(punctuationAtTheSecondAttempt){this.punctuationAtTheSecondAttempt = punctuationAtTheSecondAttempt;}
    Game.prototype.setNumOfWords = function(numOfWords){this.numOfWords = numOfWords;}
    // ===================================== Static methods ======================================
    /**
     * obtain()
     * @description Function that seeks to get the game object that corresponds to the "id" specified 
     * (in the database).
     * @author Sergio Baena López
     * @version 1.0
     * @param {Number} id the id of the game to obtain from database
     * @return A ESPECIFICAR
     */
    Game.obtain = function(id)
    {
        // POR AQUI VOY
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
    // ===================================== Methods =============================================