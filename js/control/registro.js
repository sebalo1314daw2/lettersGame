$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    createSelectProvincies();
    createSelectTeachers();
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
                    " ("                                                 +
                    dataArray["teacherList"][i].getUser().getUsername()  +
                    ")"
            );
            selectTeachers.append(anOptionOfSelect);
        }
        // we put this select in the view
        $("#divSelectTeachers").append(selectTeachers);
    }
}
/**
 * prepareForm()
 * @description Procedure aims at preparing the form requires the user type indicated by the "select". 
 * What will make this procedure, from one hide fields and display fields other, basically.
 * @author Sergio Baena López
 * @version 1.0
 * @param {String} selectedOption the selected option (student, teacher)
 */
function prepareForm(selectedOption)
{
    if(selectedOption == "student")
    {
        // the selected option is student
        // TODO
        
        
    }
    else
    {
        // the selected option is teacher
        // hide student fields
        $("#studentFields").hide();
        // reset student fields
        resetStudentFields();
        // show teacher fields
        $("#teacherFields").show();
    }
}
/**
 * resetStudentFields()
 * @description Procedure is intended to reset the fields of student.
 * @author Sergio Baena López
 * @version 1.0
 */
function resetStudentFields()
{
    // select first item
    $("#selectTeachers > option:selected").attr("selected", false);
    $("#selectTeachers > option:first-child").attr("selected", true);
    // textbox #course
    $("#course").val("");
    // datebox #dateOfBirth
    $("#dateOfBirth").val("");
}