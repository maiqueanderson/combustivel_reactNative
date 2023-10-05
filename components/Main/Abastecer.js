import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { RadioButton, Text } from 'react-native-paper';


const Abastecer = () => {
  const [valorTotal, setValorTotal] = useState('');
  const [valorLitro, setValorLitro] = useState('');

  const [value, setValue] = useState('gasolina');


  const handleValorTotal = (text) => {
    setValorTotal(text);
  };

  const handleValorLitro = (text) => {
    setValorLitro(text);
  };

  const handleSaveToFirebase = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error('Nenhum usuário logado');
        return;
      }

      const uid = user.uid;

      const collectionRef = collection(db, 'abastecer'); // Coleção onde os documentos serão criados
      await addDoc(collectionRef, {
        uid,
        valorTotal: valorTotal,
        valorLitro: valorLitro,
        tipoCombustivel: value,
        date: new Date(), 
      });

      console.log('Valor salvo com sucesso no Firestore!');
    } catch (error) {
      console.error('Erro ao salvar no Firestore:', error);
    }
  };

  return (
    <View style={styles.container}>
    <Text>Valor Total abastecido</Text>
      <TextInput
        value={valorTotal}
        onChangeText={handleValorTotal}
        placeholder="Digite o valor total abastecido"
        style={styles.input}
      />
<Text>Valor do litro do combustivel</Text>
<TextInput
        value={valorLitro}
        onChangeText={handleValorLitro}
        placeholder="Digite o valor do litro"
        style={styles.input}
      />
      <Text>Tipo de combustivel</Text>
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
      <RadioButton.Item label="Gasolina" value="gasolina" />
      <RadioButton.Item label="Alcool" value="alcool" />
    </RadioButton.Group>

      <Button title="Salvar no Firebase" onPress={handleSaveToFirebase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default Abastecer;
