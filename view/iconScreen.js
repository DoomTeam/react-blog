import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';
/**
 *由于文件没有使用module.exports方式，所以不能动态引入
 */
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

var Icon;
var glyphMap;


const size = 30;
const color = '#000';

export default class IconView extends Component{

    static navigationOptions = ({navigation}) => ({
        title: "icon",
    });

    render() {
        let type = this.props.navigation.state.params.name;

        if ('Entypo' == type) {
            Icon = EntypoIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/Entypo.json');
        } else if ('EvilIcons' == type) {
            Icon = EvilIconsIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/EvilIcons.json');
        } else if ('FontAwesome' == type) {
            Icon = FontAwesomeIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/FontAwesome.json');
        } else if ('Foundation' == type) {
            Icon = FoundationIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/Foundation.json');
        } else if ('Ionicons' == type) {
            Icon = IoniconsIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/Ionicons.json');
        } else if ('MaterialCommunityIcons' == type) {
            Icon = MaterialCommunityIconsIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json');
        } else if ('MaterialIcons' == type) {
            Icon = MaterialIconsIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/MaterialIcons.json');
        } else if ('Octicons' == type) {
            Icon = OcticonsIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/Octicons.json');
        } else if ('SimpleLineIcons' == type) {
            Icon = SimpleLineIconsIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/SimpleLineIcons.json');
        } else if ('Zocial' == type) {
            Icon = ZocialIcon;
            glyphMap = require('react-native-vector-icons/glyphmaps/Zocial.json');
        }

        let names = [];
        for (let name in glyphMap) {
            names.push(name);
        }

        return (
            <FlatList
                numColumns={4}
                data={names}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Icon name={item} size={size} color={color}/>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )}
            />
        );
    }

}

var styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 4,
        paddingVertical: 5,
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
    }
});

