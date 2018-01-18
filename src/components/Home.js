import React from 'react';
import { Tabs, Button } from 'antd';



const TabPane = Tabs.TabPane;
const operations= <Button>Extra Action</Button>;

export class Home extends React.Component {
    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">Tab 1</TabPane>
                <TabPane tab="Map" disabled key="2">Tab 2</TabPane>
            </Tabs>
        )
    }
}