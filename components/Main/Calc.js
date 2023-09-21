import React, { useEffect, useState } from 'react';
import {  Card } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

import { bindActionCreators } from 'redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUser} from '../../redux/actions';
import { doc, collection, query, getDocs, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { app, db } from '../../database/firebaseConfig';
import { connect, useSelector } from 'react-redux';

import { getDatabase } from "firebase/database";


const Calc = ({  currentUser }) => {



    const [id, setId] = useState(null);
    const [user, setUser] = useState(null);

    const data = useSelector(state => state.userState.currentUser);


    
    useEffect(() => {
        const auth = getAuth(app);
        
        
        onAuthStateChanged(auth, (user) => {

          if (user) {

            const uid = user.uid;
            setId(uid);
            setUser(currentUser);


          } else {
            fetchUserInfo()
            console.log('usuario não está logado')
          }
          
        });
      }, []);
   

  useEffect(() => {
    fetchUser();
  }, []);

console.log(id, data);


  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Card>
          <Card.Title
            title={data?.name}
            subtitle={data?.car}
            
          />
        </Card>
      </View>
    </View>
   )


  
}


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
  })
  

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchUser },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Calc);
