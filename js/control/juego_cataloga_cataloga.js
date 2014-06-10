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
            "startGameSound",
            "acuteOptionSound",
            "plainOptionSound",
            "antepenultimeOptionSound",
            "clickLinkSound",
            "timeoutSound"
    );
    SERVER_PATH = "../php/control/invokeController.php";
    generateStudentMenu();
    enableCaptureKey();
    checkInactivity(soundList);
    prepareGame();
    play();
    generateAndPlayedGeneralDescriptionSound();
}
/**
 * prepareGame()
 * @description Procedure aims at preparing the game "cataloga cataloga". What we do is get all the
 * information needed to play and save them locally.
 * @author Sergio Baena López
 * @version 1.0 
 */
function prepareGame()
{
    // the game needs three objects --> Ranking, Game and Word
    // Ranking and Game objects already stored in cookies.
    // Only lack Word objects
    var numOfWords = Game.obtainFromCookie().getNumOfWords();
    var dataArray = Word.obtainRandomlyFromDatabase
    (
            numOfWords, SERVER_PATH, function(){showLoadAnimation();}, function(){hideLoadAnimation();}
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
    // all correct
    // get the word list
    var wordList = dataArray["wordList"];
    // store the wordList
    wordList.store();
    // the game is prepared
}
/**
 * initializePage()
 * @description Procedure that aims to initialize the page.
 * @author Sergio Baena López
 * @version 1.0 
 */
function initializePage()
{
    var currentGame = Game.obtainFromCookie(); // game object
    // fill subtitle
    $("#nameGame").html(currentGame.getName());
    // fill time span
    var numAttempt = $("#numAttempt").html();
    if(numAttempt == "0")
    {
        // first attempt
        $("#timeGame").html(currentGame.getTimeOfFirstAttempt());
    }
    else
    {
        // second attempt
        $("#timeGame").html(currentGame.getTimeOfSecondAttempt());
    }
    // fill the valueWord 
    var indexOfTheWord = parseInt($("#currentIndexOfTheWord").html());
    var valueWord = Word.obtainFromCookie(indexOfTheWord).getValue();
    $("#valueWord").html(valueWord);
    // create initial ranking
    if($("#rankingOfThatHeading").html() == "")
    {
        // we create its
        var rankingOfTheSession = new Session("").obtainValue(3);
        var initialRanking = new Ranking
        (
                rankingOfTheSession.getId(),
                rankingOfTheSession.getUser(),
                rankingOfTheSession.getGame(),
                0,
                0, 
                0,
                0
        ); 
        initialRanking.storeInDocument($("#rankingOfThatHeading"));
    }
}
/**
 * play()
 * @description Procedure is to allow the user to play.
 * @author Sergio Baena López
 * @version 1.0 
 */
function play()
{
    initializePage();
    updateTime();
}
/**
 * updateTime()
 * @description Procedure is intended to update the time remaining to the user to respond.
 * @author Sergio Baena López
 * @version 1.0 
 */
function updateTime()
{
    setTimeout(function()
    {
        // look at whether to stop time.
        var stopTime = $("#stopTime").html();
        if(stopTime == "0")
        {
            // there's no stopping time.
            // decrement a second.
            var oldTime = parseInt($("#timeGame").html());
            var newTime = oldTime - 1;
            // put in document
            $("#timeGame").html(newTime);
            // look if we come to zero.
            if(newTime == 0) 
            {
                checkResponse("nothing");
            }
            else
            {
                // you can still decrease more.
                updateTime();
            }
        }
    }, 1000);
}
/**
 * checkResponse()
 * @description Procedure that aims to check whether the user's response is correct or not.
 * @author Sergio Baena López
 * @version 1.0 
 * @param {String} response the user response
 */
function checkResponse(response)
{
    var rankingOfThatHeading = Ranking.obtainFromDocument($("#rankingOfThatHeading"));
    var currentIndexOfTheWord = parseInt($("#currentIndexOfTheWord").html());
    var correctResponse = Word.obtainFromCookie(currentIndexOfTheWord).getCategory();
    var attempt = $("#numAttempt").html(); // string
    // stop time
    $("#stopTime").html("1");
    if(response == correctResponse)
    {
        // the user hits the response.
        // get the puntuaction
        var puntuaction;
        if(attempt == "0")
        {
            // first attempt
            puntuaction = Game.obtainFromCookie().getPunctuationAtTheFirstAttempts();
        }
        else
        {
            // second attempt
            puntuaction = Game.obtainFromCookie().getPunctuationAtTheSecondAttempt();
        }
        // puntuaction got
        // update ranking of that heading
        // sum punctuation.
        rankingOfThatHeading.setPoints
        (
                rankingOfThatHeading.getPoints() + puntuaction
        );
        // sum number of hits
        rankingOfThatHeading.setNumberOfHits
        (
                rankingOfThatHeading.getNumberOfHits() + 1
        );
        // sum number of attempts
        rankingOfThatHeading.setNumberOfAttempts
        (
                rankingOfThatHeading.getNumberOfAttempts() + 1
        );
        // store the ranking of that heading
        rankingOfThatHeading.storeInDocument($("#rankingOfThatHeading"));
        // updated ranking
        // change word
        disableRadioButtons();
        $("#disableKeys").html("1");
        setTimeout(function()
        {
            $("#disableKeys").html("0");
            enableRadioButtons();
            changeWord();
        }, 2000);       
    }
    else
    {
        // the user fails the response
        // sum number of failures
        rankingOfThatHeading.setNumberOfFailures
        (
                rankingOfThatHeading.getNumberOfFailures() + 1 
        );
        // sum number of attempts
        rankingOfThatHeading.setNumberOfAttempts
        (
                rankingOfThatHeading.getNumberOfAttempts() + 1
        );
        // store the ranking of that heading
        rankingOfThatHeading.storeInDocument($("#rankingOfThatHeading"));
        // updated ranking
        // look if the attempt is the first 
        if(attempt == "0")
        {
            // the attempt is the first
            // change the data necessary for the page to initialize the second attempt.
            // change #numAttempt
            $("#numAttempt").html("1");
            // change #stopTime
            disableRadioButtons();
            $("#disableKeys").html("1");
            setTimeout(function()
            {
                $("#disableKeys").html("0");
                enableRadioButtons();
                $("#stopTime").html("0");
                // changes made
                // play the second attempt
                play();
            }, 2000);
        }
        else
        {
            // the attempt is the second
            // change word
            disableRadioButtons();
            $("#disableKeys").html("1");
            setTimeout(function()
            {
                $("#disableKeys").html("0");
                enableRadioButtons();
                changeWord();
            }, 2000);       
        }
    }
}
/**
 * changeWord()
 * @description Procedure that aims to change word. This procedure previously look whether to
 * change the word or already reached the end of the game.
 * @author Sergio Baena López
 * @version 1.0 
 */
 function changeWord()
 {
    // look if we can change the word.
    var currentIndexOfTheWord = parseInt($("#currentIndexOfTheWord").html());
    var numOfWords = Game.obtainFromCookie().getNumOfWords();
    if(currentIndexOfTheWord == numOfWords - 1)
    {
        // end game
        alert("Fin del juego");
    }
    else
    {
        // change word
        // change the data necessary for start with a new word
        $("#numAttempt").html("0");
        $("#currentIndexOfTheWord").html(currentIndexOfTheWord + 1);
        $("#stopTime").html("0");
        // change done
        // reset radio buttons
        resetRadioButtons();
        play();
    }
 }
 /**
  * resetRadioButtons()
  * @description Procedure is intended to reset the "radio buttons".
  * @author Sergio Baena López
  * @version 1.0 
  */
 function resetRadioButtons()
 {
     $("input:radio:checked").attr("checked", false);
 }
 /**
  * disableRadioButtons()
  * @description Procedure aims disable "radio buttons".
  * @author Sergio Baena López
  * @version 1.0
  */
 function disableRadioButtons()
 {
     $("input:radio").attr("disabled", true);
 }
 /**
  * enableRadioButtons()
  * @description Procedure aims enable "radio buttons".
  * @author Sergio Baena López
  * @version 1.0
  */
 function enableRadioButtons()
 {
     $("input:radio").attr("disabled", false);
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
            if($("#disableKeys").html() == "0")
            {
                // informative message
                pauseGame();
                generateAndPlayedGoToGame(3, "introduccion_del_juego.html?id=3");
            }
            break;
        case 52:
            // Key: 4
            // Action: go to game "Accentúa accentúa"
            // TODO
            break;
        case 74:
            // Key: J
            // Action: start or continue the game
            if($("#stopTime").html() == "1" && $("#disableKeys").html() == "0")
            {
                // informative message
                Utilities.stopAll(soundList);
                document.getElementById("startGameSound").play();
                setTimeout(function()
                {
                    continueGame();
                    generateAndPlayedCurrentWord();
                }, 5000);
            }
            break;
        case 65:
            // Key: A
            // Action: the user selects the option "Aguda".
            if($("#stopTime").html() == "0" && $("#disableKeys").html() == "0")
            {
                pauseGame();
                $("#disableKeys").html("1");
                // informative message
                Utilities.stopAll(soundList);
                document.getElementById("acuteOptionSound").play();
                setTimeout(function()
                {
                    // check the "Aguda" option.
                    $("input:radio[value='aguda']").attr("checked", true);
                    checkResponse("aguda");
                }, 3000);
            }
            break;
        case 76:
            // Key: L
            // Action: the user selects the option "Llana".
            if($("#stopTime").html() == "0" && $("#disableKeys").html() == "0")
            {
                pauseGame();
                $("#disableKeys").html("1");
                // informative message
                Utilities.stopAll(soundList);
                document.getElementById("plainOptionSound").play();
                setTimeout(function()
                {
                    // check the "Llana" option.
                    $("input:radio[value='llana']").attr("checked", true);
                    checkResponse("llana");
                }, 3000);
            }
            break;
        case 69:
            // Key: E
            // Action: the user selects the option "Esdrujola".
            if($("#stopTime").html() == "0" && $("#disableKeys").html() == "0")
            {
                pauseGame();
                $("#disableKeys").html("1");
                // informative message
                Utilities.stopAll(soundList);
                document.getElementById("antepenultimeOptionSound").play();
                setTimeout(function()
                {
                    // check the "Esdrujula" option.
                    $("input:radio[value='esdr&uacute;jula']").attr("checked", true);
                    checkResponse("esdr&uacute;jula");
                }, 3000);
            }
            break;
        case 82:
            // Key: R
            // Action: again repeat the current word.
            if($("#stopTime").html() == "0" && $("#disableKeys").html() == "0")
            {
                generateAndPlayedCurrentWord();
            }
            break;
        case 79:
            // Key: O
            // Action: click on the ONCE link
            if($("#disableKeys").html() == "0")
            {
                // informative message
                pauseGame();
                Utilities.stopAll(soundList);
                document.getElementById("clickLinkSound").play();
                // redirect
                setTimeout(function(){window.location.href = "http://www.once.es/";}, 3000);
            }
            break;
        case 87:
            // Key: W
            // Action: reproduce the sound of the description of the web.
            if($("#disableKeys").html() == "0")
            {
                 generateAndPlayedGeneralDescriptionSound();
            }
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
    // pause game
    pauseGame();
    // look if you are already generated sound
    if($("#isGeneratedTheSound_generalDescription").html() == "0")
    {
        // the sound is not generated --> they generate the sound
        var user = new Session("").obtainValue(0).getUser();
        var idUser = user.getId();
        var game = Game.obtainFromCookie();
        var msg = "¿Qué haríamos sin las letras?\n\n"                                                   +
                  "Juego de " + game.getName() + "\n\n"                                                 +     
                  "Esta web tiene un menú, con las opciones de ir a la página de inicio, "              +
                  "a tu perfil, a tus juegos y a las reglas de tus juegos, una palabra a catalogar "    +
                  "y un enlace para acceder a la ONCE.\n\n"                                             +
                  "¿Qué quieres hacer?\n\n"                                                             +
                  "Si quieres utilizar el menú utiliza las teclas de derecha e izquierda.\n\n"          +
                  "Si quieres comenzar o continuar con el juego pulsa J.\n\n"                           +
                  "Cuando estés jugando, pulsa A se crees que es aguda.\n\n"                            +
                  "L si crees que es llana.\n\n"                                                        +
                  "O, si se trata de una esdrújola,teclea E.\n\n"                                       +
                  "Para repetir la palabra, pulsa R.\n\n"                                               +                                                         
                  "Si quieres jugar al juego de cuenta cuenta pulsa 1.\n\n"                             +
                  "Si quieres jugar al juego de encuentra encuentra pulsa 2.\n\n"                       +
                  "Si quieres jugar al juego de cataloga cataloga pulsa 3.\n\n"                         +
                  "Si quieres jugar al juego de accentúa accentúa pulsa 4.\n\n"                         +
                  "Si quieres clicar en el enlace de la ONCE, pulsa O.\n\n"                             +
                  "Y si quieres que se vuelva a repetir todo lo que acabamos de decir, pulsa W.";
        Encoder.EncodeType = "entity";
        msg = Encoder.htmlDecode(msg);
        // create sound
        Utilities.convertStringToSound
        (
                SERVER_PATH, 
                msg, 
                "cataloga_cataloga_id_" + idUser + "_generalDescription",
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
            "src":"../mp3/dynamicSounds/cataloga_cataloga_id_"  + 
                idUser                                          + 
                "_generalDescription.mp3?state="                +
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
 * pauseGame()
 * @description Procedure aims pause the game. Pause means disable "radio buttons" and put a "1"
 * to "stopTime".
 * @author Sergio Baena López
 * @version 1.0
 */
function pauseGame()
{
    disableRadioButtons();
    $("#stopTime").html("1");
}
/**
 * continueGame()
 * @description Procedure aims continue the game. Continue means enable "radio buttons" and put a "0"
 * to "stopTime".
 * @author Sergio Baena López
 * @version 1.0
 */
function continueGame()
{
    enableRadioButtons();
    $("#stopTime").html("0");
    updateTime();
}
/**
 * generateAndPlayedCurrentWord()
 * @description Procedure that is intended to create and played the sound of the current word of
 * page.
 * @author Sergio Baena López
 * @version 1.0
 */
function generateAndPlayedCurrentWord()
{
    // they generate the sound
    var user = new Session("").obtainValue(0).getUser();
    var idUser = user.getId();
    var currentIndexOfTheWord = parseInt($("#currentIndexOfTheWord").html());
    var currentWord = Word.obtainFromCookie(currentIndexOfTheWord); // word object
    var valueWord = currentWord.getValue();
    var msg = valueWord;
    Encoder.EncodeType = "entity";
    msg = Encoder.htmlDecode(msg);
    // create sound
    Utilities.convertStringToSound
    (
            SERVER_PATH, 
            msg, 
            "cataloga_cataloga_id_" + idUser + "_currentWord",
            function(){showLoadAnimation();}, 
            function(){hideLoadAnimation();}
    );
    soundList.addWithoutRepetition("currentWordSound");      
    var audioTag = $("<audio></audio>").attr
    (
            "id", "currentWordSound"
    );
    var sourceTag = $("<source />").attr(
    {
        "src":"../mp3/dynamicSounds/cataloga_cataloga_id_"  + 
            idUser                                          + 
            "_currentWord.mp3?state="                       +
            new Date().getTime(),
        "type":"audio/mpeg"
    });
    audioTag.append(sourceTag);
    // remove and put audio tag in HTML document
    $("#currentWordSound").remove();
    $("#soundList").append(audioTag); 
    // play sound
    Utilities.stopAll(soundList);
    document.getElementById("currentWordSound").play();
}