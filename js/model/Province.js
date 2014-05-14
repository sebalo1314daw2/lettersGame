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
      * @return {Array} An associative array with this format:
      * "isServerError" {boolean} if an error has occurred with the server.
      * "provinceList" {Array of Provinces} all provinces stored in the database
      */
     Province.prototype.obtainAll = function(serverPath, beforeSendFunction, completeFunction)
     {
        var outputData;
        var dataArray = new Array();
        dataArray["isServerError"] = false;
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
                    outputData = response;
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
                    dataArray["isServerError"] = true;
                }	
        }); 
        if(!dataArray["isServerError"])
        {
            // is not server error
            dataArray["provinceList"] = new Array();
            var aProvince;
            for(var i = 0; i < outputData.length; i++)
            {
                aProvince = new Province(outputData[i].value);
                aProvince.setId(outputData[i].id);
                dataArray["provinceList"].push(aProvince);
            }
        }
        return dataArray;
     }


