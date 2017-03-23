import $ from "jquery";
// import axios from "axios";

var LoginAction = (loginData)=>{
    var thePromise =
        $.ajax({
            method: "POST",
            url: "http://rishikarri.com:3030/login",
            data: loginData
        });
    // console.log(thePromise);
    return{
        type: "LOGIN",
        payload: thePromise
    }
}


export default LoginAction;
