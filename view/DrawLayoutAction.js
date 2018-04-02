import React, {} from 'react';
import {DrawerNavigator} from 'react-navigation';

import MainList from './MainListScreen';
import ForumDetail from "./InvitaDetailScreen";

import SideMenu from './SideMenuScreen'

export default DrawerNavigator({
    MainListView: {
        screen: MainList
    },
    ForumDetailView: {
        screen: ForumDetail
    },
}, {
    initialRouteName: 'MainListView',
    contentComponent: SideMenu,
    drawerWidth: 250,
    // drawerPosition:'left'
})