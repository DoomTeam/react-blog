import React, { Component } from 'react';
import {Text,View} from 'react-native';

export default  class ForumDetail extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5',padding:15, justifyContent:'center',}}>
                <Text>帖子详情页</Text>
            </View>
        )
    }
}