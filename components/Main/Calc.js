import React, { useState } from "react";
import { Card } from "react-native-paper";
import { View, StyleSheet, Button } from "react-native";
import { TextInput, Dialog, Portal, Text, PaperProvider, useTheme } from "react-native-paper";

import { bindActionCreators } from "redux";

import { fetchUser } from "../../redux/actions";

import { connect, useSelector } from "react-redux";



const Calc = () => {
  const [alcPrice, setAlcPrice] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [visible, setVisible] = useState(false);

  const theme = useTheme();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [result, setResult] = useState('Insira o preço dos combustiveis');

  const data = useSelector((state) => state.userState.currentUser);

  const handleClick = async () => {
    try {
      const alc = parseFloat(alcPrice.replace(',', '.'));
      const gas = parseFloat(gasPrice.replace(',', '.'));
      
      const calcAlc = alc / data?.alc;
      const calcGas = gas / data?.gas;

      if(calcAlc < calcGas){
        setResult('É melhor abastecer com Alcool')
      } else{
        setResult('É melhor abastecer com Gasolina')
      }

      console.log(calcAlc , calcGas);
     showDialog();

    } catch (error) {
      console.log('erro ao pegar o valor', error);
    }
  };

  return (
    <View >
      <View style={styles.info}>
        <Card>
          <Card.Title title={data?.name} subtitle={data?.car} />
        </Card>
      </View>

      <View style={styles.info}>
        <TextInput
          label="Preço do Alcool"
          value={alcPrice}
          inputMode="decimal"
          onChangeText={(alcPrice) => setAlcPrice(alcPrice)}
        />
      </View>

      <View style={styles.info}>
        <TextInput
          label="Preço da Gasolina"
          value={gasPrice}
          inputMode="decimal"
          onChangeText={(gasPrice) => setGasPrice(gasPrice)}
        />
      </View>

      <Button title="Calcular" onPress={handleClick} />

      <View style={styles.result}>
       {result}
      </View>

      <PaperProvider >
      <View>
        <Portal>
          <Dialog style={{ backgroundColor: theme.colors.background }} visible={visible} onDismiss={hideDialog} >
            <Dialog.Title>Resultado</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{result}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Text onPress={hideDialog}>Ok</Text>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>

    </View>

    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    margin: 20,
  },
  gallery: {
    flex: 1,
  },
  images: {
    flex: 1 / 3,
    height: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },

  result: {
    margin: 20,
    alignItems: "center",
    fontSize: 20
  }
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(null, mapDispatchToProps)(Calc);
