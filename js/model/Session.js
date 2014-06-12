function Session(SERVER_PATH)
{
     // =================================== Attributes ===============================================
     this.SERVER_PATH =  SERVER_PATH; // server path where to go to open or close session. (String)
}
    Session.prototype.NAME = "activeRankingAndStudentOrTeacher"; // the name of the session (String)
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    Session.prototype.getSERVER_PATH = function(){return this.SERVER_PATH;}
    Session.prototype.getNAME = function(){return this.NAME;}
    // ====================================== Methods ===========================================
    /**
     * open()
     * @description Function that seeks to open a user session. What it will do is to log on the server and the 
     * client, as long as the user transferred there in the database.
     * @author Sergio Baena López
     * @version 1.0
     * @param {User object} user the user who wants to open session.
     * @param {function} beforeSendFunction the "beforeSend" Ajax function we want to run.
     * @param {function} completeFunction the complete function of Ajax that we want to execute
     * @return {associative array} an associative array with this format:
     * "isServerError" {boolean} indicates if an error occurred on the server or not
     * "sessionOpened" {boolean} indicates whether or not the session opened 
     */
    Session.prototype.open = function(user, beforeSendFunction, completeFunction)
    {
        // Open a session on the server 
        var sessionArray = new Array();
        var outputData;
        sessionArray["isServerError"] = false;
        $.ajax(
        {
                url: this.SERVER_PATH,
                type: "POST",
                async: false,
                data: "action=4&user=" + JSON.stringify(user),
                dataType: "json",
                beforeSend: function (xhr)
                {
                    beforeSendFunction();
                },
                complete: function (xhr, status)
                {
                    completeFunction();
                },
                success: function (response)
                {
                    outputData = response;
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
                    sessionArray["isServerError"] = true;
                }	
        });
        if(!sessionArray["isServerError"])
        {
            // is not server error
            // let's see if session opened on the server
            sessionArray["sessionOpened"] = outputData["sessionOpened"];
            if(sessionArray["sessionOpened"])
            {
                // it opened a session on the server --> we open a session on the client
                // we put the rankings and teacher/student/webmaster object in the client session
                $.cookie
                (
                        this.NAME + "0",
                        JSON.stringify(outputData["sessionContent"]["teacherOrStudentOrWebmaster"]),
                        {path: "/"}
                );
                for(var i = 1; i <= outputData["sessionContent"]["rankingList"].length; i++)
                {
                    $.cookie
                    (
                            this.NAME + i, 
                            JSON.stringify(outputData["sessionContent"]["rankingList"][i - 1]),
                            {path: "/"}
                    );
                }
            }
        }
        return sessionArray;
    }
    /**
     * isOpen()
     * @description Procedure that aims to look after the session is open or not
     * @author Sergio Baena López
     * @version 1.0
     * @return {boolean} if the session is opened or not
     */
    Session.prototype.isOpen = function()
    {
          return $.cookie(this.NAME + "0") != undefined;
    }
    /**
     * obtainValue()
     * @description Function that seeks to obtain the value of the session
     * @author Sergio Baena López
     * @version 1.0
     * @param {Number} index the index of the session you want to get its value.
     * @return {Ranking object | Webmaster object | Teacher object | Student object} 
     * the value contained in the session
     */
    Session.prototype.obtainValue = function(index)
    {
        var sessionContent;
        var user;
        if(index == 0)
        {
            // is teacher, student o webmaster
            // look, if a student, teacher or webmaster.
            var teacherOrStudentOrWebmasterJSONEncoded = $.cookie(this.NAME + index);
            var teacherOrStudentOrWebmasterJSONDecoded = JSON.parse(teacherOrStudentOrWebmasterJSONEncoded);
            var teacherOrStudentOrWebmaster;
            switch(teacherOrStudentOrWebmasterJSONDecoded.TYPE)
            {
                case "Teacher":
                    // is teacher
                    // create the user object
                    user = new User
                    (
                            teacherOrStudentOrWebmasterJSONDecoded.user.username,
                            teacherOrStudentOrWebmasterJSONDecoded.user.password,
                            "",
                            teacherOrStudentOrWebmasterJSONDecoded.user.name,
                            teacherOrStudentOrWebmasterJSONDecoded.user.surnames
                    );
                    user.setId(teacherOrStudentOrWebmasterJSONDecoded.user.id);
                    // create the province object
                    var province = new Province(teacherOrStudentOrWebmasterJSONDecoded.province.value);
                    province.setId(teacherOrStudentOrWebmasterJSONDecoded.province.id);
                    // create the teacher object
                    teacherOrStudentOrWebmaster = new Teacher
                    (
                            user,
                            province,
                            teacherOrStudentOrWebmasterJSONDecoded.school,
                            teacherOrStudentOrWebmasterJSONDecoded.city,
                            teacherOrStudentOrWebmasterJSONDecoded.courses
                    );
                    break;
                case "Student":
                    // is student 
                    // create the user object
                    user = new User
                    (
                            teacherOrStudentOrWebmasterJSONDecoded.user.username,
                            teacherOrStudentOrWebmasterJSONDecoded.user.password,
                            "",
                            teacherOrStudentOrWebmasterJSONDecoded.user.name,
                            teacherOrStudentOrWebmasterJSONDecoded.user.surnames
                    );
                    user.setId(teacherOrStudentOrWebmasterJSONDecoded.user.id);
                    // create the province object
                    var province = new Province(teacherOrStudentOrWebmasterJSONDecoded.province.value);
                    province.setId(teacherOrStudentOrWebmasterJSONDecoded.province.id);
                    // create the user object (of teacher object)
                    var userOfTeacher = new User
                    (
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.user.username,
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.user.password,
                            "",
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.user.name,
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.user.surnames
                    );
                    user.setId(teacherOrStudentOrWebmasterJSONDecoded.teacher.user.id);
                    // create the province object (of teacher object)
                    var provinceOfTeacher = new Province(teacherOrStudentOrWebmasterJSONDecoded.teacher.province.value);
                    provinceOfTeacher.setId(teacherOrStudentOrWebmasterJSONDecoded.teacher.province.id);
                    // create the teacher object
                    var teacher = new Teacher
                    (
                            userOfTeacher,
                            provinceOfTeacher,
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.school,
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.city,
                            teacherOrStudentOrWebmasterJSONDecoded.teacher.courses
                    );
                    teacherOrStudentOrWebmaster = new Student
                    (
                            user,
                            province,
                            teacher,
                            teacherOrStudentOrWebmasterJSONDecoded.school,
                            teacherOrStudentOrWebmasterJSONDecoded.city,
                            teacherOrStudentOrWebmasterJSONDecoded.course,
                            teacherOrStudentOrWebmasterJSONDecoded.dateOfBirth
                    );
                    break;
                case "Webmaster":
                    // is webmaster
                    // create the user object
                    user = new User
                    (
                            teacherOrStudentOrWebmasterJSONDecoded.user.username,
                            teacherOrStudentOrWebmasterJSONDecoded.user.password,
                            "",
                            teacherOrStudentOrWebmasterJSONDecoded.user.name,
                            teacherOrStudentOrWebmasterJSONDecoded.user.surnames
                    );
                    user.setId(teacherOrStudentOrWebmasterJSONDecoded.user.id);
                    teacherOrStudentOrWebmaster = new Webmaster
                    (
                            user,
                            teacherOrStudentOrWebmasterJSONDecoded.role,
                            teacherOrStudentOrWebmasterJSONDecoded.descriptionOfTheirRole
                    );
                    break;   
            }
            sessionContent = teacherOrStudentOrWebmaster;
        }
        else
        {
            // is ranking
            var rankingJSONEncoded = $.cookie(this.NAME + index);
            var rankingJSONDecoded = JSON.parse(rankingJSONEncoded);
            // create the user object
            user = new User
            (
                    rankingJSONDecoded.user.username,
                    rankingJSONDecoded.user.password,
                    "",
                    rankingJSONDecoded.user.name,
                    rankingJSONDecoded.user.surnames
            );
            user.setId(rankingJSONDecoded.user.id);
            // create the game object
            var game = new Game
            (
                    rankingJSONDecoded.game.id,
                    rankingJSONDecoded.game.name,
                    rankingJSONDecoded.game.shortDescription,
                    rankingJSONDecoded.game.rules,
                    rankingJSONDecoded.game.punctuationAtTheFirstAttempt,
                    rankingJSONDecoded.game.punctuationAtTheSecondAttempt,
                    rankingJSONDecoded.game.timeOfFirstAttempt,
                    rankingJSONDecoded.game.timeOfSecondAttempt,
                    rankingJSONDecoded.game.numOfWords
            );
            var ranking = new Ranking
            (
                    rankingJSONDecoded.id,
                    user,
                    game,
                    rankingJSONDecoded.points,
                    rankingJSONDecoded.numberOfHits,
                    rankingJSONDecoded.numberOfFailures,
                    rankingJSONDecoded.numberOfAttempts
            );
            sessionContent = ranking;
        }
        return sessionContent;
    }
    /**
     * establishValue()
     * @description Procedure is to establish the value of the session
     * @author Sergio Baena López
     * @version 1.0
     * @param {Number} index the index of the cookie of the session to establish
     * @param {Ranking or Student or Teacher or Webmaster object} value the value to establish
     */
    Session.prototype.establishValue = function(index, value)
    {
          $.cookie(this.NAME + index, JSON.stringify(value), {path: "/"});
    }
    /**
     * close()
     * @description Procedure aims log out the active player. What it will do is to log off the server and client.
     * @author Sergio Baena López
     * @version 1.0
     */
    Session.prototype.close = function()
    {
        // close session of the server
        $.ajax(
        {
                url: this.SERVER_PATH,
                type: "POST",
                async: true,
                data: "action=7",
                dataType: "json",
                success: function (response)
                {
                    // nothing
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
                    // nothing
                }	
        });
        // close session of the client
        for(var i = 0; i < 5; i++)
        {
            $.removeCookie(this.NAME + i, {path: "/"});
        }    
    }
    /**
     * saveChanges()
     * @description Procedure which aims to store its values in the database.
     * @author Sergio Baena López
     * @version 1.0
     */
    Session.prototype.saveChanges = function()
    {
        var rankingList = new Array();
        for(var i = 1; i < 5; i++)
        {
            rankingList.push(this.obtainValue(i));
        }
        // rankingList loaded
        Encoder.EncodeType = "entity";
        $.ajax(
        {
                url: this.SERVER_PATH,
                type: "POST",
                async: true,
                data: "action=8&rankingList=" + Encoder.htmlDecode(JSON.stringify(rankingList)),
                dataType: "json",
                success: function (response)
                {
                    // nothing
                },
                error: function (xhr, ajaxOptions, thrownError) 
                {
                    // nothing
                }	
        });
    }