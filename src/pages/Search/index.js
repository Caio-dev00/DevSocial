import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Container, AreaInput, Input, List } from './styles';
import firestore from '@react-native-firebase/firestore';
import Feather from '@expo/vector-icons/Feather';

import SearchList from '../../components/SearchList';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(input === '' || input === undefined){
      setUsers([]);
      return;
    }

    const subscriber = firestore().collection('users')
    .where('nome', '>=', input)
    .where('nome', '<=', input + "\uf8ff")
    .onSnapshot(snapshot => {

      const listUsers = [];

      snapshot.forEach(doc => {
        listUsers.push({
          ...doc.data(),
          id: doc.id,
        })
      })

      //console.log('LISTA DE USERS');
      //console.log(listUsers);

      setUsers(listUsers);

    })


    return() => subscriber();


  }, [input])

 return (
   <Container>
        <AreaInput>
          <Feather
            name="search"
            size={20}
            color="#E52246"
          />

          <Input
            value={input}
            placeholder="Procurando alguem?"
            onChangeText={ (text) => setInput(text)}
          />
        </AreaInput>

        <List
          data={users}
          renderItem={({item}) => <SearchList data={item} />}
        />
   </Container>
  );
}