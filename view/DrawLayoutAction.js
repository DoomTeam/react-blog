import React, {} from 'react';
import {DrawerNavigator,} from 'react-navigation';

import StackNavigator from './Mainfest'

import SideMenu from './SideMenuScreen'
import ForumDetailStack from './TopicListScreen'

export default DrawerNavigator({
    MainListView: {
        screen: StackNavigator
    },
    TopicScreen: {screen: ForumDetailStack},
}, {
    initialRouteName: 'TopicScreen',
    contentComponent: SideMenu,
    drawerWidth: 300,
    // drawerPosition:'left'
})

