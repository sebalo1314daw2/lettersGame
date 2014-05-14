/**
 * showLoadAnimation()
 * @description Procedure is to show the loading animation. What it will do is place the image centered on 
 * the web and obscure everything back.
 * @author Sergio Baena López
 * @version 1.0
 */
function showLoadAnimation()
{
    $("#loadAnimation").show();
    $("#webContainer").css("opacity","0.3");
    $("body").css("background-color", "#fff");
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
    $("#webContainer").css("opacity","1");
    $("body").css("background-color", "#EFC0C6");
}