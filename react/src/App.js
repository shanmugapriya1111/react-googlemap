import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import './App.css';
import Form from './Form';
import Home from './Home';
import Deleteuser from './Deleteuser';
import Map from './google-map';
import Edituser from './Edituser';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDataFromChild: [],
            currentaddress: [],
            contactid: 0,
        };
    }

    componentDidMount() {
    }

    getlatlong(address) {
        // this.state.currentaddress = [];
        const geocoder = new window.google.maps.Geocoder();
        const curaddress = this.state.currentaddress;
        if (geocoder) {
            geocoder.geocode({
                address,
            }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    curaddress.push(results[0]);
                    this.setState({ currentaddress: curaddress });
                }
            });
        }
    }

    myCallback = (dataFromChild) => {
        this.setState({ listDataFromChild: dataFromChild });
        this.state.currentaddress = [];
        if (dataFromChild.length !== 0) {
            for (let i = 0; i < dataFromChild.length; i += 1) {
                const newadd = dataFromChild[i];
                this.getlatlong(newadd.address);
                this.setState({
                    contactid: newadd.id,
                });
            }
        }
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <div className="App-header">

                        <NavLink to="/form"><Glyphicon glyph="plus" className="my-tool-tip" data-toggle="tooltip" data-placement="left" title="Add" /></NavLink>
                        <NavLink to={`/edit/${this.state.contactid}`}><Glyphicon glyph="pencil" className="my-tool-tip" data-toggle="tooltip" data-placement="left" title="Edit" /></NavLink>
                        <NavLink to={`/delete/${this.state.contactid}`}><Glyphicon glyph="remove" className="my-tool-tip" data-toggle="tooltip" data-placement="left" title="Delete" /></NavLink>
                        <h2 className="App-intro">Visual Contacts</h2>
                    </div>
                    <div className="rowC">
                        <Home callbackFromParent={this.myCallback} />
                        <div style={{ width: '100%', height: '600px' }}>
                            <Map address={this.state} />
                        </div>
                    </div>
                    <div className="content">
                        <Route path="/form" component={Form} />
                        <Route path="/delete" component={Deleteuser} />
                        <Route path="/edit" component={Edituser} />
                        <Route path="/home" component={Home} />
                        <Route path="/google-map" component={Map} />
                    </div>
                </div>
            </HashRouter>
        );
    }

}

export default App;
