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
        window.location.href = "permiso_denegado.html";
    }
    $(window).bind("beforeunload", function(){saveChanges();});
    soundList = new Array
    (
            "closeSessionSound",
            "clickLinkSound",
            "timeoutSound"
    );
    SERVER_PATH = "../php/control/invokeController.php";
    generateStudentMenu();
    fillSubtitle();
    fillTable();
    enableCaptureKey();
    checkInactivity(soundList);
    generateAndPlayedGeneralDescriptionSound();
}
/**
 * fillTable()
 * @description Procedure that aims to fill the table with the ranking data.
 * @author Sergio Baena López
 * @version 1.0
 */
function fillTable()
{
    // obtaining the necessary data.
    // get the ranking of that heading
    var rankingOfThatHeading = Ranking.obtainFromCookie();
    // get the general ranking
    // the index of the cookie (Session object) corresponds to the "id" ranking.
    var idRanking = rankingOfThatHeading.getId();
    var generalRanking = new Session("").obtainValue(idRanking);
    // all data
    // fill the table
    // first row (last heading)
    $("#lastPoints").html(rankingOfThatHeading.getPoints());
    $("#lastNumberOfHits").html(rankingOfThatHeading.getNumberOfHits());
    $("#lastNumberOfFailures").html(rankingOfThatHeading.getNumberOfFailures());
    $("#lastNumberOfAttempts").html(rankingOfThatHeading.getNumberOfAttempts());
    // second row (general ranking)
    $("#points").html(generalRanking.getPoints());
    $("#numberOfHits").html(generalRanking.getNumberOfHits());
    $("#numberOfFailures").html(generalRanking.getNumberOfFailures());
    $("#numberOfAttempts").html(generalRanking.getNumberOfAttempts());
    // filled table
}
/**
 * fillSubtitle()
 * @description Procedure that aims to fill the subtitle with the name of the game.
 * @author Sergio Baena López
 * @version 1.0
 */
function fillSubtitle()
{
    var currentGame = Game.obtainFromCookie();
    $("#nameGame").html(currentGame.getName());
}
/**
 * redirectToGameIntroduction()
 * @description Procedure that aims to redirect the user to the introduction page of this game.
 * @author Sergio Baena López
 * @version 1.0
 */
function redirectToGameIntroduction()
{
    var currentGame = Game.obtainFromCookie();
    window.location.href = "introduccion_del_juego.html?id=" + currentGame.getId();
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
        case 27:
            // Key: Esc
            // Action: close session
            // informative message
            Utilities.stopAll(soundList);
            document.getElementById("closeSessionSound").play();
            // close session
            setTimeout(function(){logout();}, 2000);
            break;
        case 74:
            // Key: J
            // Action: "game now" button
            // informative message
            var game = Game.obtainFromCookie();
            generateAndPlayedGoToGame(game.getId(), "introduccion_del_juego.html?id=" + game.getId());
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
                  "Fin del juego " + game.getName() + "\n\n"                                            +     
                  "Esta web tiene un menú, con las opciones de ir a la página de inicio, "              +
                  "a tu perfil, a tus juegos, a las reglas de tus juegos y para cerrar sesión, "        +
                  "un cuerpo que te "                                                                   +       
                  "explica de que va la web y un enlace para acceder a la ONCE.\n\n"                    +
                  "¿Qué quieres hacer?\n\n"                                                             +
                  "Si quieres utilizar el menú utiliza las teclas de derecha e izquierda.\n\n"          +
                  "Si quieres saber de que va la web teclea C.\n\n"                                     +
                  "Si quieres jugar al juego de cuenta cuenta pulsa 1.\n\n"                             +
                  "Si quieres jugar al juego de encuentra encuentra pulsa 2.\n\n"                       +
                  "Si quieres jugar al juego de cataloga cataloga pulsa 3.\n\n"                         +
                  "Si quieres jugar al juego de accentúa accentúa pulsa 4.\n\n"                         +
                  "Si quieres cerrar la sesión pulsa la tecla de escape.\n\n"                           +
                  "Si quieres jugar otra vez pulsa J.\n\n"                                              +
                  "Si quieres clicar en el enlace de la ONCE, pulsa O.\n\n"                             +
                  "Y si quieres que se vuelva a repetir todo lo que acabamos de decir, pulsa W.";
        Encoder.EncodeType = "entity";
        msg = Encoder.htmlDecode(msg);
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "endGame_id_" + idUser + "_generalDescription",
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
            "src":"../mp3/dynamicSounds/endGame_id_"  + 
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
        // obtaining the necessary data.
        // get the ranking of that heading
        var rankingOfThatHeading = Ranking.obtainFromCookie();
        // get the general ranking
        // the index of the cookie (Session object) corresponds to the "id" ranking.
        var idRanking = rankingOfThatHeading.getId();
        var generalRanking = new Session("").obtainValue(idRanking);
        // all data
        var msg = "Las estadísticas de la partida que acabas de hacer son las siguientes:\n\n"      +
                  rankingOfThatHeading.getPoints() + "puntos.\n\n"                                  +
                  rankingOfThatHeading.getNumberOfHits() + "aciertos.\n\n"                          +
                  rankingOfThatHeading.getNumberOfFailures() + "fallos.\n\n"                        +
                  rankingOfThatHeading.getNumberOfAttempts() + "intentos.\n\n"                      +
                  "Y a continuación, las estadísticas de todas las partidas con este juego:\n\n"    +
                  generalRanking.getPoints() + "puntos.\n\n"                                        +
                  generalRanking.getNumberOfHits() + "aciertos.\n\n"                                +
                  generalRanking.getNumberOfFailures() + "fallos.\n\n"                              +
                  generalRanking.getNumberOfAttempts() + "intentos.\n\n";
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "endGame_id_" + idUser + "_bodyContent",
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
            "src":"../mp3/dynamicSounds/endGame_id_"  + 
                idUser                                + 
                "_bodyContent.mp3?state="             +
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