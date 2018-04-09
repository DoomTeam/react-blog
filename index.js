import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'mobx-react/native'
import store from './moudle/store'
import App from './App';

class MainApp extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('react_blog', () => MainApp);
