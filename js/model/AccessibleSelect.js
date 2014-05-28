function AccessibleSelect(select)
{
    // =================================== Attributes ===============================================
    this.select = select; // the accessible select (select object)
}
    // ===================================== Accessors =============================================
    // ------------------------------------------ Read accessors -----------------------------------
    AccessibleSelect.prototype.getSelect = function(){return this.select;}
    // ------------------------------------------ Write accessors -----------------------------------
    AccessibleSelect.prototype.setSelect = function(select){this.select = select;}
    // =================================== Static methods =============================================
    /**
     * generate()
     * @description Function that seeks to generate a "select" accessible. To do this, we must add the 
     * "previous" and "posterior" classes  on the previous and posterior options of the selected option.
     * @author Sergio Baena López
     * @version 1.0
     * @param {select object} select the "select" we have to make it accessible.
     * @return {AccessibleSelect object} the accessible select
     */
    AccessibleSelect.generate = function(select)
    {
        var optionList = $("option", select); // list of JavaScript option objects (no JQuery)
        var previousOption; // pevious option (JQuery option object)
        var posteriorOption; // posterior option (JQuery option object)
        for(var i = 0; i < optionList.length; i++)
        {
            if($(optionList[i]).is(":selected"))
            {
                // the selected option   
                if(i != optionList.length - 1)
                {
                    // there posterior option.
                    posteriorOption = $(optionList[i + 1]);
                }
                break;
            }
            previousOption = $(optionList[i]);
        }
        if(previousOption != undefined)
        {
            // There is a previous option.
            // add previous class
            previousOption.addClass("previous");
        }
        if(posteriorOption != undefined)
        {
            // There is a posterior option.
            // add posterior class
            posteriorOption.addClass("posterior");
        }
        return new AccessibleSelect(select);
    }
    // =================================== Methods =============================================
    /**
     * goUp()
     * @description Function that seeks to go up an option of "select".
     * @author Sergio Baena López
     * @version 1.0
     * @return {AccessibleSelect object} the select after that we go up
     */
    AccessibleSelect.prototype.goUp = function()
    {
        if($(".previous", this.select).length != 0)
        {
            // there is previous option
            // deselected the option
            $("option[selected='selected']", this.select).attr("selected", false);
            // select the previous option
            $(".previous", this.select).attr("selected", true);
            // remove classes
            $(".previous", this.select).removeClass("previous");
            $(".posterior", this.select).removeClass("posterior");
            // he placed the classes correctly
            return AccessibleSelect.generate(this.select);
        }
    }
    /**
     * goDown()
     * @description Function that seeks to go down an option of "select".
     * @author Sergio Baena López
     * @version 1.0
     * @return {AccessibleSelect object} the select after that we go down
     */
    AccessibleSelect.prototype.goDown = function()
    {
        if($(".posterior", this.select).length != 0)
        {
            // there is posterior option
            // deselected the option
            $("option[selected='selected']", this.select).attr("selected", false);
            // select the posterior option
            $(".posterior", this.select).attr("selected", true);
            // remove classes
            $(".previous", this.select).removeClass("previous");
            $(".posterior", this.select).removeClass("posterior");
            // he placed the classes correctly
            return AccessibleSelect.generate(this.select);
        }
    }