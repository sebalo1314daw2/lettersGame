$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    soundList = new Array
    (
            "generalDescriptionSound",
//            "goToHomeSound",
            "beginFormSound",
            "endFormSound",
            "clickLinkSound",
            "sendFormSound",
            "usernameEmptySound",
            "passwordEmptySound",
            "timeoutSound"
    );
//    enableCaptureKey();
    checkInactivity(soundList);
//    addFocusEventInForm();
    $("#idUser").html(new Date().getTime());
}
/**
 * enterTheSystem()
 * @description Procedure aims logging of a user in the system. It shall be verified, first, you have entered 
 * a username and password (in case you message username and / or password is invalid display). Secondly, 
 * it will go to the server to check for that user. If it exists, it will open a session on the server
 * and the client.
 * @author Sergio Baena López
 * @version 1.0
 */
function enterTheSystem()
{
    var SERVER_PATH = "../php/control/invokeController.php";
    var BEFORE_SEND_FUNCTION = function(){showLoadAnimation();};
    var COMPLETE_FUNCTION = function(){hideLoadAnimation();};
    // create a User object with form data.
    var user = new User($("#username").val(), $("#password").val(), "", "", "");
    var sessionArray = user.logIn(SERVER_PATH, BEFORE_SEND_FUNCTION, COMPLETE_FUNCTION);
    // sessionArray loaded
    if(sessionArray["isServerError"])
    {
        // is server error
        // for normal user.
        $("#errorsForm").children().remove();
        var errorList = new Array();
        errorList.push("Nombre de usuario y/o contrase&ntilde;a inv&aacute;lida");
        // an message about the server error for user
        errorList.push("Error del servidor. Esto puede ser debido a que tu conexi&oacute;n de Internet haya fallado. No te has podido loguear");
        var errorListInHTMLFormat = Utilities.createErrorListInHTMLFormat(errorList);
        $("#errorsForm").append(errorListInHTMLFormat);
        // reset fields
        // TODO
        // for blind user
        // TODO
    }
    else
    {
        // is not server error
        if(sessionArray["sessionOpened"])
        {
            // session opened
            // Let's go play now view
            // TODO
            // we show to player ranking 
//            resetRankingTable(window.document);
//            generateRankingTableOfActivePlayer(window.document);
            // change the menu
//            $(".beforeOpenSession").hide();
//            $(".afterOpenSession").show();
        }
        else
        {
            // session did not open
            // show to the error message of the login 
            $("#errorsForm").children().remove();
            var errorList = new Array();
            errorList.push("Nombre de usuario y/o contrase&ntilde;a inv&aacute;lida");
            var errorListInHTMLFormat = Utilities.createErrorListInHTMLFormat(errorList);
            $("#errorsForm").append(errorListInHTMLFormat);
            // reset login form
            // TODO
        }
    }
}