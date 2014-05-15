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