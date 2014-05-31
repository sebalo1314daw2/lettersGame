/**
 * atTheStartOfPage()
 * @description Procedure which aims to call certain functions when the page loads for its proper 
 * functioning of it.
 * @author Sergio Baena López
 * @version 1.0
 */
function atTheStartOfPage()
{
    soundList = new Array
    (
            "generalDescriptionSound",
            "goToRegisterSound",
            "beginFormSound",
            "endFormSound",
            "clickLinkSound",
            "sendFormSound",
            "usernameEmptySound",
            "passwordEmptySound",
            "timeoutSound"
    );
    enableCaptureKey();
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
/**
 * keyHandler()
 * @description Procedure aims handle a keypress event for different actions that will make the web
 * (for the blind).
 * @author Sergio Baena López
 * @version 1.0
 * @param {Number} ASCIICode the ASCII code of the pressed letter.
 */
function keyHandler(ASCIICode)
{
//    alert(ASCIICode);
    var SERVER_PATH = "../php/control/invokeController.php";
    switch(ASCIICode)
    {
        case 37:
            // Key: <--
            // Action: click on the menu item "Registro".
            // informative message 
            Utilities.stopAll(soundList);
            document.getElementById("goToRegisterSound").play();
            // redirect
            setTimeout(function(){window.location.href = "registro.html";}, 2000);
            break;
        case 36:
            // Key: Begin
            // Action: gains focus first form field.
            // informative message 
            Utilities.stopAll(soundList);
            document.getElementById("beginFormSound").play();
            // gains focus first form field.
            setTimeout(function(){document.getElementById("username").focus();}, 3100);
            break;
        case 35:
            // Key: end
            // Action: gains focus last form field
            // informative message 
            Utilities.stopAll(soundList);
            document.getElementById("endFormSound").play();
            // gains focus last form field.
            setTimeout(function(){document.getElementById("password").focus();}, 3200);
            break;
        case 79:
            // Key: O
            // Action: click on the ONCE link
            if(!isWritingTheUser())
            {
                // is not writing the user
                // informative message
                Utilities.stopAll(soundList);
                document.getElementById("clickLinkSound").play();
                // redirect
                setTimeout(function(){window.location.href = "http://www.once.es/";}, 3000);
            }
            break;
        case 13:
            // Key: intro
            // Action: send form
            // informative message
            Utilities.stopAll(soundList);
            document.getElementById("sendFormSound").play();
            // send form
            setTimeout(function(){enterTheSystem();}, 3000);
            break;
         case 87:
            // Key: W
            // Action: reproduce the sound of the description of the web.
            if(!isWritingTheUser())
            {
                // is not writing the user
                Utilities.stopAll(soundList);
                document.getElementById("generalDescriptionSound").play();
            }
            break;
    }
    // Look if there is a field that has focus.
    if(isWritingTheUser() &&           (ASCIICode >= 65 && ASCIICode <= 90 ||
                                        ASCIICode >= 48 && ASCIICode <= 57 ||
                                        ASCIICode == 0                     ||
                                        ASCIICode == 32                    ||
                                        ASCIICode == 188                   ||
                                        ASCIICode == 190                   ||
                                        ASCIICode == 175                   ||
                                        ASCIICode == 171                   ||
                                        ASCIICode == 222                   ||
                                        ASCIICode == 60                    ||
                                        ASCIICode == 173))
    {
        // a field has focus.
        // reproduce, in the background, a sound that indicates you are typing.
        Utilities.stopAll(new Array("keySound"));
        document.getElementById("keySound").play();
    }
    // Enter a hidden "div" the time the last time a key was pressed
    var lastTime = new Date().getTime();
    $("#lastTimeAKeyWasPressed").html(lastTime);
}