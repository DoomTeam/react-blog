import React, {Component} from 'react';
import {Text,View} from 'react-native';

export default class SideMenu extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5',padding:15, justifyContent:'center',}}>
            <Text>抽屉菜单</Text>
            </View>
        )
    }
}