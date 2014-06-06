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
            "passwordCompleteSound",
            "serverErrorSound",
            "loginErrorSound",
            "successSound",
            "timeoutSound"
    );
    enableCaptureKey();
    checkInactivity(soundList);
    addFocusEventInForm();
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
        // an message about the server error for user
        errorList.push("Error del servidor. Esto puede ser debido a que tu conexi&oacute;n de Internet haya fallado. No te has podido loguear.");
        var errorListInHTMLFormat = Utilities.createErrorListInHTMLFormat(errorList);
        $("#errorsForm").append(errorListInHTMLFormat);
        // reset fields
        resetForm();
        // for blind user
        Utilities.stopAll(soundList);
        document.getElementById("serverErrorSound").play(); 
    }
    else
    {
        // is not server error
        if(sessionArray["sessionOpened"])
        {
            // session opened
            // Users logged in successfully
            // informative message for user
            Utilities.stopAll(soundList);
            document.getElementById("successSound").play(); 
            // redirect
            switch(new Session("").obtainValue(0).getTYPE())
            {
                case "Student":
                    // is student
                    // go to student page
                    setTimeout(function(){window.location.href = "pagina_del_alumno.html";}, 5000);
                    break;
                case "Teacher":
                    // is teacher
                    // go to teacher page
                    // TODO
                    alert("eres profesor");
                    break;
                case "Webmaster":
                    // is webmaster
                    // go to webmaster page
                    // TODO
                    alert("eres webmaster");
                    break;
            }
        }
        else
        {
            // session did not open
            // show to the error message of the login 
            $("#errorsForm").children().remove();
            var errorList = new Array();
            errorList.push("Nombre de usuario y/o contrase&ntilde;a inv&aacute;lida.");
            var errorListInHTMLFormat = Utilities.createErrorListInHTMLFormat(errorList);
            $("#errorsForm").append(errorListInHTMLFormat);
            // reset login form
            resetForm();
            // for blind user
            Utilities.stopAll(soundList);
            document.getElementById("loginErrorSound").play();
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
/**
 * readField()
 * @description Procedure that is intended to run informative sounds when the user is positioned
 * in a form field.
 * @author Sergio Baena López
 * @version 1.0
 * @param {DOM object} fieldObject the field that has focus.
 */
function readField(fieldObject)
{
    var SERVER_PATH = "../php/control/invokeController.php";
    if($(fieldObject).val() == "")
    {
        // the field is empty string
        Utilities.stopAll(soundList);
        document.getElementById($(fieldObject).attr("id") + "EmptySound").play(); 
    }
    else
    {
        // the field has something
        if($(fieldObject).attr("id") == "password")
        {
            // static sound
            // password field
            Utilities.stopAll(soundList);
            document.getElementById($(fieldObject).attr("id") + "CompleteSound").play(); 
        }
        else
        {
            // dynamic sound
            // Look here, if you need to create the sound.
            if($("#last_value_" + $(fieldObject).attr("id")).html() != $(fieldObject).val()) 
            {
                // Not equals
                // create sound. Assign new value to the div (field value)
                var msg = "Campo rellenado. El nombre de usuario que has indicado es "    +
                          $(fieldObject).val()                                            +
                          ".";
                // create sound
                Utilities.convertStringToSound
                (
                        SERVER_PATH, 
                        msg, 
                        "login_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id"),
                        function(){showLoadAnimation();}, 
                        function(){hideLoadAnimation();}
                );
                soundList.addWithoutRepetition("login_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id"));      
                // Assign new value to the div (field value)
                $("#last_value_" + $(fieldObject).attr("id")).html($(fieldObject).val());
            }
            // create audio and source tags
            var audioTag = $("<audio></audio>").attr
            (
                    "id", "login_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id")
            );
            var sourceTag = $("<source />").attr(
            {
                "src":"../mp3/dynamicSounds/login_id_"        + 
                    $("#idUser").html()                       + 
                    "_field_"                                 + 
                    $(fieldObject).attr("id")                 +
                    ".mp3?state="                             +
                    new Date().getTime(),
                "type":"audio/mpeg"
            });
            audioTag.append(sourceTag);
            // remove audio tag and put audio tag in HTML document
            $("#login_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id")).remove();
            $("#soundList").append(audioTag); 
            // reproduce sound
            Utilities.stopAll(soundList);
            audioTag = audioTag[0];
            audioTag.play();
        }
    }
}
/**
 * resetForm()
 * @description Procedure is intended to reset the form.
 * @author Sergio Baena López
 * @version 1.0
 */
function resetForm()
{
    $("#username").val("");
    $("#password").val("");
}
