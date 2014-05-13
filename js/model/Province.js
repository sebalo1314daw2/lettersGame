function Province(value)
{
     // =================================== Attributes ===============================================
     this.id;            // province identifier         (Number)
     this.value = value; // the name of the province    (String)
}
     // ===================================== Accessors =============================================
     // ------------------------------------------ Read accessors -----------------------------------
     Province.prototype.getId = function(){return this.id;}
     Province.prototype.getValue = function(){return this.value;}
     // ------------------------------------------ Write accessors -----------------------------------
     Province.prototype.setId = function(id){this.id = id;}
     Province.prototype.setValue = function(value){this.value = value;}
     // ===================================== Methods =============================================
     /**
      * obtainAll()
      * @description Function that seeks to get all provinces stored in the database.
      * @author Sergio Baena López
      * @version 1.0
      * @param {String} serverPath the server path where we obtain all the provinces
      * @param {function} beforeSendFunction Function to be performed just before going to the server.
      * @param {function} completeFunction Function to be executed just after returning from the server.
      * @return {Array of Provinces} all provinces stored in the database
      */
     Province.prototype.obtainAll = function(serverPath, beforeSendFunction, completeFunction)
     {
        $.ajax(
        {
                url: serverPath,
                type: "POST",
                async: false,
                data: "action=0",
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
//                    outputData = response;
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
//                    sessionArray["isServerError"] = true;
                }	
        }); 
     }
     


