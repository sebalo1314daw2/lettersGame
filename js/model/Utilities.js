function Utilities(){}
// =========================================== Static methods =======================================================
/**
 * createSelect()
 * @description Function that aims to create a select all objects passed as parameter.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Array of objects} objectList the list of items that we put in the select.
 * @param {String} attrNameOptionContent attribute name that will be option content. 
 * @param {String} attrNameOptionValue attribute name that will be option value
 * @param {String} id the "id" to be the select
 * @return {Select object} a select all objects passed as parameter 
 */
Utilities.createSelect = function(objectList, attrNameOptionContent, attrNameOptionValue, id)
{
    var selectObject = $("<select></select>").attr("id", id);
    var anOptionObject;
    for(var i = 0; i < objectList.length; i++)
    {
        // we put the first letter in uppercase.
        attrNameOptionContent = attrNameOptionContent.charAt(0).toUpperCase() + 
                                attrNameOptionContent.substr(1);
        attrNameOptionValue = attrNameOptionValue.charAt(0).toUpperCase() + 
                              attrNameOptionValue.substr(1);
        eval
        (
                'anOptionObject = $("<option></option>").attr("value", objectList[' +
                i                                                                   +
                '].get'                                                             +
                attrNameOptionValue                                                 +
                '()).html(objectList['                                              +
                i                                                                   +
                '].get'                                                             +
                attrNameOptionContent                                               +
                '());'
        );
        // we put this option in select
        selectObject.append(anOptionObject);
    }
    // we put all the option in the select
    return selectObject;
}
/**
 * createErrorListInHTMLFormat()
 * @description Function that aims to create a list of errors in HTML format.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Array of String} errorsArray the array of errors
 * @return {ul object} the list of errors in HTML format
 */
Utilities.createErrorListInHTMLFormat = function(errorsArray)
{
    var list = $("<ul></ul>");
    var item;
    for(var i = 0; i < errorsArray.length; i++)
    {
        if(errorsArray[i] != undefined)
        {
            // create an item
            item = $("<li></li>").html(errorsArray[i]);
            list.append(item);
        }
    }
    return list;
}
/**
 * sendUserForRegister()
 * @description Function that is intended to send the specified user (student or teacher) to the server 
 * to register on the system.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Student object | Teacher object} user the user to send
 * @param {String} serverPath the server path where we send the user
 * @param {function} beforeSendFunction Function to be performed just before going to the server.
 * @param {function} completeFunction Function to be executed just after returning from the server.
 * @return {Associative array} an associative array with this format:
 * "isServerError" {boolean} if there is a server error or not.
 * "validationArray" {array} Array format --> first element:
 * a boolean indicating whether all valid attributes; second element: an associative array as the key the key of the fields attribute  and values​as a boolean indicating
 * whether the fields is valid or not; third element: an array of errors.
 */
Utilities.sendUserForRegister = function(user, serverPath, beforeSendFunction, completeFunction)
{
    var dataArray = new Array();
    dataArray["isServerError"] = false;
    $.ajax(
    {
            url: serverPath,
            type: "POST",
            async: false,
            data: "action=2&user=" + JSON.stringify(user),
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
                dataArray["validationArray"] = response;
            },
            error: function (xhr, ajaxOptions, thrownError) 
            {
                dataArray["isServerError"] = true;
            }	
    });
    return dataArray;
}
/**
 * associativeArrayToNumericArray()
 * @description Function that seeks to convert the numeric associative array to a normal array (numeric).
 * @author Sergio Baena López
 * @version 1.0
 * @param {Associative array} associativeArray the associative array to convert
 * @return {Array} the associative array converted in numeric array
 */
Utilities.associativeArrayToNumericArray = function(associativeArray)
{
    var numericArray = new Array();
    var index;
    for(var key in associativeArray)
    {
        index = parseInt(key);
        numericArray[index] = associativeArray[key];
    }
    return numericArray;
}
/**
 * dateConverter()
 * @description Function that seeks to convert a date format "yyyy-mm-dd" format "dd/mm/yyyy".
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} date date formatted "yyyy-mm-dd"
 * @return {Array} an associative array:
 * key: "converterError" {boolean} indicates if the converter has an error or not and could not do the conversion
 * key: "convertedDate" {String} the converted date (dd/mm/yyyy)
 */
Utilities.dateConverter = function(date)
{
    var dateArray = date.split("-");
    var arrayToReturn = new Array();
    if(dateArray.length == 3)
    {
        // correct number of elements of the date --> We can do the conversion
        arrayToReturn["converterError"] = false;
        arrayToReturn["convertedDate"] = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    }
    else
    {
        // incorrect number of elements of the date --> We cannot do the conversion
        arrayToReturn["converterError"] = true;
    }
    return arrayToReturn;
}
/**
 * dateConverterReverse()
 * @description Function that is intended to make the reverse conversion date, ie convert a date in
 * "dd/mm/yyyy" format to "yyyy-mm-dd" format.
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} date the date to convert (format dd/mm/yyyy)
 * @return {Array} an associative array:
 * key: "converterError" {boolean} indicates if the converter has an error or not and could not do the conversion
 * key: "convertedDate" {String} the converted date (yyyy-mm-dd)
 */
Utilities.dateConverterReverse = function(date)
{
    var dateArray = date.split("/");
    var arrayToReturn = new Array();
    if(dateArray.length == 3)
    {
        // correct number of elements of the date --> We can do the conversion
        arrayToReturn["converterError"] = false;
        arrayToReturn["convertedDate"] = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
    }
    else
    {
        // incorrect number of elements of the date --> We cannot do the conversion
        arrayToReturn["converterError"] = true;
    }
    return arrayToReturn;
}
/**
 * stopAll()
 * @description Procedure aims stop all sounds listed in the array (their id's).
 * @author Sergio Baena López
 * @version 1.0
 * @param {Array} soundList list of sound to pause
 */
Utilities.stopAll = function(soundList)
{
    for(var i = 0; i < soundList.length; i++)
    {
        document.getElementById(soundList[i]).pause();
        document.getElementById(soundList[i]).currentTime = "0";
    }   
}