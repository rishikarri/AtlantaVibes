import $ from "jquery";
// import axios from "axios";

var TopRated = (topRatedData)=>{

    var thePromise =
        $.ajax({
            method: "GET",
            url: "http://rishikarri.com:3030/festivals/topRated",
            data: topRatedData
        });
    return{
        type: "TOP_RATED",
        payload: thePromise
    }
}


export default TopRated;
