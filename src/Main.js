import React, {Component} from 'react'
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Main.css'
import MapView from './MapView';

class Main extends Component {
    constructor(props) {
        super()
        this.state = {
            latLong: {lat: 37.40599, lng: -122.078514},
            ipAddress: ""
        }
    }

    componentDidMount() {
        const ip = this.state.ipAddress
        const url = `https://geo.ipify.org/api/v1?apiKey=at_2vTG07BaiN6spBlwtk2x6Y374lJd2&ipAddress=${ip}`
        this.fetchApi(url, ip)
    }

    handleClick = () => {
        let ip = document.querySelector("#ip_input").value
        let url = `https://geo.ipify.org/api/v1?apiKey=at_2vTG07BaiN6spBlwtk2x6Y374lJd2&ipAddress=${ip}`
        this.fetchApi(url, ip)
        this.forceUpdate()
    }

    fetchApi(url, ip) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const l1 = data.location.lat
                const l2 = data.location.lng
                const obj = {lat: l1, lng: l2}
                if (l1 !== this.state.latLong.lat && l2 !== this.state.latLong.lng) {
                    this.setState({
                        latLong: obj,
                        ipAddress: data.ip,
                        location: data.location.region,
                        isp: data.isp,
                        timezone: `UTC ${data.location.timezone}`
                    })
                }
                console.log(data);
            })
    }


    render() {
        return (
            <div className="main_container">
                <div className="upper_box">
                    <h2 id="top">IP Address Tracker</h2>
                    <div className="search_container">
                        <input id="ip_input" type="text" placeholder="Search for any IP address or domain"></input>
                        <IconButton id="btn" onClick={this.handleClick}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </div> 
                </div>
                <div className="data_card">
                    <div className="data">
                        <p className="small">IP ADDRESS</p>
                        <p className="large">{this.state.ipAddress}</p>
                    </div>
                    <div className="data">
                        <p className="small">LOCATION</p>
                        <p className="large">{this.state.location}</p>
                    </div>
                    <div className="data">
                        <p className="small">TIMEZONE</p>
                        <p className="large">{this.state.timezone}</p>
                    </div>
                    <div className="data">
                        <p className="small">ISP</p>
                        <p className="large">{this.state.isp}</p>
                    </div>
                </div>
                <MapView {...this.state}/>
            </div>
        )
    }
}

export default Main
