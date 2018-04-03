import React, { Component } from 'react';
import {
    ScrollView,
    Button,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default  class ForumDetail extends Component {

    static navigationOptions = {
        title: 'vector-icons',
        headerBackTitle: 'back'
    };

    render() {
        const items = [];
        items.push({name: 'facebook', title: 'Entypo'});
        items.push({name: 'facebook-f', title: 'EvilIcons'});
        items.push({name: 'twitter', title: 'FontAwesome', bgColor: '#0366d6'});
        items.push({name: 'github', title: 'Foundation', bgColor: '#0366d6'});
        items.push({name: 'google-plus', title: 'Ionicons'});
        items.push({name: 'code-fork', title: 'MaterialCommunityIcons', color: '#000', bgColor: 'gray'});
        items.push({name: 'apple', title: 'MaterialIcons', color: '#000', bgColor: 'gray'});
        items.push({name: 'windows', title: 'Octicons'});
        items.push({name: 'android', title: 'SimpleLineIcons'});
        items.push({name: 'linux', title: 'Zocial'});
        return (
            <ScrollView>
                <Text style={styles.title}>1、按钮（跳转到图片库）</Text>
                {items.map((item, index) => {
                    return this._buttonIcon(item, index);
                })}

                <Text style={styles.title}>2、inline样式</Text>
                <Text style={{paddingHorizontal: 20}}>
                    传说中的inline<Icon name='android' color='#451234'/>
                    纯属测试<Icon name='apple'/>
                    呃呃呃
                </Text>

            </ScrollView>
        );
    }

    _buttonIcon(data, index) {
        if (!data.bgColor)
            data.bgColor = '#3b5998';
        if (!data.color)
            data.color = '#fff';
        return (
            <View key={index} style={styles.btnView}>
                <Icon.Button
                    name={data.name}
                    backgroundColor={data.bgColor}
                    color={data.color}
                    onPress={() => {
                        this.props.navigation.navigate('IconScreen', {name: data.title});
                    }}>
                    {data.title}
                </Icon.Button>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    btnView: {
        paddingVertical: 3,
        alignSelf: 'center'
    },
    title: {
        paddingLeft: 10,
        marginVertical: 10,
    }
});