import React, {Component} from "react";
import {connect} from 'react-redux';
import dateformat from 'dateformat';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        this.setState({
            comments: this.props.comments
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.comments !== nextProps.comments){
            this.setState({
                comments: nextProps.comments
            });
        }
        // console.log(nextProps);
        // create an array that will hold the set of old comments in addition to the new comment
        var commentsArrayWithNewComment = this.state.comments;
        // add the new comment to the array
        commentsArrayWithNewComment.unshift(nextProps.newComment);
        // rerender the page with the new set of comments
        if (this.props.newComment !== nextProps.newComment) {
            this.setState({
                comments: commentsArrayWithNewComment
            })
        }
    }

    render() {
        let commentsArray = []
        this.state.comments.map((comment, index) => {

            // grab time for each comment and make it look nice
            var date = new Date(comment.timestamp)
            var niceLookingDate = dateformat(date, 'fullDate');
            var niceLookingTime = dateformat(date, 'shortTime');
            // var dateString = String(date);


            // grab a default image from the back end in case the user has not uploaded a photo
            var defaultUserImagePath = 'http://rishikarri.com:3030/images/avatars/default-user-image.jpg';

            // grab the image that the user uploaded from the back ends
            var avatarImageName = comment.avatar_the_last_airbender;
            var avatarImagePath = 'http://rishikarri.com:3030/images/avatars/'+avatarImageName

            // if the user did not upload a picture, use a default image
            if (avatarImageName === null){
                avatarImagePath = defaultUserImagePath;
            }


            return commentsArray.push(                
                <tr key={index}>
                    <td className='avatar-image-td'>
                        <img className='avatar-image' alt="Avatar" src={avatarImagePath} />
                    </td>
                    <td className="comment">
                      <p className='comment-username'>{comment.username}</p>
                      <p className="comment-text">{comment.comment}</p>
                    </td>
                    <td>
                        <p className="comment-date">{niceLookingDate}</p>
                        <p className="comment-date">{niceLookingTime}</p>
                    </td>

                </tr>
            )
        })
        return (            
                <table className="table table-striped comment-table">
                    <tbody>
                        {commentsArray}
                    </tbody>
                </table> 
        )

    }
}

function mapStateToProps(state) {
    return {
        posts: state.festivalDetail.comments,
        newComment: state.postedComment
    }
}

export default connect(mapStateToProps, null)(Comments);
