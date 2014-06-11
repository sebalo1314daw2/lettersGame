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
    fillSubtitle();
    fillTable();
//    enableCaptureKey();
//    checkInactivity(soundList);
//    generateAndPlayedGeneralDescriptionSound();
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