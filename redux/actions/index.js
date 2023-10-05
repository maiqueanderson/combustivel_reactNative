import { getAuth } from "firebase/auth";

import { doc, getDoc, collection, query, getDocs, where } from "firebase/firestore";
import { app, db } from "../../database/firebaseConfig";
import { USER_STATE_CHANGE, DATA_USER_CHANGE } from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    const auth = getAuth(app);

    if (auth.currentUser) {
      const udi = auth.currentUser.uid;
      const docRef = doc(db, 'users', udi);
      
      getDoc(docRef).then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          console.log('data', data);

          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: { ...data, udi }
          });
        } else {
          console.log('Action Fetch User: Usuário não existe!');
        }
      });
    } else {
      console.log('Action Fetch User: Usuário não autenticado');
    }
  };
};


export const fetcData = () => {
  return async (dispatch) => {
    const auth = getAuth(app);
    if (!auth.currentUser) {
      console.log('Action fetcData: Usuário não autenticado');
      return;
    }

    const uid = auth.currentUser.uid;

    const abastRef = collection(db, "abastecer");
    const queryAbast = query(abastRef, where("uid", "==", uid));

    try {
      const querySnapshot = await getDocs(queryAbast);

      const abast = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        console.log(data)
        return { id, ...data };
      });

      dispatch({
        type: DATA_USER_CHANGE,
        abast, });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
};

