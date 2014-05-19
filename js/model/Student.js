function Student(user, province, school, city, course,dateOfBirth)
{
        // =================================== Attributes ========================================
        this.user = user; // (User object)
        this.province = province; // (Province object)
        this.school = school; // (String)
        this.city = city; // (String)
        this.course = course; // (String)
        this.dateOfBirth = dateOfBirth; // (String)
}
        Student.prototype.TYPE = "Student"; // (String)
        // ===================================== Accessors ======================================
        // ------------------------------------------ Read accessors -----------------------------------
        Student.prototype.getUser = function(){return this.user;}
        Student.prototype.getProvince = function(){return this.province;}
        Student.prototype.getSchool = function(){return this.school;}
        Student.prototype.getCity = function(){return this.city;}
        Student.prototype.getCourse = function(){return this.course;}
        Student.prototype.getDateOfBirth = function(){return this.dateOfBirth;}
        // ------------------------------------------ Write accessors -----------------------------------
        Student.prototype.setUser = function(user){this.user = user;}
        Student.prototype.setProvince = function(province){this.province = province;}
        Student.prototype.setSchool = function(school){this.school = school;}
        Student.prototype.setCity = function(city){this.city = city;}
        Student.prototype.setCourse = function(course){this.course = course;}
        Student.prototype.SetDateOfBirth = function(dateOfBirth){this.dateOfBirth = dateOfBirth;}
        // ===================================== Methods =============================================
       /**
        * validate()
        * @description Procedure that aims to validate all its attributes.
        * @author Sergio Baena López
        * @version 1.0
        * @return {array} Array format --> first element:
        * a boolean indicating whether all valid attributes; second element: an associative array as the key the key of the fields attribute  and values​as a boolean indicating
        * whether the fields is valid or not; third element: an array of errors.
        */
       Student.prototype.validate = function()
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
            // ----------------------------------- Validation course -------------------------
            if(ValidationUtilities.isValidCourse(this.course))
            {
                // is valid
                validationArray[1]["course"] = true;   
            }
            else
            {
                // is invalid
                validationArray[0] = false;
                validationArray[1]["course"] = false;
                validationArray[2][6] = "[Curso] Tiene que seguir el formato n&uacute;mero (1-6) letra (A-Z).";
            }
            // ----------------------------------- Validation dateOfBirth ------------------
            if(ValidationUtilities.isEarlierDate(this.dateOfBirth))
            {
                // is valid
                validationArray[1]["dateOfBirth"] = true;   
            }
            else
            {
                // is invalid
                validationArray[0] = false;
                validationArray[1]["dateOfBirth"] = false;
                validationArray[2][7] = "[Fecha de nacimiento] Tiene que ser una fecha pasada.";
            }
            return validationArray;
       }