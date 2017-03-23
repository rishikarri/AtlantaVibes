import $ from 'jquery'

var PostCommentAction = (postCommentData) => {
    var thePromise = $.ajax({
        method: 'POST',
        url: "http://rishikarri.com:3030/festivals/postComment",
        data: postCommentData
    });
    return {
        type: "POST_COMMENT",
        payload: thePromise

    }
}


export default PostCommentAction;
