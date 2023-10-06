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
    primary: "rgb(56, 107, 1)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(183, 244, 129)",
    onPrimaryContainer: "rgb(13, 32, 0)",
    secondary: "rgb(87, 98, 74)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(218, 231, 201)",
    onSecondaryContainer: "rgb(21, 30, 12)",
    tertiary: "rgb(56, 102, 100)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(187, 236, 233)",
    onTertiaryContainer: "rgb(0, 32, 31)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(253, 253, 245)",
    onBackground: "rgb(26, 28, 24)",
    surface: "rgb(253, 253, 245)",
    onSurface: "rgb(26, 28, 24)",
    surfaceVariant: "rgb(224, 228, 214)",
    onSurfaceVariant: "rgb(68, 72, 62)",
    outline: "rgb(116, 121, 109)",
    outlineVariant: "rgb(196, 200, 186)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 49, 44)",
    inverseOnSurface: "rgb(241, 241, 234)",
    inversePrimary: "rgb(156, 215, 105)",
    elevation: {
      level0: "transparent",
      level1: "rgb(243, 246, 233)",
      level2: "rgb(237, 241, 226)",
      level3: "rgb(231, 237, 218)",
      level4: "rgb(229, 236, 216)",
      level5: "rgb(225, 233, 211)"
    },
    surfaceDisabled: "rgba(26, 28, 24, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 24, 0.38)",
    backdrop: "rgba(45, 50, 40, 0.4)"
  }
  
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
  <PaperProvider theme={theme}>

    <NavigationContainer>
       <Main />
       </NavigationContainer>
  </PaperProvider>

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