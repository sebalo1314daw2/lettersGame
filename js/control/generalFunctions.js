/**
 * showLoadAnimation()
 * @description Procedure is to show the loading animation. What it will do is place the image centered on 
 * the web and obscure everything back.
 * @author Sergio Baena López
 * @version 1.0
 */ 
function showLoadAnimation()
{
    // put the loading class
    $("#loadAnimation").addClass("loading");
    $("#webContainer").addClass("loading");
    $("body").addClass("loading");
}
/**
 * hideLoadAnimation()
 * @description Procedure is to hide the loading animation. Put everything as it was before.
 * @author Sergio Baena López
 * @version 1.0
 */
function hideLoadAnimation()
{
    // quit the loading class
    $("#loadAnimation").removeClass("loading");
    $("#webContainer").removeClass("loading");
    $("body").removeClass("loading");
}