/**
 * atTheStartOfPage()
 * @description Procedure which aims to call certain functions when the page loads for its proper 
 * functioning of it.
 * @author Sergio Baena López
 * @version 1.0
 */
function atTheStartOfPage()
{
    if(!new Session("").isOpen())
    {
        // is not open the user session
        alert("Acceso denegado"); // ESTO HAY QUE CAMBIARLO
    }
    soundList = new Array
    (
            "clickLinkSound",
            "timeoutSound"
    );
    SERVER_PATH = "../php/control/invokeController.php";
    generateStudentMenu();
    fillTable();
    enableCaptureKey();
    checkInactivity(soundList);
    generateAndPlayedGeneralDescriptionSound();
}
/**
 * fillTable()
 * @description Procedure that aims to fill the table with the game data, indicated in the URL.
 * @author Sergio Baena López
 * @version 1.0
 */
function fillTable()
{
    var arrayGET = Utilities.readGET();
    // look if the name parameter is valid.
    var paramId = arrayGET[0].split("="); // array with two item (name and value of the parameter)
    var nameParam = paramId[0];
    var valueParam = paramId[1];
    if(nameParam != "id")
    {
        // incorrect name of the parameter
        alert("Redireccionando a la pagina de error File not found 404"); // ESTO HAY QUE CAMBIARLO
    }
    // correct name of the parameter
    // Now look if the value is a number
    if(!ValidationUtilities.isPositiveInteger(valueParam))
    {
        // is not positive integer the value of the parameter --> is invalid value
        alert("Redireccionando a la pagina de error File not found 404"); // ESTO HAY QUE CAMBIARLO
    }
    // all valid --> go to the server
    // obtain the indicated game
    var dataArray = Game.obtainFromDatabase
    (
            parseInt(valueParam), 
            SERVER_PATH,
            function(){showLoadAnimation();},
            function(){hideLoadAnimation();}
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
    var currentGame = dataArray["game"]; // game object
    // fill the table
    $("#name").html(currentGame.getName());
    $("#shortDescription").html(currentGame.getShortDescription());
    $("#punctuationAtTheFirstAttempt").html(currentGame.getPunctuationAtTheFirstAttempts());
    var puntuactionSecondAttempt = currentGame.getPunctuationAtTheSecondAttempt();
    if(puntuactionSecondAttempt == null)
    {
        puntuactionSecondAttempt = "Ninguna";
    }
    $("#punctuationAtTheSecondAttempt").html(puntuactionSecondAttempt);
    // store the game
    currentGame.store();
}
/**
 * generateAndPlayedGeneralDescriptionSound()
 * @description Procedure that is intended to create and played the sound of the general description of
 * page. Only generated once.
 * @author Sergio Baena López
 * @version 1.0
 */
function generateAndPlayedGeneralDescriptionSound() 
{
    // look if you are already generated sound
    if($("#isGeneratedTheSound_generalDescription").html() == "0")
    {
        // the sound is not generated --> they generate the sound
        var user = new Session("").obtainValue(0).getUser();
        var idUser = user.getId();
        var game = Game.obtainFromCookie(); // game object
        var msg = "¿Qué haríamos sin las letras?\n\n"                                                   +
                  "Introducción de " + game.getName() + "\n\n"                                                       +     
                  "Esta web tiene un menú, con las opciones de ir a la página de inicio, "              +
                  "a tu perfil, a tus juegos y a las reglas de tus juegos, un cuerpo que te "           +
                  "explica de que va la web y un enlace para acceder a la ONCE.\n\n"                    +
                  "¿Qué quieres hacer?\n\n"                                                             +
                  "Si quieres utilizar el menú utiliza las teclas de derecha e izquierda.\n\n"          +
                  "Si quieres saber de que va la web teclea C.\n\n"                                     +
                  "Si quieres jugar al juego de cuenta cuenta pulsa 1.\n\n"                             +
                  "Si quieres jugar al juego de encuentra encuentra pulsa 2.\n\n"                       +
                  "Si quieres jugar al juego de cataloga cataloga pulsa 3.\n\n"                         +
                  "Si quieres jugar al juego de accentúa accentúa pulsa 4.\n\n"                         +
                  "Si quieres jugar ahora pulsa J.\n\n"                                                 +
                  "Si quieres ver las reglas de este juego pulsa R.\n\n"                                +
                  "Si quieres clicar en el enlace de la ONCE, pulsa O.\n\n"                             +
                  "Y si quieres que se vuelva a repetir todo lo que acabamos de decir, pulsa W.";
        Encoder.EncodeType = "entity";
        msg = Encoder.htmlDecode(msg);
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "gameIntroduction_id_" + idUser + "_generalDescription",
                function(){showLoadAnimation();}, 
                function(){hideLoadAnimation();}
        );
        soundList.addWithoutRepetition("generalDescriptionSound");      
        var audioTag = $("<audio></audio>").attr
        (
                "id", "generalDescriptionSound"
        );
        var sourceTag = $("<source />").attr(
        {
            "src":"../mp3/dynamicSounds/gameIntroduction_id_"  + 
                idUser                                    + 
                "_generalDescription.mp3?state="          +
                new Date().getTime(),
            "type":"audio/mpeg"
        });
        audioTag.append(sourceTag);
        // put audio tag in HTML document
        $("#soundList").append(audioTag); 
        // indicated that it is already generated sound.
        $("#isGeneratedTheSound_generalDescription").html("1");
    }
    // play sound
    Utilities.stopAll(soundList);
    document.getElementById("generalDescriptionSound").play();
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
    switch(ASCIICode)
    {
        case 39:
            // Key: -->
            // Action: click on the menu item "Reglas".
            // TODO
            break;
        case 37:
            // Key: <--
            // Action: click on the menu item "Tu perfil".
            // TODO
            break;
        case 67:
            // Key: C 
            // Action: access to the body of the web 
            generateAndPlayedBodyContent();
            break;
        case 49:
            // Key: 1
            // Action: go to game "Cuenta cuenta"
            // TODO
            break;
        case 50:
            // Key: 2
            // Action: go to game "Encuentra encuentra"
            // TODO
            break;
        case 51:
            // Key: 3
            // Action: go to game "Cataloga cataloga" 
            // informative message
            generateAndPlayedGoToGame(3, "introduccion_del_juego.html?id=3");
            break;
        case 52:
            // Key: 4
            // Action: go to game "Accentúa accentúa"
            // TODO
            break;
        case 74:
            // Key: J
            // Action: "game now" button
            // informative message
            var game = Game.obtainFromCookie();
            generateAndPlayedGoToGame(game.getId(), "juego_cataloga_cataloga.html");
            break;
        case 82:
            // Key: R
            // Action: "rules" button
            // TODO
            break;
        case 79:
            // Key: O
            // Action: click on the ONCE link
            // informative message
            Utilities.stopAll(soundList);
            document.getElementById("clickLinkSound").play();
            // redirect
            setTimeout(function(){window.location.href = "http://www.once.es/";}, 3000);
            break;
        case 87:
            // Key: W
            // Action: reproduce the sound of the description of the web.
            generateAndPlayedGeneralDescriptionSound();
            break;
    }
    // Enter a hidden "div" the time the last time a key was pressed
    var lastTime = new Date().getTime();
    $("#lastTimeAKeyWasPressed").html(lastTime);
}
/**
 * generateAndPlayedBodyContent()
 * @description Procedure that is intended to create and played the sound of the body content of
 * page. Only generated once.
 * @author Sergio Baena López
 * @version 1.0
 */
function generateAndPlayedBodyContent()
{
    // look if you are already generated sound
    if($("#isGeneratedTheSound_bodyContent").html() == "0")
    {
        // the sound is not generated --> they generate the sound
        var user = new Session("").obtainValue(0).getUser();
        var idUser = user.getId();
        var game = Game.obtainFromCookie();
        var ptsSecondAttempt = game.getPunctuationAtTheSecondAttempt();
        if(ptsSecondAttempt == null)
        {
            ptsSecondAttempt = "Ninguna.";
        }
        var msg = "A continuación, se describirá el juego que estás a punto de jugar, "                 +
                  "el cual es " + game.getName() + ".\n\n"                                              +
                  "Descripción del juego: " + game.getShortDescription() + "\n\n"                       +
                  "Puntuación en el primer intento: " + game.getPunctuationAtTheFirstAttempts() + "\n\n"+
                  "Puntuación en el segundo intento: " + ptsSecondAttempt + "\n\n"                      +
                  "¿Quieres jugar ahora mismo? Pues pulsa J.\n\n"                                       +
                  "¿O quieres ver las reglas de " + game.getName() + "? En este caso, pulsa R.";
        Encoder.EncodeType = "entity";
        msg = Encoder.htmlDecode(msg);
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "gameIntroduction_id_" + idUser + "_bodyContent",
                function(){showLoadAnimation();}, 
                function(){hideLoadAnimation();}
        );
        soundList.addWithoutRepetition("bodyContentSound");      
        var audioTag = $("<audio></audio>").attr
        (
                "id", "bodyContentSound"
        );
        var sourceTag = $("<source />").attr(
        {
            "src":"../mp3/dynamicSounds/gameIntroduction_id_"  + 
                idUser                                         + 
                "_bodyContent.mp3?state="                      +
                new Date().getTime(),
            "type":"audio/mpeg"
        });
        audioTag.append(sourceTag);
        // put audio tag in HTML document
        $("#soundList").append(audioTag); 
        // indicated that it is already generated sound.
        $("#isGeneratedTheSound_bodyContent").html("1");
    }
    // play sound
    Utilities.stopAll(soundList);
    document.getElementById("bodyContentSound").play();
}
/**
 * goToGame()
 * @description Procedure is intended to direct the user to the game stored in the cookie.
 * @author Sergio Baena López
 * @version 1.0
 */
function goToGame()
{
    var idGame = Game.obtainFromCookie().getId();
    switch(idGame)
    {
        case 3:
            // Cataloga cataloga game
            window.location.href = "juego_cataloga_cataloga.html";
            break;
    }
}