import React,{Component} from 'react'
import {Image,View,Text} from 'react-native'

class EmptyView extends Component{
    render(){
        return(
            <View style={{flex:1,height:this.props.height,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../img/no_data.png')} style={{height:100,width:100}}/>
                <Text>{this.props.emptyData}+{this.props.height}</Text>
            </View>
        )
    }
}
export default EmptyView;