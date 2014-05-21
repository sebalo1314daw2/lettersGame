$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    createSelectProvincies();
    createSelectTeachers();
    document.getElementById("initialSound").play();
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
        // look if 'dataArray["teacherList"]' is an empty array --> empty table
        if(dataArray["teacherList"].length == 0)
        {
            // empty array (empty table)
            // redirect to an error page
            // TODO
        }
        else
        {
            // not empty array --> we create the select
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
        $("#teacherFields").hide();
        // reset teacher fields
        resetTeacherFields();
        // show student fields
        $("#studentFields").show();
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
/**
 * resetTeacherFields()
 * @description Procedure is intended to reset the fields of teacher.
 * @author Sergio Baena López
 * @version 1.0
 */
function resetTeacherFields()
{
    // textbox #courses
    $("#courses").val("");
}
/**
 * registerNewUser()
 * @description Procedure which aims to collect the form values​​, validate (first, with the 
 * client and then the server), correct them and, finally, does the "INSERTS" necessary.
 * @author Sergio Baena López
 * @version 1.0
 */
function registerNewUser()
{
    var SERVER_PATH = "../php/control/invokeController.php";
    // --------------------------------------------- data validation -------------------------
    var validationArray;
    // create a User object with form data
    var user = new User
    (
            $("#username").val(),
            $("#password").val(),
            $("#passwordConfirmation").val(), 
            $("#name").val(),
            $("#surnames").val()
    );
    // create a Province object with form data
    var province = new Province($("#selectProvinces > option:selected").html());
    province.setId(parseInt($("#selectProvinces").val()));
    // look if the user are a student or teacher.  
    if($("#selectType0fUser").val() == "student")
    {
        // the user is a student
        // create a Teacher object with form data
        var userTeacher = new User("", "", "", "", "");
        userTeacher.setId(parseInt($("#selectTeachers").val()));
        var provinceTeacher = new Province("");
        provinceTeacher.setId("");
        var teacher = new Teacher(userTeacher, provinceTeacher, "", "", "");        
        // create a Student object with form data
        var resultArray;
        var date =  $("#dateOfBirth").val();
        var finalDate;
        if(date.search("-") != -1)
        {
            // has a dash least --> do conversion
            resultArray = Utilities.dateConverter(date);
            if(resultArray["converterError"])
            {
                // converter error
                finalDate = date;
            }
            else
            {
                // no converter error
                finalDate = resultArray["convertedDate"];
            }
        }
        else
        {
            // has not a dash 
            finalDate = date;
        }
        var teacherOrStudent = new Student
        (
                user,
                province,
                teacher,
                $("#school").val(),
                $("#city").val(),
                $("#course").val(),
                finalDate
        );
    }
    else
    {
        // the user is a teacher
        // create a Teacher object with form data
        var teacherOrStudent = new Teacher
        (
                user,
                province,
                $("#school").val(),
                $("#city").val(),
                $("#courses").val()
        );
    }
    validationArray = teacherOrStudent.validate();
    // We put styles that correspond to text fields depending valid or not.
    for(var nameOfFormField in validationArray[1])
    {
        if(validationArray[1][nameOfFormField])
        {
            // is valid the field nameOfFormField
            // assign the normal box style --> Delete the "invalidField" class
            $("#" + nameOfFormField).removeClass("invalidField");
        }
        else
        {
            // is not valid
            $("#" + nameOfFormField).addClass("invalidField");
        }
    }
    if(validationArray[0])
    {
        // all valid fields (first validation)
        // Before sent, we encrypt the password.
        teacherOrStudent.getUser().encryptedPassword();
        if(teacherOrStudent.getTYPE() == "Student")
        {
            // is student --> he has date
            date = teacherOrStudent.getDateOfBirth();
            // date is with this format: dd/mm/yyyy
            resultArray = Utilities.dateConverterReverse(date);
            finalDate = resultArray["convertedDate"];
            // finalDate has the correct format for the database
            teacherOrStudent.setDateOfBirth(finalDate);
        }   
        var dataArray = Utilities.sendUserForRegister
        (
            teacherOrStudent, 
            SERVER_PATH, 
            function(){showLoadAnimation();}, 
            function(){hideLoadAnimation();}
        );
        if(dataArray["isServerError"])
        {
            // is server error
            alert("Error del servidor"); // ESTO HAY QUE CAMBIARLOS
        }
        else
        {
            // is not server error
            // result of the second validation (server validation)
            // We put styles that correspond to text fields depending valid or not.
            validationArray = dataArray["validationArray"];
            for(var nameOfFormField in validationArray[1])
            {
                if(validationArray[1][nameOfFormField])
                {
                    // is valid the field nameOfFormField
                    // assign the normal box style --> Delete the "invalidField" class
                    $("#" + nameOfFormField).removeClass("invalidField");
                }
                else
                {
                    // is not valid
                    $("#" + nameOfFormField).addClass("invalidField");
                }
            }
            if(validationArray[0])
            {
                // all valid fields (second validation)
                alert("Todos los campos son validos");
            }
            else
            {
                $("#errorsForm").children().remove();
                var errorListInHTMLFormat = Utilities.createErrorListInHTMLFormat
                (
                        Utilities.associativeArrayToNumericArray(validationArray[2])
                );
                $("#errorsForm").append(errorListInHTMLFormat);
                resetPasswordFields();
            }
        }
    }
    else
    {
          $("#errorsForm").children().remove();
          var errorListInHTMLFormat = Utilities.createErrorListInHTMLFormat(validationArray[2]);
          $("#errorsForm").append(errorListInHTMLFormat);
          resetPasswordFields();
    }
}
/**
 * resetPasswordFields()
 * @description  Procedure which aims reset the password fields
 * @author Sergio Baena López
 * @version 1.0
 */
function resetPasswordFields()
{
    $("#password").val("");
    $("#passwordConfirmation").val("");
}