import $ from "jquery";
// import axios from "axios";

var Upcoming = (upcomingData)=>{
    console.log("eeper = drew")
    var thePromise =
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/festivals/upcoming",
            data: upcomingData
        });
    return{
        type: "UPCOMING",
        payload: thePromise
    }
}


export default Upcoming;