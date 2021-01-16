import React, {Component} from 'react'
import Leaflet from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import icon from './images/icon-location.svg';

const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    iconSize: [27, 40],
    popupAnchor: [0, -46]
});

const CenterView = ({ center }) => {
    const map = useMap()
    map.setView(center)
    return null
}


export default class MapView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            latLong: this.props.latLong,
        }   
    }

    static getDerivedStateFromProps(props, state) {
        return {latLong: props.latLong}
    }

    
    render() {
        const position = Object.values(this.state.latLong)
        return (
            <MapContainer 
                center={position}
                zoom={11}
                style={{ height: "70vh", width: "100%", zIndex: "-1" }}
                scrollWheelZoom={false}
                >
                    <CenterView center={position} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={DefaultIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    {console.log(this.state.latLong)}
            </MapContainer>
        )
    }
}


