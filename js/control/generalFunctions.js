/**
 * showLoadAnimation()
 * @description Procedure is to show the loading animation. What it will do is place the image centered on 
 * the web and obscure everything back.
 * @author Sergio Baena López
 * @version 1.0
 */ 
function showLoadAnimation()
{
    // put the loading class
    $("#loadAnimation").addClass("loading");
    $("#webContainer").addClass("loading");
    $("body").addClass("loading");
}
/**
 * hideLoadAnimation()
 * @description Procedure is to hide the loading animation. Put everything as it was before.
 * @author Sergio Baena López
 * @version 1.0
 */
function hideLoadAnimation()
{
    // quit the loading class
    $("#loadAnimation").removeClass("loading");
    $("#webContainer").removeClass("loading");
    $("body").removeClass("loading");
}
/**
 * showErrors()
 * @description Procedure is to show an "alert" all the errors contained in the specified array.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Array of Strings} errorsArray array containing the errors
 */
function showErrors(errorsArray)
{
    var alertContent = "";
    for(var i = 0; i < errorsArray.length; i++)
    {
        alertContent += errorsArray[i] + "\n\n";
    }
    alert(alertContent);
}
/**
 * enableCaptureKey()
 * @description Procedure that aims to enable the capture key. To handle user keystrokes, create a function 
 * called keyHandler(ASCIICode)
 * @author Sergio Baena López
 * @version 1.0
 */
function enableCaptureKey()
{
    if(navigator.appVersion.indexOf("MSIE") != -1)
    {
        // is Internet Explorer
        window.document.getElementById("webBody").attachEvent("onkeydown", function()
        {
            var event = window.event;
            var ASCIICode = event.keyCode;
            keyHandler(ASCIICode);
        });
    }
    else
    {
        // is not Internet Explorer
        $(window).keydown(function(event)
        {
            var ASCIICode = event.keyCode;
            keyHandler(ASCIICode);
        });
    }
}