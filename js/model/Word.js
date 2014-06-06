function Word(id, value,numberOfSyllabes, category)
{
    // =================================== Attributes ===============================================
    this.id = id;
    this.value = value;
    this.numberOfSyllabes = numberOfSyllabes;
    this.category = category;
}
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    Word.prototype.getId = function(){return this.id;}
    Word.prototype.getValue = function(){return this.value;}
    Word.prototype.getNumberOfSyllabes = function(){return this.numberOfSyllabes;}
    Word.prototype.getCategory = function(){return this.category;}
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
     * @return A ESPECIFICAR
     */
    Word.obtainRandomlyFromDatabase = function(numWords, serverPath, beforeSendFunction, completeFunction)
    {
        $.ajax(
        {
                url: serverPath,
                type: "POST",
                async: false,
                data: "action=6&numWords=" + numWords,
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
    