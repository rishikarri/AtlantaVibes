import React, {Component} from "react";
import {Link} from "react-router";
import dateformat from 'dateformat';




class FestivalCard extends Component {

    render() {
        var viewMoreDetailLinkTag = '/view-more/' + this.props.card.name;
        // encode link tag to avoid special characters and spaces
        viewMoreDetailLinkTag = encodeURI((viewMoreDetailLinkTag));
        // create a string that has the start and end date
        var startDate = this.props.card.start_date;
        var endDate = this.props.card.end_date;

        // we need a comment to tell us what the following lines will do
        // please see below make that date look nice
        var formattedStartDate = dateformat(startDate, 'mediumDate');
        var formattedEndDate = dateformat(endDate, 'mediumDate');
        var festivalDatesFormatted = formattedStartDate + ' - '+ formattedEndDate;

        // grab background image from the back-end
        var backgroundImagePath = `http://rishikarri.com:3030/images/${this.props.card.card_image}`;

        const backgroundImageObject = {
            backgroundImage: 'url('+ backgroundImagePath + ')',
            backgroundSize: 'cover',
            overflow: 'hidden'
        };

        var headliners = []
        headliners = this.props.card.headliners.split(", ")

        return (
            <div className="festival-wrapper">
                <div className="container">
                    <div className="row in-between-cards">
                        <div className="card-wrapper col-xs-10 col-xs-offset-1">
                            <div className="card-header" style={backgroundImageObject}>

                                <div className="card-title text-center">
                                    {this.props.card.name}
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
                                {/*within body, place the festival image on the
                                left and description on the right */}

                                <div className='card-rating text-center'>
                                  {this.props.card.rating}
                                </div>

                                <div className="card-description col-xs-12 col-md-6 text-center">
                                    {this.props.card.description}
                                </div>

                                <div className="col-md-6 text-center card-button-wrapper">
                                  <div className='col-xs-12'>
                                      <Link to={viewMoreDetailLinkTag}><button className="btn card-button">View More Details</button></Link>
                                  </div>
                                  <div className="col-xs-12">
                                      <a target="_blank" href={this.props.card.festival_url}><button className="btn card-button">Festival Website</button></a>
                                  </div>

                                </div>
                            </div>
                        {/*place in stars below both the image and the description to the left  */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FestivalCard
