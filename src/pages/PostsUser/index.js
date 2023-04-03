import React, {useLayoutEffect, useState, useCallback, useContext} from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/auth';

import PostsList from '../../components/PostsList';
import { Container, ListPosts } from './styles';




export default function PostUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(route.params?.title)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);



  useLayoutEffect(() =>{
    navigation.setOptions({
      title: title === '' ?  '' :title
    })
  }, [navigation, title])

  useFocusEffect(
    useCallback(()=> {

      let isActive = true;

        firestore().collection('posts')
        .where('userId', '==', route.params.userId)
        .orderBy('created', 'desc')
        .get()
        .then((snapshot) => {
          
          const postList = [];

          snapshot.docs.map( u => {
            postList.push({
              ...u.data(),
              id: u.id
            })
          })

          if(isActive){
            setPosts(postList);
            console.log(postList);
            setLoading(false);
          }

        })

      return () => {
        isActive = false; 
      }
    }, [])
)

 return (


   <Container>
    
    {loading ? (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={50} color="#E52246"/>
      </View>

    ) : (

      <ListPosts
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <PostsList data={item} userId={user.uid}/>}
    />
    )}

   </Container>
  );
}