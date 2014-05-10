function Utilities(){}
// =========================================== Static methods =======================================================
/**
 * createTitle()
 * @description Function that aims to create the own title web.
 * @author Sergio Baena López
 * @version 1.0
 * @return {h1 object} the title of the web
 */
Utilities.createTitle = function()
{
    var h1Object = $("<h1></h1>").html("&iquest;Qu&eacute; har&iacute;amos sin las letras?");
    return h1Object;
}
/**
 * createUnauthenticatedUserMenu()
 * @description Function that aims to create the own unauthenticated user menu of the web.
 * @author Sergio Baena López
 * @version 1.0
 * @return {ul object} the unauthenticated user menu of the web
 */
Utilities.createUnauthenticatedUserMenu = function()
{
    // ---------------------------- Creating DOM objects -----------------------------------------------
    // ul object
    var ul = $("<ul></ul>").attr("id", "unauthenticatedUserMenu");
    // li's objects
    var li1 = $("<li></li>");
    var li2 = $("<li></li>");
    var li3 = $("<li></li>");
    // a's objects
    var a1 = $("<a></a>").html("P&aacute;gina de inicio");
    var a2 = $("<a></a>").html("Registro");
    var a3 = $("<a></a>").html("Iniciar sesi&oacute;n");
    // ---------------------------- Putting objects inside each other ----------------------------------------
    // put a's to li's
    li1.append(a1);
    li2.append(a2);
    li3.append(a3);
    // put li's to ul
    ul.append(li1);
    ul.append(li2);
    ul.append(li3);
    return ul;
}
/**
 * createFooter()
 * @description Function that aims to create the own footer of the web.
 * @author Sergio Baena López
 * @version 1.0
 * @return {div object} the footer of the web.
 */
Utilities.createFooter = function()
{
    // ---------------------------- Creating DOM objects -----------------------------------------------
    // create div
    var div = $("<div></div>");
    // create a's
    var aUser = $("<a></a>").attr("href", "https://www.flickr.com/photos/markoz46/with/11715172226/").html("usuario");
    var aLicense = $("<a></a>").attr("href", "https://creativecommons.org/licenses/by/2.0/deed.es").html("Creative Commons");
    var aOnce = $("<a></a>").attr("href", "http://www.once.es/").html("ONCE");
    // create and put (p)
    // p1
    var p1 = $("<p></p>").html("Se ha usado, para el fondo, una imagen modificada de un ");
    p1.append(aUser);
    p1.html(p1.html() + "de flickr.com protegido por");
    p1.append(aLicense);
    // p2
    var p2 = $("<p></p>").css("margin-bottom", "0").html("&copy; ");
    p2.append(aOnce);
    // put p's in div
    div.append(p1);
    div.append(p2);
    return div;
}