import React, { Component } from 'react';
import { form, Panel, Popover } from 'react-bootstrap';
import axios from 'axios';
import './Form.css';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            address: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
    }

    onChange(e) {
        e.preventDefault();
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit(e) {
        e.preventDefault();
        // get our form data out of state
        const {
            firstname,
            lastname,
            email,
            phonenumber,
            address,
        } = this.state;

        // console.log('@@@@@', firstname,
        //             lastname,
        //             email,
        //             phonenumber,
        //             address);

        axios.post('http://127.0.0.1:8000/contact/', { firstname, lastname, email, phonenumber, address })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/');
                window.location.reload();
            });
    }

    render() {
        const {
            firstname,
            lastname,
            email,
            phonenumber,
            address,
        } = this.state;

        return (
            <div className="Form-header">
                <Popover
                    id="popover-basic"
                    placement="left"
                    positionLeft={250}
                    positionTop={50}
                    className="popover-resize">
                    <Panel bsStyle="danger">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Contact Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <form onSubmit={this.onSubmit}>
                                <input type="text" placeholder="Enter First name" name="firstname" value={firstname} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="text" placeholder="Enter Last name" name="lastname" value={lastname} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="email" placeholder="Enter Email" name="email" value={email} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="text" placeholder="Enter Phone number" name="phonenumber" value={phonenumber} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="textarea" placeholder="Enter Address" name="address" value={address} onChange={this.onChange} className="form-control" />
                                <br />
                                <div>
                                    <span> <a href="/"><button type="button" value="cancel">Cancel</button></a> </span>
                                    <span> <button type="submit" value="Submit">Submit</button> </span>
                                </div>
                            </form>
                        </Panel.Body>
                    </Panel>
                </Popover>
            </div>
        );
    }
}

export default Form;
