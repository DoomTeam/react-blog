import Component, from 'react'

export default class CommendTips extends Component{
    static navigationOptions = ({navigation, props}) => {
        const params = navigation.state.params || {};
        return {
            title: params.title ? params.title : '',
            headerLeft: (<Icon transparent
                               onPress={() => {navigation.navigate('DrawerToggle');}}
                               name={"navicon"}
                               style={{color: '#fff',paddingLeft:15}} size={20}>
            </Icon>),

        }
    };
}