function User(username, password, passwordConfirmation, name, surnames)
{
    // =================================== Attributes ===============================================
    this.id; // (Number)
    this.username = username; // (String)
    this.password = password; // (String)
    this.passwordConfirmation = passwordConfirmation; // (String)
    this.name = name; // (String)
    this.surnames = surnames; // (String)
}
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    User.prototype.getId = function(){return this.id;}
    User.prototype.getUsername = function(){return this.username;}
    User.prototype.getPassword = function(){return this.password;}
    User.prototype.getPasswordConfirmation = function(){return this.passwordConfirmation;}
    User.prototype.getName = function(){return this.name;}
    User.prototype.getSurnames = function(){return this.surnames;}
    // ------------------------------------------ Write accessors -----------------------------------
    User.prototype.setId = function(id){this.id = id;}
    User.prototype.setUsername = function(username){this.username = username;}
    User.prototype.setPassword = function(password){this.password = password;}
    User.prototype.setPasswordConfirmation = function(passwordConfirmation){this.passwordConfirmation = passwordConfirmation;}
    User.prototype.setName = function(name){this.name = name;}
    User.prototype.setSurnames = function(surnames){this.surnames = surnames;}
    // ===================================== Methods =============================================
    /**
     * validate()
     * @description Function that seeks to validate the attributes of this object
     * @author Sergio Baena López
     * @version 1.0
     * @return {array} Array format --> first element:
     * a boolean indicating whether all valid attributes; second element: an associative array as the key the key of the fields attribute  and values​as a boolean indicating
     * whether the fields is valid or not; third element: an array of errors.
     */
    User.prototype.validate = function()
    {
        /*
        --------------------------------------------------------------------------------
                                    array of errors (format)
        --------------------------------------------------------------------------------
                    position                                        field
        ------------------------------------- ------------------------------------------
        0                                      name                      
        1                                      surnames
        2                                      school
        3                                      city
        4                                      username
        5                                      password
        6                                      course/courses
        7                                      date of birth                            */
        var validationArray = new Array();
        validationArray[0] = true; // All attributes are valid until otherwise stated.
        validationArray[1] = new Array();
        validationArray[2] = new Array();
        // ----------------------------------- Validation name -------------------------
        if(ValidationUtilities.containsOnlyLettersAndSpaces(this.name))
        {
            // is valid
            validationArray[1]["name"] = true;   
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["name"] = false;
            validationArray[2][0] = "[Nombre] S&oacute;lo se aceptan letras y espacios.";
        }
        // ----------------------------------- Validation surnames -------------------------
        if(ValidationUtilities.containsOnlyLettersAndSpaces(this.surnames))
        {
            // is valid
            validationArray[1]["surnames"] = true;   
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["surnames"] = false;
            validationArray[2][1] = "[Apellidos] S&oacute;lo se aceptan letras y espacios.";
        }
        // ----------------------------------- Validation username -------------------------
        if(ValidationUtilities.isCorrectUsername(4, this.username))
        {
            // is valid
            validationArray[1]["username"] = true;   
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["username"] = false;
            validationArray[2][4] = 
                    "[Nombre de usuario] S&oacute;lo se aceptan letras del alfebeto ingl&eacute;s, "   +
                    "n&uacute;meros, puntos, guiones y guiones bajos. Adem&aacute;s tiene que tener, " +
                    "como m&iacute;nimo 4 car&aacute;cteres.";
        }
        // ----------------------------------- Validation password -------------------------
        if(this.password.length >= 7 && this.password == this.passwordConfirmation)
        {
            // is valid
            validationArray[1]["password"] = true;
        }
        else
        {
            // is invalid
            validationArray[0] = false;
            validationArray[1]["password"] = false;
            validationArray[2][5] =
                    "[Contrase&ntilde;a] Contrase&ntilde;a inv&aacute;lida. Ten en cuenta que la " +
                    "contrase&ntilde;a tiene que tener, almenos, 7 car&aacute;cteres.";
        }
        // ----------------------------------- return data -------------------------
        return validationArray;   
    }
        