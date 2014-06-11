function Ranking(id, user, game, points, numberOfHits, numberOfFailures, numberOfAttempts)
{
    // =================================== Attributes ========================================
    this.id = id;
    this.user = user;
    this.game = game;
    this.points = points;
    this.numberOfHits = numberOfHits;
    this.numberOfFailures = numberOfFailures;
    this.numberOfAttempts = numberOfAttempts;
}
    Ranking.COOKIE_NAME = "ranking";
    // ===================================== Accessors ======================================
    // ------------------------------------------ Read accessors -----------------------------------
    Ranking.prototype.getId = function(){return this.id;}
    Ranking.prototype.getUser = function(){return this.user;}
    Ranking.prototype.getGame = function(){return this.game;}
    Ranking.prototype.getPoints = function(){return this.points;}
    Ranking.prototype.getNumberOfHits = function(){return this.numberOfHits;}
    Ranking.prototype.getNumberOfFailures = function(){return this.numberOfFailures;}
    Ranking.prototype.getNumberOfAttempts = function(){return this.numberOfAttempts;}
    Ranking.prototype.getCOOKIE_NAME = function(){return Ranking.COOKIE_NAME;}
    // ------------------------------------------ Write accessors -----------------------------------
    Ranking.prototype.setId = function(id){this.id = id;}
    Ranking.prototype.setUser = function(user){this.user = user;}
    Ranking.prototype.setGame = function(game){this.game = game;}
    Ranking.prototype.setPoints = function(points){this.points = points;}
    Ranking.prototype.setNumberOfHits = function(numberOfHits){this.numberOfHits = numberOfHits;}
    Ranking.prototype.setNumberOfFailures = function(numberOfFailures){this.numberOfFailures = numberOfFailures;}
    Ranking.prototype.setNumberOfAttempts = function(numberOfAttempts){this.numberOfAttempts = numberOfAttempts;}
    // ================================= Static methods ==========================================
    /**
     * obtainFromDocument()
     * @description Function that seeks to obtain the "Ranking" object stored in the document.
     * @author Sergio Baena López
     * @version 1.0
     * @param {DOM object} tag the tag where get the object.
     * @return {Ranking object} the ranking contained
     */
    Ranking.obtainFromDocument = function(tag)
    {
        var rankingJSONEncoded = $(tag).html();
        var rankingJSONDecoded = JSON.parse(rankingJSONEncoded);
        var user = new User
        (
                rankingJSONDecoded.user.username,
                rankingJSONDecoded.user.password,
                rankingJSONDecoded.user.passwordConfirmation,
                rankingJSONDecoded.user.name,
                rankingJSONDecoded.user.surnames
        );
        user.setId(rankingJSONDecoded.user.id);
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
        return ranking;
    }
    /**
     * obtainFromCookie()
     * @description Function that seeks to get the ranking object stored in the cookie.
     * @author Sergio Baena López
     * @version 1.0
     * @return {Ranking object} the ranking stored in the cookie
     */
    Ranking.obtainFromCookie = function()
    {
        var rankingJSONEncoded = $.cookie(Ranking.COOKIE_NAME);
        var rankingJSONDecoded = JSON.parse(rankingJSONEncoded);
        var user = new User
        (
                rankingJSONDecoded.user.username,
                rankingJSONDecoded.user.password,
                rankingJSONDecoded.user.passwordConfirmation,
                rankingJSONDecoded.user.name,
                rankingJSONDecoded.user.surnames
        );
        user.setId(rankingJSONDecoded.user.id);
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
        return ranking;
    }
    // ===================================== Methods =============================================
    /**
     * storeInDocument()
     * @description Procedure which aims to store this object in the document.
     * @author Sergio Baena López
     * @version 1.0
     * @param {DOM object} tag the tag where we store this object
     */
    Ranking.prototype.storeInDocument = function(tag)
    {
        $(tag).html(JSON.stringify(this));
    }
    /**
     * store()
     * @description Procedure which aims to store this object in the cookie.
     * @author Sergio Baena López
     * @version 1.0
     */
    Ranking.prototype.store = function()
    {
        $.cookie(this.getCOOKIE_NAME(), JSON.stringify(this), {path: "/"});
    }
    /**
     * update()
     * @description Procedure which aims to update this object ranking considering the ranking specified.
     * @author Sergio Baena López
     * @version 1.0
     * @param {Ranking object} lastRanking the new ranking to consider.
     */
    Ranking.prototype.update = function(lastRanking)
    {
        this.points = this.points + lastRanking.points;
        this.numberOfHits = this.numberOfHits + lastRanking.numberOfHits;
        this.numberOfFailures = this.numberOfFailures + lastRanking.numberOfFailures;
        this.numberOfAttempts = this.numberOfAttempts + lastRanking.numberOfAttempts;
    }