import React, {useContext} from "react";
import { View, Text, ActivityIndicator } from "react-native";

import AuthRoutes from './auth.routes';
import AppRoutes from "./app.routes";

import { AuthContext } from "../contexts/auth";


export default function Routes(){
    const {signed, loading} = useContext(AuthContext);
    

    if(loading){
        return(
            <View style={{flex:1, justifyContent:'center', backgroundColor:'#36393f'}}>
                 <ActivityIndicator size={50} color="#E52246"/>
             </View>
        ) 
    }

    return (
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}