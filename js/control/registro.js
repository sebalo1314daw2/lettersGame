$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    createSelectProvincies();
}
/**
 * createSelectProvincies()
 * @description Procedure aims to obtain all provinces stored in the database and display them in 
 * the view using a select.
 * @author Sergio Baena López
 * @version 1.0
 */
function createSelectProvincies()
{
    var SERVER_PATH = "../php/control/invokeController.php";
    // We get a list of all provinces
    var dataArray = new Province("").obtainAll
    (
            SERVER_PATH, function(){showLoadAnimation();}, function(){hideLoadAnimation();}
    );
    if(dataArray["isServerError"])
    {
        // is server error
        alert("es error de servidor"); // ESTO HAY QUE CAMBIARLO
    }
    else
    {
        // is not server error
        // we create the select
        var selectProvincies = Utilities.createSelect
        (
                dataArray["provinceList"], "value", "id", "selectProvinces"
        );
        // we put this select in the view
        $("#divSelectProvincies").append(selectProvincies);
    }
}
/**
 * createSelectTeachers()
 * @description Procedure aims to obtain all teachers stored in the database and display them in 
 * the view using a select.
 * @author Sergio Baena López
 * @version 1.0
 */
function createSelectTeachers()
{
    var SERVER_PATH = "../php/control/invokeController.php";
    // We get a list of all teachers
    var dataArray = new Teacher("", "", "", "", "").obtainAll
    (
            SERVER_PATH, function(){showLoadAnimation();}, function(){hideLoadAnimation();}
    );
    if(dataArray["isServerError"])
    {
        // is server error
        alert("es error de servidor"); // ESTO HAY QUE CAMBIARLO
    }
    else
    {
        // is not server error
        // we create the select
        var selectTeachers = $("<select></select>").attr("id", "selectTeachers");
        var anOptionOfSelect;
        for(var i = 0; i < dataArray["teacherList"].length; i++)
        {
            anOptionOfSelect = $("<option></option>").attr
            (
                    "value", dataArray["teacherList"][i].getUser().getId()
            ).html
            (
                    dataArray["teacherList"][i].getUser().getName()      + 
                    " "                                                  +
                    dataArray["teacherList"][i].getUser().getSurnames()  +
                    
            );
        }
        // we put this select in the view
        $("#divSelectProvincies").append(selectProvincies);
    }
}
