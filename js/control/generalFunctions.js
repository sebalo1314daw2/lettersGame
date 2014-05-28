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
        window.document.getElementById("webBody").attachEvent("onkeyup", function()
        {
            var event = window.event;
            var ASCIICode = event.keyCode;
            keyHandler(ASCIICode);
        });
    }
    else
    {
        // is not Internet Explorer
        $(window).keyup(function(event)
        {
            var ASCIICode = event.keyCode;
            keyHandler(ASCIICode);
        });
    }
}
/**
 * checkInactivity()
 * @description Procedure that aims to check whether the site is inactive or not. Consider that the site 
 * is inactive if the time since the last time a key is pressed is longer than 10 minutes. If it is, this
 * process will play a sound asking if the user is there.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Array} soundList the list of sounds to stop (id)
 */
function checkInactivity(soundList)
{
    // we look at the empty "div" hidden chain.
    var currentTime = new Date().getTime();
    if($("#lastTimeAKeyWasPressed").html() == "")
    {
        // is empty string (no inactivity)
        // put the current time.
        $("#lastTimeAKeyWasPressed").html(currentTime);
    }
    else
    {
        // there may be inactivity
        var lastTime = parseInt($("#lastTimeAKeyWasPressed").html());
        // look if the user has spent more than 10 minutes (600000 milliseconds).
        if(currentTime - lastTime > 600000)
        {
            // more than 10 minutes of timeout
            Utilities.stopAll(soundList);
            document.getElementById("timeoutSound").play();
        }
    }
    // do this function into a loop. (each 2 minutes)
    setTimeout(function(){checkInactivity(soundList);}, 120000);
}
/**
 * addFocusEventInForm()
 * @description Procedure that aims to add the "onfocus" event in all fields of the form.
 * This procedure provides a method, "readField(fieldObject)", to manage what you do when a form 
 * field has the focus.
 * @author Sergio Baena López
 * @version 1.0
 */
function addFocusEventInForm()
{
    $(".field > *").focus(function(){readField($(this));});
}
/**
 * isWritingTheUser()
 * @description Procedure is intended to indicate if the user is typing in a form field or not.
 * @author Sergio Baena López
 * @version 1.0
 * @return {boolean} if the user is typing in a form field or not
 */
function isWritingTheUser()
{
    return $(".field > *").is(":focus");
}