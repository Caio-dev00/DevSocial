import React, {createContext, useState, useEffect} from "react";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext({});

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);



    useEffect(() => {
        async function loadStorage(){
            const storageUSer = await AsyncStorage.getItem('@devapp');

            if(storageUSer){
                setUser(JSON.parse(storageUSer));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, [])

    

    async function storageUser(data){
        await AsyncStorage.setItem('@devapp', JSON.stringify(data))
    }



    async function signUp(email, password, nome){
        setLoadingAuth(true);
        await auth().createUserWithEmailAndPassword(email, password)

        .then(async (value) => {

            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                createdAt: new Date(),
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                } 

                setUser(data);
                storageUser(data)
                setLoadingAuth(false);
            })

        })
        .catch((err) => {
            console.log(err);
            setLoadingAuth(false);
        })
    }


    async function signIn(email, password){
        setLoadingAuth(true);
        await auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            //console.log(userProfile.data().nome)

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);

        })

        .catch((err)=> {
            console.log(err);
            setLoadingAuth(false);
        })
    }

    async function signOut(){
        await auth().signOut();
        await AsyncStorage.clear()
        .then(() =>{
            setUser(null);
        })
    }

   
    return(
        <AuthContext.Provider 
        value={{
            signed: !!user,
            signUp, 
            signIn, 
            signOut, 
            user, 
            loadingAuth, 
            loading,
            setUser,
            storageUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}