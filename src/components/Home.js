import React from 'react';
import { Tabs, Button } from 'antd';
import {GEO_OPTIONS} from '../constants';


const TabPane = Tabs.TabPane;
const operations= <Button>Extra Action</Button>;

export class Home extends React.Component {
    componentDidMount() {
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
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
    }
    onFailedLoadGeoLocation = () => {

    }
    render() {


        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">Tab 1</TabPane>
                <TabPane tab="Map"  key="2">Tab 2</TabPane>
            </Tabs>
        )
    }
}