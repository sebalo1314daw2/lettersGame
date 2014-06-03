function atTheStartOfPage()
{
    if(!new Session("").isOpen())
    {
        // is not open the user session
        alert("Acceso denegado"); // ESTO HAY QUE CAMBIARLO
    }
    generateStudentMenu();
    loadTheNameOfTheActiveUser();
}