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
 * fillPage()
 * @description Procedure that aims to fill the page.
 * @author Sergio Baena López
 * @version 1.0 
 */
function fillPage()
{
    // fill subtitle
    
    
    
    
    
}