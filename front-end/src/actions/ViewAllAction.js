import $ from "jquery";
// import axios from "axios";

var ViewAll = (viewAllData)=>{

    var thePromise =
        $.ajax({
            method: "GET",
            url: "http://rishikarri.com:3030/festivals/viewAll",
            data: viewAllData
        });
    return{
        type: "VIEW_ALL",
        payload: thePromise
    }
}


export default ViewAll;
