function Teacher(user, province, school, city, courses)
{
    // =================================== Attributes ===============================================
    this.user = user; // (User object)
    this.province = province; // (Province object)
    this.school = school; // (String)
    this.city = city; // (String)
    this.courses = courses; // (String)
}
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    Teacher.prototype.getUser = function(){return this.user;}
    Teacher.prototype.getProvince = function(){return this.province;}
    Teacher.prototype.getSchool = function(){return this.school;}
    Teacher.prototype.getCity = function(){return this.city;}
    Teacher.prototype.getCourses = function(){return this.courses;}
    // ------------------------------------------ Write accessors -----------------------------------
    Teacher.prototype.setUser = function(user){this.user = user;}
    Teacher.prototype.setProvince = function(province){this.province = province;}
    Teacher.prototype.setSchool = function(school){this.school = school;}
    Teacher.prototype.setCity = function(city){this.city = city;}
    Teacher.prototype.setCourses = function(courses){this.courses = courses;}
    // ===================================== Methods =============================================
    /**
      * obtainAll()
      * @description Function that seeks to get all teachers stored in the database.
      * @author Sergio Baena López
      * @version 1.0
      * @param {String} serverPath the server path where we obtain all the teachers
      * @param {function} beforeSendFunction Function to be performed just before going to the server.
      * @param {function} completeFunction Function to be executed just after returning from the server.
      * @return {Array} An associative array with this format:
      * "isServerError" {boolean} if an error has occurred with the server.
      * "teacherList" {Array of Teacher objects} all teachers stored in the database
      */
    Teacher.prototype.obtainAll = function(serverPath, beforeSendFunction, completeFunction)
    {
        var outputData;
        var dataArray = new Array();
        dataArray["isServerError"] = false;
        $.ajax(
        {
                url: serverPath,
                type: "POST",
                async: false,
                data: "action=1",
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
            dataArray["teacherList"] = new Array();
            var aTeacher;
            var anUser;
            var aProvince;
            for(var i = 0; i < outputData.length; i++)
            {
                // create an User object
                anUser = new User
                (
                        outputData[i].user.username,
                        outputData[i].user.password,
                        "",
                        outputData[i].user.name,
                        outputData[i].user.surnames
                );
                anUser.setId(outputData[i].user.id);
                // create a Province object
                aProvince = new Province(outputData[i].province.value);
                aProvince.setId(outputData[i].province.id);
                // create a Teacher object
                aTeacher = new Teacher
                (
                        anUser,
                        aProvince,
                        outputData[i].school,
                        outputData[i].city,
                        outputData[i].courses
                );
                dataArray["teacherList"].push(aTeacher);
            }
        }
        return dataArray;
    }
    /**
     * validate()
     * @description Procedure that aims to validate all its attributes.
     * @author Sergio Baena López
     * @version 1.0
     * @return {array} Array format --> first element:
     * a boolean indicating whether all valid attributes; second element: an associative array as the key the key of the fields attribute  and values​as a boolean indicating
     * whether the fields is valid or not; third element: an array of errors.
     */
    Teacher.prototype.validate = function()
    {
        // ----------------------------------- Validation user -------------------------
        var validationArray = this.user.validate();
        // ----------------------------------- Validation school -------------------------
        if(ValidationUtilities.isEmpty(this.school))
        {
            // is valid
            validationArray[1]["school"] = true;   
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["school"] = false;
            validationArray[2][2] = "[Colegio] Tienes que indicarlo.";
        }
        // ----------------------------------- Validation city -------------------------
        if(ValidationUtilities.isEmpty(this.city))
        {
            // is valid
            validationArray[1]["city"] = true;   
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["city"] = false;
            validationArray[2][3] = "[Ciudad] Tienes que indicarlo.";
        }
        // ----------------------------------- Validation courses -------------------------
        if(ValidationUtilities.isValidSeriesOfCourses(this.courses))
        {
            // is valid
            validationArray[1]["courses"] = true;   
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["courses"] = false;
            validationArray[2][6] = "[Cursos] Tiene que seguir el formato n&uacute;mero (1-6) letra (A-Z)y separados con coma y espacio.";
        }
        return validationArray;
    }