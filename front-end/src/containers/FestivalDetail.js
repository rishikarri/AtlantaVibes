import React, {Component} from "react";
import dateformat from 'dateformat';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FestivalDetailAction from "../actions/FestivalDetailAction.js";
import RatingsModalAction from "../actions/RatingsModalAction.js";
import Comments from '../containers/Comments.js';
import PostComment from '../containers/PostComment.js';



class FestivalDetail extends Component {
    constructor(props) {
        super(props);
        this.handleRating = this.handleRating.bind(this);
    }

    // make an ajax call to grab the all festivals in order after ViewAll component is loaded
    componentDidMount(){
        // grab festival name
        var festivalName = this.props.params.festival;

        // send festival name to the back end in order to map all of the relevant information for this festival to props
        this.props.getFestivalDetail({
            festivalName: festivalName
        });


    }


    componentWillReceiveProps(nextProps) {
        // console.log('%%%%%%%%%%%%%%%%%%%%%')
        // console.log(this.props);
        // console.log(nextProps);
        // console.log('%%%%%%%%%%%%%%%%%%%%%')
        if (this.props.getRating !== nextProps.getRating){
            // we have a new rating!
            console.log('hopefully this soooud fire')
            this.props.getFestivalDetail("updateRating",nextProps.getRating.festivalRating);
            // this.props.festivalDetail.festival.rating = nextProps.getRating.festivalRating;

        }

        // this.setState({
        //     festivalRating: 36
        // })
        // this.forceUpdate();

    }


    handleRating() {
        // Send festival detail and open modal to the back end
        this.props.getRatingsModal({
            showModal: true,
            festivalDetail: this.props.festivalDetail.festival
        })

    }

    render() {

        if (this.props.festivalDetail === null) {
            return(
                <div>asdf</div>
            )
        } else {
            var backgroundImagePath = `http://rishikarri.com:3030/images/${this.props.festivalDetail.festival.card_image}`;

            // grab start and end date from redux and format nicely
            var startDate = this.props.festivalDetail.festival.start_date;
            var endDate = this.props.festivalDetail.festival.end_date;
            var formattedStartDate = dateformat(startDate, 'mediumDate');
            var formattedEndDate = dateformat(endDate, 'mediumDate');
            var festivalDatesFormatted = formattedStartDate + ' - '+ formattedEndDate;

            // grab headliners and split them up into a nice clean array

            var headliners = []
            headliners = this.props.festivalDetail.festival.headliners.split(", ")

            const backgroundImageObject = {
                backgroundImage: 'url('+ backgroundImagePath + ')',
                backgroundSize: 'cover',
                overflow: 'hidden'
            };

            return(
                <div className="festival-wrapper">
                    <div className="container">
                        <div className="row in-between-cards">
                            <div className="card-wrapper col-xs-10 col-xs-offset-1">
                                <div className="card-header" style={backgroundImageObject}>
                                    <div className="card-title text-center">
                                        {this.props.festivalDetail.festival.name}
                                    </div>

                                    <div className='card-date text-center'>
                                        {festivalDatesFormatted}
                                    </div>

                                    <div className="card-lineup text-center">
                                        <ul>
                                            <li>{headliners[0]}</li>
                                            <li>{headliners[1]}</li>
                                            <li>{headliners[2]}</li>
                                        </ul>
                                    </div>
                                </div>



                                <div className="card-body col-xs-12">
                                    {/*within body, place the festival image on teh left and description on the right */}
                                    {/*Rating is in a button div. When clicked modal will fire to rate.*/}
                                    <button
                                        className='card-rating col-xs-12 text-center'
                                        onClick={this.handleRating}>
                                        {this.props.festivalDetail.festival.rating}
                                    </button>
                                    <div className="click-me text-center">
                                      Rate Me
                                    </div>

                                    <div className="card-description col-xs-12  text-center">
                                        {this.props.festivalDetail.festival.description}
                                    </div>
                                </div>
                            {/*place in stars below both the image and the description to the left  */}




                                <div className='card-comment-body col-xs-12'>
                                    <PostComment festivalName={this.props.festivalDetail.festival.name} festivalId={this.props.festivalDetail.festival.id} />
                                    <Comments comments={this.props.festivalDetail.comments} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

function mapStateToProps(state){
    return{
        festivalDetail: state.festivalDetail,
        newComment: state.postedComment,
        getRating: state.ratings
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getFestivalDetail: FestivalDetailAction,
        getRatingsModal: RatingsModalAction
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(FestivalDetail);
