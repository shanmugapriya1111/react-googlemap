import React, { Component } from 'react';
import './google-map.css';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 13,
            maptype: 'roadmap',
            locations: [],
        };
    }

    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 13.0827, lng: 80.2707 },
            zoom: 13,
            mapTypeId: 'roadmap',
        });
        const marker = new window.google.maps.Marker({
            map,
            position: { lat: 13.0827, lng: 80.2707 },
            draggable: true,


        });


        // initialize the autocomplete functionality using the #pac-input input box
        const inputNode = document.getElementById('pac-input');
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
        const autoComplete = new window.google.maps.places.Autocomplete(inputNode);


        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace();
            const location = place.geometry.location;

            this.setState({
                place_formatted: place.formatted_address,
                place_id: place.place_id,
                place_location: location.toString(),
            });

          // brings the selected place in view on the map
            map.fitBounds(place.geometry.viewport);
            map.setCenter(location);
            marker.setPlace({
                placeId: place.place_id,
                location,
            });
        });
    }


    attachSecretMessage(marker, i, locations) {
        const data = locations[i];
        const secretMessage = `${data.formatted_address}`;

        const infowindow = new window.google.maps.InfoWindow({
            content: secretMessage,
        });

        marker.addListener('click', () => {
            infowindow.open(marker.get('map'), marker);
        });
    }

    mapmarker(markeraddress) {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 13,

            center: { lat: 13.0827, lng: 80.2707 },
            mapTypeId: 'roadmap',
        });

        map.setTilt(45);
        if (markeraddress.address.currentaddress) {
            for (let i = 0; i < markeraddress.address.currentaddress.length; i += 1) {
                const data = markeraddress.address.currentaddress[i];
                // console.log(markeraddress.address.listDataFromChild[i].address);
                const marker = new window.google.maps.Marker({
                    position: { lat: data.geometry.viewport.f.b, lng: data.geometry.viewport.b.f },
                    map,
                    title: markeraddress.address.listDataFromChild[i].address,

                });

                this.attachSecretMessage(marker, i, markeraddress.address.currentaddress);
                map.fitBounds(data.geometry.viewport);
                map.setCenter(data.geometry.location);

                marker.setPlace({
                    placeId: data.place_id,
                    location: data.geometry.location,

                });
            }
        }
    }


    componentWillReceiveProps(nextprops) {
        this.mapmarker(nextprops);
        // const map = new window.google.maps.Map(document.getElementById('map'), {
        //     center: { lat: 13.0827, lng: 80.2707 },
        //     zoom: 15,
        //     mapTypeId: 'roadmap',
        // });
        // const marker = new window.google.maps.Marker({
        //     map,
        //     position: { lat: 13.0827, lng: 80.2707 },
        //     title: nextprops.address.listDataFromChild,
        //     draggable: true,

        // });
        //   // bring the selected place in view on the map
        // if (nextprops.address.currentaddress) {
        //     map.fitBounds(nextprops.address.currentaddress.geometry.viewport);
        //     map.setCenter(nextprops.address.currentaddress.geometry.location);

        //     marker.setPlace({
        //         placeId: nextprops.address.currentaddress.place_id,
        //         location: nextprops.address.currentaddress.geometry.location,
        //     });
        // }
    }

    render() {
        return (
            <div id="app">
                <div id="map" />
                <div id="pac-container">
                    <input id="pac-input" type="text" placeholder="Enter a location" />
                </div>
                <div id="state" />
            </div>
        );
    }
}


export default Map;
