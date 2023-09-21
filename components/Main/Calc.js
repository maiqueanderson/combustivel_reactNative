import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-paper";

import { bindActionCreators } from "redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUser } from "../../redux/actions";
import { app } from "../../database/firebaseConfig";
import { connect, useSelector } from "react-redux";

const Calc = ({ currentUser }) => {
  const [alcPrice, setAlcPrice] = React.useState("");
  const [gasPrice, setGasPrice] = React.useState("");

  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState('Insira o preço dos combustiveis');

  const data = useSelector((state) => state.userState.currentUser);

  useEffect(() => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setId(uid);
        setUser(currentUser);
      } else {
        fetchUserInfo();
        console.log("usuario não está logado");
      }
    });
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);


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

    } catch (error) {
      console.log('erro ao pegar o valor', error);
    }
  };

  return (
    <View style={styles.container}>
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
