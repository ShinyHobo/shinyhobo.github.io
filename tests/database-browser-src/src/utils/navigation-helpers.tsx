export class CommonNavigationFunctions { 
    /**
     * Updates the url with parameters
     * @param param The parameter to set
     * @param paramVal The value to set the parameter to
     * @returns The updated url
     */
    public static updateURLParameter(param: string, paramVal: string)
    {
        var TheAnchor = null;
        var newAdditionalURL = "";
        var tempArray = window.location.href.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";

        if (additionalURL) 
        {
            var tmpAnchor = additionalURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor = tmpAnchor[1];
            if(TheAnchor)
                additionalURL = TheParams;

            tempArray = additionalURL.split("&");

            for (var i=0; i<tempArray.length; i++)
            {
                if(tempArray[i].split('=')[0] != param)
                {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }        
        }
        else
        {
            var tmpAnchor = baseURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor  = tmpAnchor[1];

            if(TheParams)
                baseURL = TheParams;
        }

        if(TheAnchor)
            baseURL  += "#" + TheAnchor;

        var rows_txt = temp + "" + param + "=" + paramVal;
        window.history.replaceState('','',baseURL + "?" + newAdditionalURL + rows_txt);
    }

    /**
     * Resets the url to the base url without parameters
     */
    public static resetUrl() {
        var tempArray = window.location.href.split("?");
        var baseURL = tempArray[0];
        window.history.replaceState('','',baseURL);
    }
}

