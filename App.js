import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider } from 'react-redux';
import { legacy_createStore as createStore , applyMiddleware } from 'redux';
import rootReducers from './redux/reducers';
import thunk from 'redux-thunk';

import Main from './components/Main';
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import { app }  from './database/firebaseConfig';
import Calc from './components/Main/Calc';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducers, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);
  
  
  const LoggedIn = () => (
    
      

    <Provider store={store}>
  
    <NavigationContainer>
       <Main />
       </NavigationContainer>

    </Provider>

    
  )
  
  const Loading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Carregando...</Text>
    </View>
  );
  
  const LoggedOut = () => (
    <PaperProvider theme={theme}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Landing" 
          component={Landing} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  )

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <LoggedIn />;
  }

  return <LoggedOut />;

}

export default App;