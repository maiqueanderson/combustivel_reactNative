import React, { useEffect } from "react";
import { Card, Text, Divider } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetcData } from "../../redux/actions";

const Historic = () => {
  const dispatch = useDispatch();
  const currentData = useSelector((state) => state.dataState.abast);
  const isLoading = useSelector((state) => state.dataState.isLoading);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await dispatch(fetcData());
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    };

    fetchDataAsync();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Card>
          {isLoading ? (
            <Card.Title title="Carregando..." />
          ) : currentData ? (
            currentData.map((item) => (
              <>
                <Card.Title title={`${item.date.toDate()}`} />
                
                <Divider />
                    <Text style={styles.text} variant="bodyMedium">
                      Valor do Litro: R$ {item.valorLitro}
                    </Text>
                    
                    <Text style={styles.text} variant="bodyMedium">
                      Tipo de Combustível: {item.tipoCombustivel}
                    </Text>
                    <Text style={styles.text} variant="bodyMedium">
                      Valor Total abastecido: R$ {item.valorTotal}
                    </Text>
                    <Divider />
                
              </>
            ))
          ) : (
            <Card.Title title="Nenhum dado disponível." />
          )}
          ;
        </Card>
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
    padding: 20,
   
  },

  text: {
    
    padding: 10,
   
  },

});

export default connect(null)(Historic);
