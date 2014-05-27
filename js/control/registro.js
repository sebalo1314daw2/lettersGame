$("document").ready(function(){atTheStartOfPage();});
/**
 * atTheStartOfPage()
 */
function atTheStartOfPage()
{
    soundList = new Array
    (
            "generalDescriptionSound",
            "goToHomeSound",
            "beginFormSound",
            "endFormSound",
            "clickLinkSound",
            "sendFormSound",
            "nameEmptySound",
            "surnamesEmptySound",
            "schoolEmptySound",
            "cityEmptySound",
            "usernameEmptySound",
            "passwordEmptySound",
            "passwordConfirmationEmptySound",
            "courseEmptySound",
            "dateOfBirthEmptySound",
            "coursesEmptySound",
            "passwordCompleteSound",
            "passwordConfirmationCompleteSound",
            "timeoutSound"
    );
    createSelectProvincies();
    createSelectTeachers();
    enableCaptureKey();
    checkInactivity(soundList);
    addFocusEventInForm();
//    document.getElementById("initialSound").play();
    $("#idUser").html(new Date().getTime());
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
/**
 * keyHandler()
 */
function keyHandler(ASCIICode)
{
//    alert(ASCIICode);
    switch(ASCIICode)
    {
        case 37:
            // Key: <--
            // Action: click on the menu item "Pagina de inicio".
            // informative message 
            Utilities.stopAll(soundList);
            document.getElementById("goToHomeSound").play();
            // redirect
            setTimeout(function(){window.location.href = "home.html";}, 2500);
            break;
        case 39:
            // Key: -->
            // Action: click on the menu item "Iniciar sesion".
            // TODO
            break;
        case 36:
            // Key: Begin
            // Action: gains focus first form field.
            // informative message 
            Utilities.stopAll(soundList);
            document.getElementById("beginFormSound").play();
            // gains focus first form field.
            setTimeout(function(){document.getElementById("selectType0fUser").focus();}, 3100);
            break;
        case 35:
            // Key: end
            // Action: gains focus last form field
            // informative message 
            Utilities.stopAll(soundList);
            document.getElementById("endFormSound").play();
            // gains focus last form field.
            if($("#selectType0fUser").val() == "student")
            {
                 setTimeout(function(){document.getElementById("dateOfBirth").focus();}, 3200);
            }
            else
            {
                setTimeout(function(){document.getElementById("courses").focus();}, 3200);
            }
            break;
        case 79:
            // Key: O
            // Action: click on the ONCE link
            if(!isWritingTheUser())
            {
                // is not writing the user
                // informative message
                Utilities.stopAll(soundList);
                document.getElementById("clickLinkSound").play();
                // redirect
                setTimeout(function(){window.location.href = "http://www.once.es/";}, 3000);
            }
            break;
        case 13:
            // Key: intro
            // Action: send form
            // informative message
            Utilities.stopAll(soundList);
            document.getElementById("sendFormSound").play();
            // send form
            setTimeout(function(){registerNewUser();}, 3000);
            break;
         case 87:
            // Key: W
            // Action: reproduce the sound of the description of the web.
            if(!isWritingTheUser())
            {
                // is not writing the user
                Utilities.stopAll(soundList);
                document.getElementById("generalDescriptionSound").play();
            }
            break;
    }
    // Look if there is a field that has focus.
    if(isWritingTheUser() &&           (ASCIICode >= 65 && ASCIICode <= 90 ||
                                        ASCIICode >= 48 && ASCIICode <= 57 ||
                                        ASCIICode == 0                     ||
                                        ASCIICode == 32                    ||
                                        ASCIICode == 188                   ||
                                        ASCIICode == 190                   ||
                                        ASCIICode == 175                   ||
                                        ASCIICode == 171                   ||
                                        ASCIICode == 222                   ||
                                        ASCIICode == 60                    ||
                                        ASCIICode == 173))
    {
        // a field has focus.
        // reproduce, in the background, a sound that indicates you are typing.
        Utilities.stopAll(new Array("keySound"));
        document.getElementById("keySound").play();
    }
    // Enter a hidden "div" the time the last time a key was pressed
    var lastTime = new Date().getTime();
    $("#lastTimeAKeyWasPressed").html(lastTime);
}
/**
 * readField()
 * @description Procedure that is intended to run informative sounds when the user is positioned
 * in a form field.
 * @author Sergio Baena López
 * @version 1.0
 * @param {DOM object} fieldObject the field that has focus.
 */
function readField(fieldObject)
{
    var SERVER_PATH = "../php/control/invokeController.php";
    if($(fieldObject).val() == "")
    {
        // the field is empty string
        Utilities.stopAll(soundList);
        document.getElementById($(fieldObject).attr("id") + "EmptySound").play();
    }
    else
    {
        // the field has something
        if($(fieldObject).attr("id") == "password" || $(fieldObject).attr("id") == "passwordConfirmation")
        {
            // static sounds
            // password fields
            Utilities.stopAll(soundList);
            document.getElementById($(fieldObject).attr("id") + "CompleteSound").play();
        }
        else
        {
            // dynamic sounds
            // Look here, if you need to create the sound.
            if($("#last_value_" + $(fieldObject).attr("id")).html() != $(fieldObject).val())
            {
                // Not equals
                // create sound. Assign new value to the div (field value)
                var fieldNames = new Array();
                var msg;
                fieldNames["name"] = "El nombre";
                fieldNames["surnames"] = "El o los apellidos";
                fieldNames["school"] = "El colegio";
                fieldNames["city"] = "La ciudad";
                fieldNames["username"] = "El nombre de usuario";
                fieldNames["course"] = "El curso";
                fieldNames["dateOfBirth"] = "La fecha de nacimiento";
                fieldNames["courses"] = "El o los cursos";
                msg = "Campo rellenado. "                       +  
                          fieldNames[$(fieldObject).attr("id")] +
                          " que has indicado es "               +
                          $(fieldObject).val()                  +
                          ".";
                // create sound
                Utilities.convertStringToSound
                (
                        SERVER_PATH, 
                        msg, 
                        "register_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id"),
                        function(){showLoadAnimation();}, 
                        function(){hideLoadAnimation();}
                );
                soundList.addWithoutRepetition("register_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id"));      
                // Assign new value to the div (field value)
                $("#last_value_" + $(fieldObject).attr("id")).html($(fieldObject).val());
            }
            // create audio and source tags
            var audioTag = $("<audio></audio>").attr
            (
                    "id", "register_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id")
            );
            var sourceTag = $("<source />").attr(
            {
                "src":"../mp3/dynamicSounds/register_id_"     + 
                    $("#idUser").html()                       + 
                    "_field_"                                 + 
                    $(fieldObject).attr("id")                 +
                    ".mp3?state="                             +
                    new Date().getTime(),
                "type":"audio/mpeg"
            });
            audioTag.append(sourceTag);
            // remove audio tag and put audio tag in HTML document
            $("#register_id_" + $("#idUser").html() + "_field_" + $(fieldObject).attr("id")).remove();
            $("#soundList").append(audioTag); 
            // reproduce sound
            Utilities.stopAll(soundList);
            audioTag = audioTag[0];
            audioTag.play();
        }
    }
}