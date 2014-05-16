function ValidationUtilities(){}
// =============================== Methods ====================================================
/**
 * containsOnlyLettersAndSpaces()
 * @description Function that seeks to verify that the specified string contains only letters
 * and spaces.
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} data the data to verify
 * @return {boolean} indicate if the data contains only letters and spaces
 */
ValidationUtilities.containsOnlyLettersAndSpaces = function(data)
{
    var isValid = true;
    // reduce cases putting all lowercase 
    data = data.toLowerCase();
    var pattern = /^[a-zñçàèìòùáéíóúäëïöüâêîôû ]+$/;
    var regExp = new RegExp(pattern);
    if(regExp.test(data))
    {
        // match
        // can be valid
        // look, now, if it has no only spaces.
        pattern = /^[ ]+$/;
        regExp = new RegExp(pattern);
        isValid = !regExp.test(data); // invalid
    }
    else
    {
        // not match --> is invalid
        isValid = false;
    }
    return isValid;
}
/**
 * isCorrectUsername()
 * @description Function that seeks to see if the data is a user name or not. 
 * We believe that a user name is a word that contains English letters, numbers, dashes,
 * dots, and underscores. It musts start with a letter and have a certain length.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Number} lengthMin minimum length that must have
 * @param {String} data the data to verify
 * @return {boolean} whether the data is a correct username or not
 */
 ValidationUtilities.isCorrectUsername = function(lengthMin, data)
 {
    var isCorrect = false;
    if(data.length >= lengthMin)
    {
        var pattern = /^[A-Za-z][A-Za-z0-9._-]*$/;
        var regExpObject = new RegExp(pattern);
        if(regExpObject.test(data))
        {
            // is correct username
            isCorrect = true;
        }
   }
   return isCorrect;
 }
