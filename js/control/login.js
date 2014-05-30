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
//    enableCaptureKey();
    checkInactivity(soundList);
    addFocusEventInForm();
    $("#idUser").html(new Date().getTime());
    // TESTEO DE LA ACCION DE LOGUEO
    var user = new User("pepe1", "pepe1", "", "", "");
    user.encryptedPassword();
    $.ajax(
    {
            url: "../php/control/invokeController.php",
            type: "POST",
            async: false,
            data: "action=4&user=" + JSON.stringify(user),
            dataType: "json",
            beforeSend: function (xhr)
            {
//                beforeSendFunction();
            },
            complete: function (xhr, status)
            {
//                completeFunction();
            },
            success: function (response)
            {
//                dataArray["validationArray"] = response;
            },
            error: function (xhr, ajaxOptions, thrownError) 
            {
//                dataArray["isServerError"] = true;
            }	
    });
}