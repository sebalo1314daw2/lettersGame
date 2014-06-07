/**
 * addWithoutRepetition()
 * @description Function that seeks to add an item to the array provided that it is not repeated.
 * @author Sergio Baena López
 * @version 1.0
 * @param {whatever} newItem the new item to add
 * @return {boolean} if the element was added or not.
 */
Array.prototype.addWithoutRepetition = function(newItem)
{
    var canAdd = true;
    for(var i = 0; i < this.length && canAdd; i++)
    {
        if(this[i] == newItem)
        {
            canAdd = false;
        }
    }
    if(canAdd)
    {
        // add
        this.push(newItem);
    }
    return canAdd;
}
/**
 * store()
 * @description Procedure which aims to store each item (object) of the list in a cookie using their 
 * "store(index)" method.
 * @author Sergio Baena López
 * @version 1.0
 */
Array.prototype.store = function()
{
    // store the items
    for(var i = 0; i < this.length; i++)
    {
        this[i].store(i);
    }
    // store the length
    $.cookie(this[0].getNAME_COOKIE() + "Length", this.length, {path: "/"});
}