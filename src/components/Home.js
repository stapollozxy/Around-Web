import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS} from '../constants';


const TabPane = Tabs.TabPane;
const operations= <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation : true,
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
    }
    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation:false, error: 'Your browser does not support geolocation!'});

    }
    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading..."/>
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
    }
}