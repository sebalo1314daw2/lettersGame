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
        // Open a session on the server POR AQUI VOY
        var sessionArray = new Array();
        var outputData;
        sessionArray["isServerError"] = false;
        $.ajax(
        {
                url: this.SERVER_PATH,
                type: "POST",
                async: false,
                data: "action=2&player=" + JSON.stringify(player),
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
                // we put the ranking object in the client session
//                sessionStorage.setItem(this.NAME, JSON.stringify(outputData["sessionContent"]));
                $.cookie(this.NAME, JSON.stringify(outputData["sessionContent"]), {path: "/"});
            }
        }
        return sessionArray;
    }