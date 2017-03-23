import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    Form,
    FormGroup,
    FormControl,
    Button,
    Col,
    ControlLabel
} from 'react-bootstrap';

import registerAction from '../actions/RegisterAction.js';
import registerModalAction from '../actions/RegisterModalAction.js';

// bring in register message from root reducer

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
        this.state = {
          validation: null,
          registerLabel: "register-error-label-hide"

        }
    }

    componentWillReceiveProps(nextProps) {
       if (this.props.register !== nextProps.register) {
           if (nextProps.register.msg === "userExists") {
               console.log("User Exists Already")
               this.setState({
                   validation: "error",
                   registerLabel: "register-error-label-show"

               })
           } else if (nextProps.register.msg === "userInserted") {
               console.log("User Inserted");
               this.props.getModal({
                   showModal: false
               })
           }
       }
   }

    handleRegistrationSubmit(event) {
        event.preventDefault();
        var username = event.target[0].value;
        var email = event.target[1].value;
        var password = event.target[2].value;
        var repeatPassword = event.target[3].value;
        var avatarImage = event.target.elements.uploadAvatar.files[0];
        console.log(avatarImage);
        if (avatarImage === undefined) {
            avatarImage = `http://rishikarri.com:3030/images/avatars/default-user-image.jpg`;
        }

        if (password !== repeatPassword)  {
          this.setState({
            validation: "error",
            registerLabel: "register-error-label-show"
          });

      } else if (password.length === 0){
          this.setState({
              validation: "error",
              registerLabel: "register-error-label-show"
          });
      } else {
            this.props.registerAction({
                username: username,
                email: email,
                password: password,
                avatarImage: avatarImage
            });
        }
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleRegistrationSubmit}>
                <FormGroup controlId="formHorizontalName" validationState={this.state.validation}>
                    <Col smOffset={2} sm={8}>
                      <ControlLabel className={this.state.registerLabel}>Invalid Register Info</ControlLabel>
                        <FormControl type="text" placeholder="Full Name"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail" validationState={this.state.validation}>

                    <Col smOffset={2} sm={8}>
                        <FormControl type="email" placeholder="Email"/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword" validationState={this.state.validation}>

                    <Col smOffset={2} sm={8}>
                        <FormControl type="password" placeholder="Password"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" validationState={this.state.validation}>
                    <Col smOffset={2} sm={8}>
                        <FormControl type="password" placeholder="Repeat password"/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="uploadAvatar">
                    <Col smOffset={2} sm={8}>
                        <label className="register-label">Upload a picture (optional)</label>
                        <FormControl type="file" placeholder="Select an image"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={8}>
                        <Button className="register-button" bsStyle="warning" bsSize="small" type="submit">
                            Register
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {register: state.register}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        registerAction: registerAction,
        getModal: registerModalAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
