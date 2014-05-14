$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    var SERVER_PATH = "../php/control/invokeController.php";
    // We get a list of all provinces
    var dataArray = new Province("").obtainAll(SERVER_PATH, function(){}, function(){});
    if(dataArray["isServerError"])
    {
        // is server error
        alert("es error de servidor"); // ESTO HAY QUE CAMBIARLO
    }
    else
    {
        // is not server error
        // we create the select
        
    }
    
    
    
    
}