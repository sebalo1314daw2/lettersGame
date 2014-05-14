/**
 * showLoadAnimation()
 * @description Procedure is to show the loading animation. What it will do is place the image centered on 
 * the web and obscure everything back.
 * @author Sergio Baena López
 * @version 1.0
 */
function showLoadAnimation()
{
    $("#webContainer").css({"background":"transparent"});
    $("#loadAnimation").show();
    $("body").css("background-color", "#938989");
}
/**
 * hideLoadAnimation()
 * @description Procedure is to hide the loading animation. Put everything as it was before.
 * @author Sergio Baena López
 * @version 1.0
 */
function hideLoadAnimation()
{
    $("#loadAnimation").hide();
    $("body").css("background-color", "#EFC0C6");
}