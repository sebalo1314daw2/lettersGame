$("document").ready(function(){atTheStartOfPage();});
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
/**
 * generateStudentMenu()
 * @description Procedure that is intended to create the dropdown horizontal menu student.
 * @author Sergio Baena López
 * @version 1.0
 */
function generateStudentMenu()
{
    var menu = $
    (
            '<ul id="studentMenu">'                                                                     +
                '<li>'                                                                                  +
                        '<a href="pagina_del_alumno.html">Inicio</a>'                                   +
                '</li>'                                                                                 +
                '<li>'                                                                                  +
                        '<a href="">Tu perfil</a>'                                                      +
                '</li>'                                                                                 +
                '<li>'                                                                                  +
                        '<a href="">Tus juegos</a>'                                                     +
                        '<ul>'                                                                          +
                            '<li>'                                                                      +
                                    '<a href="">Cuenta &nbsp;cuenta</a>'                                      +
                            '</li>'                                                                     +
                            '<li>'                                                                      +
                                    '<a href="">Encuentra encuentra</a>'                                +
                            '</li>'                                                                     +
                            '<li>'                                                                      +
                                    '<a href="introduccion_del_juego.html?id=3">Cataloga &nbsp;cataloga</a>'+
                            '</li>'                                                                     +
                            '<li>'                                                                      +
                                    '<a href="">Accent&uacute;a accent&uacute;a</a>'                    +
                            '</li>'                                                                     +
                        '</ul>'                                                                         +
                '</li>'                                                                                 +
                '<li>'                                                                                  +
                        '<a href="">Reglas</a>'                                                         +
                        '<ul>'                                                                          +
                             '<li>'                                                                     +
                                    '<a href="">Cuenta &nbsp;cuenta</a>'                                      +
                            '</li>'                                                                     +
                            '<li>'                                                                      +
                                    '<a href="">Encuentra encuentra</a>'                                +
                            '</li>'                                                                     +
                            '<li>'                                                                      +
                                    '<a href="">Cataloga &nbsp;cataloga</a>'                            +
                            '</li>'                                                                     +
                            '<li>'                                                                      +
                                    '<a href="">Accent&uacute;a accent&uacute;a</a>'                    +
                            '</li>'                                                                     +
                        '</ul>'                                                                         +
                '</li>'                                                                                 +
                '<li>'                                                                                  +
                        '<a href="javascript:void(0)" onclick="logout()">Cerrar sesi&oacute;n</a>'      +
                '</li>'                                                                                 +
            '</ul>'
    );
    $("#menuDiv").append(menu);
}
/**
 * loadTheNameOfTheActiveUser()
 * @description Procedure is intended to load the name of the active user.
 * @author Sergio Baena López
 * @version 1.0
 */
function loadTheNameOfTheActiveUser()
{
    var name = new Session("").obtainValue(0).getUser().getName();
    $(".nameActiveUser").html(name);
}
/**
 * generateAndPlayedGoToGame()
 * @description Procedure aims to generate and reproduce sound that tells the user that targets a game.
 * @author Sergio Baena López
 * @version 1.0
 * @param {Number} idGame the id of the game where the user will go
 * @param {String} path the path where we redirect the user
 */
function generateAndPlayedGoToGame(idGame, path)
{
    // look if you are already generated sound
    if($("#isGeneratedTheSound_goToGame_idGame_" + idGame).html() == "0")
    {
        // the sound is not generated --> they generate the sound
        var user = new Session("").obtainValue(0).getUser();
        var idUser = user.getId();
        var dataArray = Game.obtainFromDatabase
        (
                idGame, SERVER_PATH, function(){showLoadAnimation();}, function(){hideLoadAnimation();}
        );
        if(dataArray["isServerError"])
        {
            // is server error
            alert("Redireccionamos a la página de error del servidor");
        }
        // is not server error
        if(dataArray["deniedAccess"])
        {
            // denied access
            alert("Redireccionamos a la página de error de acceso denegado");
        }
        // is not denied access
        if(!dataArray["exists"])
        {
            // the game does not exist
            alert("Redireccionando a la pagina de error File not found 404"); // ESTO HAY QUE CAMBIARLO
        }
        // all correct 
        var game = dataArray["game"]; // game object
        var msg = "Vamos al juego de " + game.getName();
        Encoder.EncodeType = "entity";
        msg = Encoder.htmlDecode(msg);
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "authenticatedPages_id_" + idUser + "_goToGame_idGame_" + idGame,
                function(){showLoadAnimation();}, 
                function(){hideLoadAnimation();}
        );
        soundList.addWithoutRepetition("goToGame" + idGame + "Sound");    
        var audioTag = $("<audio></audio>").attr
        (
                "id", "goToGame" + idGame + "Sound"
        );
        var sourceTag = $("<source />").attr(
        {
            "src":"../mp3/dynamicSounds/authenticatedPages_id_" + idUser + "_goToGame_idGame_" + 
                        idGame + ".mp3?state=" + new Date().getTime(),
            "type":"audio/mpeg"
        });
        audioTag.append(sourceTag);
        // put audio tag in HTML document
        $("#soundList").append(audioTag); 
        // indicated that it is already generated sound.
        $("#isGeneratedTheSound_goToGame_idGame_" + idGame).html("1");
    }
    // play sound
    var duration;
    var sound = document.getElementById("goToGame" + idGame + "Sound");
    sound.load();
    sound.addEventListener("durationchange", function()
    {
        duration = sound.duration;
        Utilities.stopAll(soundList);
        sound.play();
        // redirect
        setTimeout(function(){window.location.href = path;}, duration * 1000); 
    }, false);
}
/**
 * logout()
 * @description Procedure aims log off user and redirect to the "home" page. Previously, the data 
 * stored in the session (rankings) will be saved.
 * @author Sergio Baena López
 * @version 1.0
 */
function logout()
{
    var session = new Session(SERVER_PATH);
    if(session.isOpen())
    {
        // the session is open --> we can close to the session
        // save changes 
//        saveChanges();
        // close session
        session.close();
    }
    // redirect to home page
    window.location.href = "home.html";
}