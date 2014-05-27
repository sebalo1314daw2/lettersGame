$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    soundList = new Array
    (
//            "generalDescriptionSound",
//            "goToHomeSound",
            "beginFormSound",
            "endFormSound",
            "clickLinkSound",
            "sendFormSound",
            "usernameEmptySound",
            "passwordEmptySound",
            "timeoutSound"
    );
    enableCaptureKey();
    checkInactivity(soundList);
    addFocusEventInForm();
    $("#idUser").html(new Date().getTime());
}
