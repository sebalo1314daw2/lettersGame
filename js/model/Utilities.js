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