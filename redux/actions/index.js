import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { app, db } from "../../database/firebaseConfig";
import { USER_STATE_CHANGE } from "../constants";

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
