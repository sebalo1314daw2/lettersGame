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
}