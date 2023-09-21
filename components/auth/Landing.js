import * as React from 'react';
import { View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper'


const Landing = ({ navigation }) => (

  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{ marginBottom: '1rem'}}>Controle de Combustivel</Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Register')}>
      <Text style={styles.text}>Criar Conta</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Login')}>
      <Text style={styles.text}>Entrar</Text>
    </TouchableOpacity>

    
    

  </View>
);

export default Landing;

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontWeight: 600,
    textTransform: 'uppercase'

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: '1rem'
  },
});