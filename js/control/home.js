$("window").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    enableCaptureKey();
}
/**
 * keyHandler()
 */
function keyHandler(ASCIICode)
{
//    alert(ASCIICode);
    var soundList = new Array
    (
            "generalDescriptionSound",
            "goToRegisterSound",
            "bodyIntroductionSound", 
            "quickReadSound", 
            "slowReadSound"
    );
    switch(ASCIICode)
    {
        case 39:
            // Key: Arrow going to the right.
            // Action: click on the menu item "Registro".
            // informative message
            Utilities.stopAll(soundList);
            document.getElementById("goToRegisterSound").play();
            // redirect
            setTimeout(function(){window.location.href = "registro.html";}, 2000);
            break;
        case 67:
            // Key: C
            // Action: access to the body of the web
            Utilities.stopAll(soundList);
            document.getElementById("bodyIntroductionSound").play();
            break;
        case 82:
            // Key: R
            // Action: do quick read of the body of the web
            Utilities.stopAll(soundList);
            document.getElementById("quickReadSound").play();
            break;
        case 76:
            // Key: L
            // Action: do slow read of the body of the web
            Utilities.stopAll(soundList);
            document.getElementById("slowReadSound").play();
            break;
    }
}

