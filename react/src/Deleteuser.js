import React, { Component } from 'react';
import { Panel, Popover } from 'react-bootstrap';
import axios from 'axios';
import './Deleteuser.css';

class Deleteuser extends Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }


    componentDidMount() {
    }

    onDelete() {
        const path = this.props.location.pathname;
        const id1 = path.split('/');
        const id = Number(id1[2]);
        axios.delete(`http://127.0.0.1:8000/contact/${id}`).then((res) => {
            console.log(res);
            this.props.history.push('/');
            window.location.reload();
        });
    }

    render() {
        return (
            <Popover
                id="popover-basic"
                placement="center"
                positionLeft={260}
                positionTop={58}>
                <div>
                    <Panel bsStyle="danger">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Contact</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>Do you want to delete ?
                            <div className="deletebutton">
                                <span> <a href="/"><button type="button" value="cancel">Cancel</button></a> </span>
                                <span> <button type="submit" value="Submit" onClick={this.onDelete}>OK</button> </span>
                            </div>
                        </Panel.Body>
                    </Panel>
                </div>
            </Popover>

        );
    }
}

export default Deleteuser;
