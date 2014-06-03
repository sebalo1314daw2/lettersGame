function Webmaster(user, role, descriptionOfTheirRole)
{
    // =================================== Attributes ========================================
    this.user = user;
    this.role = role;
    this.descriptionOfTheirRole = descriptionOfTheirRole;
    this.TYPE = "Webmaster"; 
}
    // ===================================== Accessors ======================================
    // ---------------------------------- Read accessors ------------------------------------
    Webmaster.prototype.getUser = function(){return this.user;}
    Webmaster.prototype.getRole = function(){return this.role;}
    Webmaster.prototype.getDescriptionOfTheirRole = function(){return this.descriptionOfTheirRole;}
    Webmaster.prototype.getTYPE = function(){return this.TYPE;}
    // ------------------------------------------ Write accessors -----------------------------------
    Webmaster.prototype.setUser = function(user){this.user = user;}
    Webmaster.prototype.setRole = function(role){this.role = role;}
    Webmaster.prototype.setDescriptionOfTheirRole = function(descriptionOfTheirRole){this.descriptionOfTheirRole = descriptionOfTheirRole;}
    // ===================================== Methods =============================================

    