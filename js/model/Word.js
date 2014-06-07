function Word(id, value,numberOfSyllabes, category)
{
    // =================================== Attributes ===============================================
    this.id = id;
    this.value = value;
    this.numberOfSyllabes = numberOfSyllabes;
    this.category = category;
}
    Word.NAME_COOKIE = "word";
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    Word.prototype.getId = function(){return this.id;}
    Word.prototype.getValue = function(){return this.value;}
    Word.prototype.getNumberOfSyllabes = function(){return this.numberOfSyllabes;}
    Word.prototype.getCategory = function(){return this.category;}
    Word.prototype.getNAME_COOKIE = function(){return Word.NAME_COOKIE;}
    // ------------------------------------------ Write accessors -----------------------------------
    Word.prototype.setId = function(id){this.id = id;}
    Word.prototype.setValue = function(value){this.value = value;}
    Word.prototype.setNumberOfSyllabes = function(numberOfSyllabes){this.numberOfSyllabes = numberOfSyllabes;}
    Word.prototype.setCategory = function(category){this.category = category;}
    // ================================== Static methods =============================================
    /**
     * obtainRandomlyFromDatabase()
     * @description Function that seeks to get random words from the database. The number of words to
     * be searched will be indicated by parameter.
     * @author Sergio Baena López
     * @version 1.0
     * @param {Number} numWords the number of words to obtain
     * @param {String} serverPath the server path where we obtain the words
     * @param {function} beforeSendFunction Function to be performed just before going to the server.
     * @param {function} completeFunction Function to be executed just after returning from the server.
     * @return {Array} An associative array with this format:
     * "isServerError" {boolean} if an error has occurred with the server.
     * "deniedAccess" {boolean} if the access is denied or not
     * "wordList" {Array of Word objects} the random words obtained
     */
    Word.obtainRandomlyFromDatabase = function(numWords, serverPath, beforeSendFunction, completeFunction)
    {
        var outputData = new Array(); // associative array to return
        var isServerError = false;
        $.ajax(
        {
                url: serverPath,
                type: "POST",
                async: false,
                data: "action=6&numWords=" + numWords,
                dataType: "json",
                beforeSend: function (xhr)
                {
                    beforeSendFunction();
                },
                complete: function (xhr, status)
                {
                    completeFunction();
                },
                success: function (response)
                {
                    outputData = response;
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
                    isServerError = true;
                }	
        }); 
        outputData["isServerError"] = isServerError;
        if(!outputData["isServerError"])
        {
            // is not server error
            // JSON objects --> JavaScript objects
            for(var i = 0; i < outputData["wordList"].length; i++)
            {
                outputData["wordList"][i] = new Word
                (
                        outputData["wordList"][i].id, 
                        outputData["wordList"][i].value, 
                        outputData["wordList"][i].numberOfSyllabes,
                        outputData["wordList"][i].category
                );
            }
        }
        return outputData;
    }
    // ================================== Methods =============================================
    /**
     * store()
     * @description Procedure which aims to store this object in a cookie.
     * @author Sergio Baena López
     * @version 1.0
     * @param {Number} index The number to be concatenated to the name of the cookie that will make 
     * it unique.
     */
    Word.prototype.store = function(index)
    {
        $.cookie(this.getNAME_COOKIE() + index, JSON.stringify(this), {path: "/"});
    }