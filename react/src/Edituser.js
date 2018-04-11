import React, { Component } from 'react';
import { form, Panel, Popover } from 'react-bootstrap';
import axios from 'axios';
import './Edituser.css';

class Edituser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            address: '',
            contactid: '',
        };
        this.editFormvalue();
        this.onChange = this.onChange.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }

    componentDidMount() {
    }

    editFormvalue() {
        console.log('$$$$');
        const path = this.props.location.pathname;
        const id1 = path.split('/');
        this.state.contactid = Number(id1[2]);
        console.log(this.state.contactid);
        axios.get(`http://127.0.0.1:8000/contact/${this.state.contactid}`).then((res) => {
            console.log(res.data.id);
            this.setState({ firstname: res.data.firstname,
                lastname: res.data.lastname,
                email: res.data.email,
                phonenumber: res.data.phonenumber,
                address: res.data.address,
            });
        });
    }

    onChange(e) {
        e.preventDefault();
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onUpdateSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const {
            firstname,
            lastname,
            email,
            phonenumber,
            address,
        } = this.state;

        // get our form data out of state

        axios.put(`http://127.0.0.1:8000/contact/${this.state.contactid}/`, { firstname, lastname, email, phonenumber, address })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                this.props.history.push('/');
                window.location.reload();
            });
    }

    render() {
        return (
            <div className="Form-header">
                <Popover
                    id="popover-basic"
                    placement="left"
                    positionLeft={200}
                    positionTop={50}
                    className="popover-resize">
                    <Panel bsStyle="danger">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Contact Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <form onSubmit={this.onUpdateSubmit}>
                                <input type="text" placeholder="Enter First name" name="firstname" value={this.state.firstname} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="text" placeholder="Enter Last name" name="lastname" value={this.state.lastname} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="text" placeholder="Enter Phone number" name="phonenumber" value={this.state.phonenumber} onChange={this.onChange} className="form-control" />
                                <br />
                                <input type="textarea" placeholder="Enter Address" name="address" value={this.state.address} onChange={this.onChange} className="form-control" />
                                <br />
                                <div>
                                    <span> <a href="/"><button type="button" value="cancel">Cancel</button></a> </span>
                                    <span> <button type="submit" value="Submit">Save</button> </span>
                                </div>
                            </form>
                        </Panel.Body>
                    </Panel>
                </Popover>
            </div>
        );
    }
}

export default Edituser;
