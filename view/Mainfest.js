import {Platform} from "react-native";
import {StackNavigator} from 'react-navigation';

import MainList from "./MainListScreen";
import ForumDetail from "./InvitaDetailScreen";
import IconView from "./iconScreen";


export default StackNavigator({
        List: {screen: MainList,title:'列表'},
        Details: {screen: ForumDetail,title:'详情'},
        IconScreen:{screen:IconView,title:'icon'},
    },
    {
        initialRouteName: 'List',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#32CD32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerLockMode: Platform.OS === 'ios' ? 'locked-closed' : 'unlocked'
        },
    }
);