import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Input, Button, ButtonText } from './styles';

import { AuthContext } from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


export default function NewPost() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [post, setPost] = useState("");

  useLayoutEffect(() => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      )
    })

  }, [navigation, post])


  async function handlePost(){
    if(post === ''){
       alert('Seu post não tem conteudo invalido!');
       return;
    }

    let avatarUrl = null;
  
    try{

      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;

    }catch(err){
      avatarUrl = null;
    }

    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      autor: user.nome,
      userId: user.uid,
      likes: 0,
      avatarUrl,
    })
    .then(() => {
      setPost('')
      console.log('Post criado com sucesso')
    })
    .catch((err) => {
      console.log("ERRO AO CRIAR POST", err);
    })

    navigation.goBack();

  }

 return (
   <Container>
       <Input
        placeholder="O que está pensando?"
        value={post}
        onChangeText={(text) => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#DDD"
        maxLength={300}
       />
   </Container>
  );
}