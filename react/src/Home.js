import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            address: [],
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/contact')
            .then((res) => {
                const data = Object.assign({}, res.data);
                this.setState({ data });
            });
    }

    handleChange(e, obj) {
        const contactaddress = this.state.address;
        if (e.target.checked === true) {
            contactaddress.push(obj);
        } else if (e.target.checked === false) {
            const index = contactaddress.indexOf(obj.address);
            contactaddress.splice(index, 1);
        }
        this.setState({ address: contactaddress });
        this.props.callbackFromParent(contactaddress);
    }

    render() {
        const contactlist = this.state.data;

        const addressitem = Object.keys(contactlist).map(key => (
            <div>
                <span><input type="checkbox" id={contactlist[key].id} onChange={e => this.handleChange(e, contactlist[key])} /></span>
                <span><NavItem>{contactlist[key].address}</NavItem></span>
            </div>
            ));

        return (
            <div className="sidebar">
                <Navbar.Collapse>
                    <Nav>
                        { addressitem }
                    </Nav>
                </Navbar.Collapse>
            </div>

        );
    }
}

export default Home;
