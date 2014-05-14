function User(username, password, passwordConfirmation, name, surnames)
{
    // =================================== Attributes ===============================================
    this.id; // (Number)
    this.username = username; // (String)
    this.password = password; // (String)
    this.passwordConfirmation = passwordConfirmation; // (String)
    this.name = name; // (String)
    this.surnames = surnames; // (String)
}
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    User.prototype.getId = function(){return this.id;}
    User.prototype.getUsername = function(){return this.username;}
    User.prototype.getPassword = function(){return this.password;}
    User.prototype.getPasswordConfirmation = function(){return this.passwordConfirmation;}
    User.prototype.getName = function(){return this.name;}
    User.prototype.getSurnames = function(){return this.surnames;}
    // ------------------------------------------ Write accessors -----------------------------------
    User.prototype.setId = function(id){this.id = id;}
    User.prototype.setUsername = function(username){this.username = username;}
    User.prototype.setPassword = function(password){this.password = password;}
    User.prototype.setPasswordConfirmation = function(passwordConfirmation){this.passwordConfirmation = passwordConfirmation;}
    User.prototype.setName = function(name){this.name = name;}
    User.prototype.setSurnames = function(surnames){this.surnames = surnames;}
    // ===================================== Methods =============================================
    