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
/**
 * isEmpty()
 * @description Function that seeks to see if the specified string is empty or not. We'll
 * consider it empty if empty string or contains only spaces.
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} theString the string to look
 * @return {boolean} if the specified string is empty or not
 */
ValidationUtilities.isEmpty = function(theString)
{
    var isValid = false;
    if(!theString == "")
    {
        // the string is not empty string
        // look, now, if it only has spaces.
        var pattern = /^[ ]+$/;
        var regExpObject = new RegExp(pattern);
        if(!regExpObject.test(theString))
        {
            // not only has spaces 
            // is valid
            isValid = true;
        }
    }
    return isValid;
}















/**
    * isEarlierDate()
    * @description Function that seeks to indicate if the specified string  is an earlier 
    * date or not.
    * @author Sergio Baena López
    * @version 1.0
    * @param {String} date the date to look
    * @return {boolean} if the specified data is an earlier date or not.
    */
   ValidationUtilities.isEarlierDate = function(date)
   {
       if(ValidationUtilities.isDateFormat(date))
       {
           // is valid date format
           // Now, you have to extract substrings numeric and numeric pass them.
           var dateArray = date.split("/");
           var day = parseInt(dateArray[0]);
           var month = parseInt(dateArray[1]);
           var year = parseInt(dateArray[2]);
           // We have the days months and years in numeric variables
           // We check now that the date is correct
           if(ValidationUtilities.isValidDate(day, month, year)) 
           {
               // Valid date
               // Finally, check that the date is earlier than today
                if(ValidationUtilities.isValidEarlierDate(day, month, year)) 
                {
                    // earlier date
                    return true;
                }
                else
                {
                    // not earlier date
                    return false;
                }
           }
           else
           {
               // Invalid date
               return false;
           }
       }
       else
       {
           // is not valid date format
           return false;
       }
   }
   /**
    * isDateFormat()
    * @description Function is intended to indicate if the specified data has a date format 
    * or not. The date format should be DD/MM/YYYY.
    * @author Sergio Baena López
    * @version 1.0
    * @param {String} date the date to look
    * @return {boolean} indicate if the specified data has a date format or not (DD/MM/YYYY).
    */
   ValidationUtilities.isDateFormat = function(date)
   {
       var dateArray = date.split("/");
       // We have created the array of date.
       // We check if the array has 3 elements.
       if(dateArray.length == 3)
       {
           // Valid number of items.
           // check now be positive integer.
           if
           (
              ValidationUtilities.isPositiveInteger(dateArray[0]) && 
              ValidationUtilities.isPositiveInteger(dateArray[1]) && 
              ValidationUtilities.isPositiveInteger(dateArray[2])
           )
           {
               // The 3 elements are positive integer --> format date
               return true;
           }
           else
           {
               // There are not numerical the 3 items --> not format date
               return false;
           }
       }
       else
       {
           // Invalid number of items.
           return false;
       } 
   }
   /**
    * isPositiveInteger()
    * @description Function that aims to indicate whether the specified data is positive integer or not.
    * @author Sergio Baena López
    * @version 1.0
    * @param {String} num the number to look
    * @returns {boolean} indicates whether the specified string is positive integer or not.
    */
    ValidationUtilities.isPositiveInteger = function(num)
    {
       if(num.match(/^[0-9]+$/))
       {
           // positive integer the string data
           return true;
       }
       else
       {
           // Not positive integer the string data
           return false
       }
    }
    /**
    * isValidDate()
    * @description Function is intended to indicate if the date is valid or not transferred.
    * @author Sergio Baena López
    * @version 1.0
    * @param {Number} day The day part of the date
    * @param {Number} month The month part of the date
    * @param {Number} year The year part of the date
    * @returns {boolean} Indicates whether the date is valid or not
    */
   ValidationUtilities.isValidDate = function(day, month, year)
   {
       if(year < 0)
       {
                   // Invalid year --> incorrect date
                   return false;
       }
       // Year right, continue checking.
       if(month < 1 || month > 12)
       {
                    // Invalid month --> incorrect date
                    return false;
       }
       // Year and month correct, continue checking
       // If the day is correct, the date will be correct.
       if(month <= 7 && month != 2)
       {
                 // If you couple month, the last day of the month is 30.
                 if(month % 2 == 0) // It is par
                 {
                        if(day >= 1 && day <= 30)
                        {
                               // Day right --> correct date
                               return true;
                        }
                        else
                        {
                               // Wrong Day --> incorrect date
                               return false;
                        }
                 }
                 else
                 {
                        // Is odd
                        if(day >= 1 && day <= 31)
                        {
                               // Day right --> correct date
                               return true;
                        }
                        else
                        {
                               // Wrong Day --> incorrect date
                               return false;
                        }
                 }
          }
          if(month > 7)
          {
                 // If the month is even, the last day is 31
                 if(month % 2 == 0) // Pair
                 {
                        if(day >= 1 && day <= 31)
                        {
                               // Day right --> correct date
                               return true;
                        }
                        else
                        {
                               // Wrong Day --> incorrect date
                               return false;
                        }
                 }
                 else
                 {
                        // odd
                        if(day >= 1 && day <= 30)
                        {
                               // Day right --> correct date
                               return true;
                        }
                        else
                        {
                               // Wrong Day --> incorrect date
                               return false;
                        }
                 }
          }
          if(month == 2)
          {
                 // Depending on whether the year is leap or not, the last day of the month is 29 or 28, respectively.
                 if(ValidationUtilities.isLeapYear(year))
                 {
                         // is leap
                         if(day >= 1 && day <= 29)
                         {
                                      // Day right --> correct date
                                       return true;
                         }
                         else
                         {
                                       return false;
                         }       
                 }
                 else
                 {
                         // is not leap
                         if(day >= 1 && day <= 28)
                         {
                                      // Day right --> correct date
                                      return true;
                         }
                         else
                         {
                                      return false;
                         }
                 }
          }
   }
   /**
    * isLeapYear()
    * @description Function that aims to indicate whether the transfer is a leap year or not
    * @author Sergio Baena López
    * @version 1.0
    * @param {Number} year year to evaluate
    * @returns {boolean} if the transfer is a leap year or not
    */
   ValidationUtilities.isLeapYear = function(year)
   {
       // A year is a leap year if it is divisible by 4, unless it is divisible by 100 but not by 400.
       if(year % 4 == 0) 
       {
               // Divisible by 4
               if(year % 100 == 0 && year % 400 != 0)
               {
                      // Non-leap year
                      return false;
               }
               else
               {
                      // leap-year
                      return true;
               }
       }
       else
       {
               // Is not divisible by 4 --> not leap-year
               return false;
       }
   }
   /**
    * isValidEarlierDate()
    * @description Function is intended to indicate if the date passed as parameter is earlier than today.
    * @author Sergio Baena López
    * @version 1.0
    * @param {Number} day The day part of the date
    * @param {Number} month The month part of the date
    * @param {Number} year The year part of the date
    * @returns {boolean} Indicates whether the date is earlier or not
    */
   ValidationUtilities.isValidEarlierDate = function(day, month, year)
   {
       var dateToday = new Date();
       if(year != dateToday.getFullYear())
       {
              // Different years.
              if(year < dateToday.getFullYear())
              {
                      // The date is earlier.
                      return true;
              }
              else
              {
                      // The date is not earlier.
                      return false;
              }
       }
       else
       {
              // Years equal
              if(month != (dateToday.getMonth() + 1))
              {
                     // Different months
                     if(month < (dateToday.getMonth() + 1))
                     {
                             // The date is earlier
                             return true;
                     }
                     else
                     {
                             // The date is not earlier
                             return false;
                     }
              }
              else
              {
                     // months equal
                     if(day < dateToday.getDate())
                     {
                            // The date is earlier
                            return true;
                     }
                     else
                     {
                            // The date is not earlier.
                            return false;
                     }
              }
       }
   }