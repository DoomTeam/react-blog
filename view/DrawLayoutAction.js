import React, {} from 'react';
import {DrawerNavigator,} from 'react-navigation';

import StackNavigator from './Mainfest'

import SideMenu from './SideMenuScreen'

export default DrawerNavigator({
    MainListView: {
        screen: StackNavigator
    },

}, {
    initialRouteName: 'MainListView',
    contentComponent: SideMenu,
    drawerWidth: 300,
    // drawerPosition:'left'
})

