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
    // ===================================== Accessors ======================================
    // ------------------------------------------ Read accessors -----------------------------------
    Ranking.prototype.getId = function(){return this.id;}
    Ranking.prototype.getUser = function(){return this.user;}
    Ranking.prototype.getGame = function(){return this.game;}
    Ranking.prototype.getPoints = function(){return this.points;}
    Ranking.prototype.getNumberOfHits = function(){return this.numberOfHits;}
    Ranking.prototype.getNumberOfFailures = function(){return this.numberOfFailures;}
    Ranking.prototype.getNumberOfAttempts = function(){return this.numberOfAttempts;}
    // ------------------------------------------ Write accessors -----------------------------------
    Ranking.prototype.setId = function(id){this.id = id;}
    Ranking.prototype.setUser = function(user){this.user = user;}
    Ranking.prototype.setGame = function(game){this.game = game;}
    Ranking.prototype.setPoints = function(points){this.points = points;}
    Ranking.prototype.setNumberOfHits = function(numberOfHits){this.numberOfHits = numberOfHits;}
    Ranking.prototype.setNumberOfFailures = function(numberOfFailures){this.numberOfFailures = numberOfFailures;}
    Ranking.prototype.setNumberOfAttempts = function(numberOfAttempts){this.numberOfAttempts = numberOfAttempts;}
    // ===================================== Methods =============================================
