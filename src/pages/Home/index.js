import React, {useState, useContext, useCallback} from 'react';
import { Container, ButtonArea, PostList} from './styles';
import Icon from '@expo/vector-icons/AntDesign';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, ActivityIndicator, View } from 'react-native';
import {AuthContext} from '../../contexts/auth';

import firestore from '@react-native-firebase/firestore';

import Header from '../../components/Header';
import ListsPosts from '../../components/PostsList';

export default function Home() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);


  //Buscar Posts no banco de dados!
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts(){
        firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
        .then((snapshot) => {

          if(isActive){

            setPosts([]);
            const postList = [];

            snapshot.docs.map( u => {
              postList.push({
                ...u.data(),
                id: u.id,
              })
            })

            setEmptyList(!!snapshot.empty)
            setPosts(postList);
            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
            setLoading(false);
          }

        })
      } 

      fetchPosts();

      return () => {
      isActive = false;
      }

    }, [])
  )

  //BUscar mais posts quando der Refresh pra cima!
  async function handleRefreshPosts(){
    setLoadingRefresh(true);
    
    firestore().collection('posts').orderBy('created', 'desc').limit(5).get()
    .then((snapshot) => {

    
        setPosts([]);
        const postList = [];

        snapshot.docs.map( u => {
          postList.push({
            ...u.data(),
            id: u.id,
          })
        })

        setEmptyList(false)
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
    
    })

    setLoadingRefresh(false);

  }

  //Buscar mais posts ao chegar no final da lista
  async function getListPosts(){
    if(emptyList){ 
      //se buscou toda a lista tiramos o loading
      setLoading(false);
      return null;
    }

    if(loading) return;

    firestore().collection('posts').orderBy('created', 'desc').limit(5).startAfter(lastItem).get()
    .then((snapshot) => {
      const postList = [];

      snapshot.docs.map( u => {
        postList.push({
          ...u.data(),
          id: u.id,
        })
      })

      setEmptyList(!!snapshot.empty)
      setLastItem(snapshot.docs[snapshot.docs.length -1]);
      setPosts(oldPosts => [...oldPosts, ...postList]);
      setLoading(false);

    })


  }

 return (
   <Container>

        <Header/>

        {loading ? (
          <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <ActivityIndicator size={50} color="#E52246"/>
          </View>
        ): (
          <PostList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => (
          <ListsPosts
            data={item}
            userId={user?.uid}
        
          />
          
          )}

          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}
          
          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.1}
        />
        )}

      

        <ButtonArea 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}
        >
          <Icon name='form' size={20} color="#FFF"/>
        </ButtonArea>
   </Container>
  );
}