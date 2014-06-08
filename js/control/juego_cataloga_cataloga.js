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
//    soundList = new Array
//    (
//            "clickLinkSound",
//            "timeoutSound"
//    );
    SERVER_PATH = "../php/control/invokeController.php";
    generateStudentMenu();
//    loadTheNameOfTheActiveUser();
//    enableCaptureKey();
//    checkInactivity(soundList);
//    generateAndPlayedGeneralDescriptionSound();
    prepareGame();
    play();
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
        alert("changeWord()");
        // TODO
        // llamar a changeWord()
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
            // change the hidden data necessary for the page to initialize the second attempt.
            // change #numAttempt
            $("#numAttempt").html("1");
            // change #stopTime
            $("#stopTime").html("0");
            // changes made
            // play the second attempt
            play();
        }
    }
}