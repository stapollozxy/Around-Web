import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import $ from 'jquery';
import {GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY} from '../constants';


const TabPane = Tabs.TabPane;
const operations= <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation : true,
        loadingPosts: false,
        error: '',
    }

    componentDidMount() {
        this.setState({loadingGeoLocation:true});
        this.getGeoLocation();
    }


    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
            this.setState({ error: 'Your browser does not support geolocation!'});
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({loadingGeoLocation:false, error: ''});
        const { latitude: lat, longitude: lon } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({ lat: lat, lon: lon }));
        this.loadNearbyPosts();
    }

    loadNearbyPosts = () => {
        //const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        const lat = 37.7915953;
        const lon = -122.3937977;
        this.setState({ loadingPosts: true, error: '' });
        return $.ajax({
            // url format: root/search?lat=&lon=&range=20
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then( (response) => {
                this.setState({ loadingPosts:true, error: '' });
                console.log(response);
            }, (error) => {
                this.setState({ loadingPosts:true, error: '' });
                console.log(error);
            }

        ).catch();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation:false, error: 'Your browser does not support geolocation!'});

    }
    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading..."/>
        } else if (this.state.loadingPosts) {
            return <Spin tip="Loading posts ..."/>
        }
    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map"  key="2">Tab 2</TabPane>
            </Tabs>
        )
    };
}