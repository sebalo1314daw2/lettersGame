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
fillTable();
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
    var dataArray = Game.obtain
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
    $("#punctuationAtTheSecondAttempt").html(currentGame.getPunctuationAtTheSecondAttempt());
    // store the game
    // TODO
    
    
    
    
    
    
    
    
    
}