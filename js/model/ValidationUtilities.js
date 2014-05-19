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
/**
 * isValidSeriesOfCourses()
 * @description Function that seeks to indicate whether the specified string is a series of 
 * courses in the proper format or not. The format is: NL, NL, NL, ...
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} courses the series of courses to verify
 * @return {boolean} if the spacified string is a series of courses in the proper format or not
 */
ValidationUtilities.isValidSeriesOfCourses = function(courses)
{
    var isValid = true;
    var coursesArray = courses.split(", ");
    for(var i = 0; i < coursesArray.length && isValid; i++)
    {
        if(!ValidationUtilities.isValidCourse(coursesArray[i]))
        {
            // is invalid the format 
            isValid = false;
        }
    }
    return isValid;
}
/**
 * isValidCourse()
 * @description Function that is intended to indicate whether the specified course is valid or 
 * not. Consider a valid course which has this format: NL (number: 1-6, letter: A-Z or a-z)
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} course the courses to verify
 * @return {boolean} if the spacified string is a courses in the proper format or not
 */
ValidationUtilities.isValidCourse = function(course)
{
    var pattern = /^[1-6][A-Za-z]$/;
    var regExpObject = new RegExp(pattern);
    return regExpObject.test(course);    
}