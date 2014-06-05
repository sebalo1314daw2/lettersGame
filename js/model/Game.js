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
     * @param {String} serverPath the server path where we obtain all the teachers
     * @param {function} beforeSendFunction Function to be performed just before going to the server.
     * @param {function} completeFunction Function to be executed just after returning from the server.
     * @return A ESPECIFICAR
     */
    Game.obtain = function(id, serverPath, beforeSendFunction, completeFunction)
    {
        $.ajax(
        {
                url: serverPath,
                type: "POST",
                async: false,
                data: "action=5&id=" + id,
                dataType: "json",
                beforeSend: function (xhr)
                {
//                    beforeSendFunction();
                },
                complete: function (xhr, status)
                {
//                    completeFunction();
                },
                success: function (response)
                {
//                    outputData = response;
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
//                    dataArray["isServerError"] = true;
                }	
        }); 
    }
    // ===================================== Methods =============================================