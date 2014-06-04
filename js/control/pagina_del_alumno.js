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
    loadTheNameOfTheActiveUser();
    enableCaptureKey();
    checkInactivity(soundList);
    generateAndPlayedGeneralDescriptionSound();
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
            // TODO
            break;
        case 52:
            // Key: 4
            // Action: go to game "Accentúa accentúa"
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
            Utilities.stopAll(soundList);
            document.getElementById("generalDescriptionSound").play();
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
        var name = user.getName();
        var idUser = user.getId();
        var msg = "¿Qué haríamos sin las letras?\n\n"                                                   +
                  "¡Bienvenido " + name + "!\n\n"                                                       +     
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
                  "Si quieres clicar en el enlace de la ONCE, pulsa O.\n\n"                             +
                  "Y si quieres que se vuelva a repetir todo lo que acabamos de decir, pulsa W.";
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "studentPage_id_" + idUser + "_generalDescription",
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
            "src":"../mp3/dynamicSounds/studentPage_id_"  + 
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
        var name = user.getName();
        var idUser = user.getId();
        var msg = "Hola " + name + ", bienvenido a tu página. Desde ahora mismo, ya puedes jugar a " +
                  "todos los juegos que quieras y ¡a empezar a ganar puntos! ¡Haber cuántos puntos " +
                  "eres capaz de conseguir!\n\n"                                                     +
                  "Para jugar a un juego, simplemente teclea 1 para el juego de cuenta cuenta,\n\n"  +
                  "2 para el juego de encuentra encuentra,\n\n"                                      +
                  "3 para el juego de cataloga cataloga y por último\n\n"                            +
                  "4 para el juego de accentúa accentúa.";
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "studentPage_id_" + idUser + "_bodyContent",
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
            "src":"../mp3/dynamicSounds/studentPage_id_"  + 
                idUser                                    + 
                "_bodyContent.mp3?state="          +
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