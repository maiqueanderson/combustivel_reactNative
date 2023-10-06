import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchUser } from '../redux/actions';

import Calc from '../components/Main/Calc'
import Resume from './Main/Resume';
import Abastecer from './Main/Abastecer';
import Historic from './Main/Historic';

const Tab = createBottomTabNavigator();
const NullComponent = () => null;

const Main = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator initialRouteName='Calc' backBehavior='initialRoute' >
      <Tab.Screen
        name="Calc"
        component={Calc}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='calculator' size={26} color={color} />
          )
        }}
      />


      <Tab.Screen
        name="Abastecer"
        component={Abastecer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='fuel' size={26} color={color} />
          )
        }}
      />

<Tab.Screen
        name="Historico"
        component={Historic}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='history' size={26} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchUser },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Main);