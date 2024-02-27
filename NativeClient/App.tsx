import React from 'react';

import LoginPage from './Scenes/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login Page" component={LoginPage} />
        {/* <Stack.Screen name="Success" /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
