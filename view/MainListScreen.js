import React, { Component } from 'react';
import {Text,View,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

//帖子列表页
export default class MainList extends Component{
    static navigationOptions = ({navigation, props}) => {
        const params = navigation.state.params || 'default';
        return {
            title: params.title ? params.title : '帖子推荐',
            headerLeft: (<Icon transparent
                               onPress={() => {navigation.navigate('DrawerToggle');}}
                               name={"navicon"}
                               style={{color: '#fff',paddingLeft:15}} size={20}>
            </Icon>),
        }
    };



    render(){
        // const params=this.props.navigation.state.params?this.props.navigation.state.params:''
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5',padding:15, justifyContent:'center',}}>
                <Text>主列表页</Text>

                <Icon.Button    //在图片后加文字
                    name="facebook"
                    backgroundColor="#3b5998"
                    onPress={()=>{this.props.navigation.navigate('Details')}} //点击该按钮后触发的方法
                >
                    Login with Facebook
                </Icon.Button>

            </View>
        )
    }
}
