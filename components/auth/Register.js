import React, { useState } from 'react';
import {View , Button} from 'react-native';
import {TextInput} from 'react-native-paper'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

import { app, db }  from '../../database/firebaseConfig';

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [car, setCar] = useState();
  const [gas, setGas] = useState();
  const [alc, setAlc] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    const auth = getAuth(app);
    try {
      const dataUser = await createUserWithEmailAndPassword(auth, email, password)
      if (dataUser) {
        try {
          const usersRef = collection(db, "users")
          await setDoc(doc(usersRef, auth.currentUser.uid), {
            name,
            email,
            car,
            gas,
            alc,
          })
        } catch (err) {
          console.log('errDoc: ', err);
        }
      }
    } catch (err) {
      console.log('errUser: ', err)
    }
  };
  
  return (
    <View>
      <TextInput placeholder='Nome' onChangeText={setName} />
      <TextInput placeholder='E-mail' onChangeText={setEmail} />
      <TextInput placeholder='Carro' onChangeText={setCar} />
      <TextInput placeholder='Consumo Gasolina' onChangeText={setGas} />
      <TextInput placeholder='Consumo Alcool' onChangeText={setAlc} />
      
      <TextInput
        placeholder='Password'
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  )
};

export default Register;