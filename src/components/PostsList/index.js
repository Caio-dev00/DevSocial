import React, { useState } from "react";
import { 
    Container,
    Name, 
    Header, 
    ContentView, 
    Avatar, 
    Content,
    Actions,
    LiekButton,
    Like,
    TimePost
} from "./styles";
import Icon from '@expo/vector-icons/AntDesign';
import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { useNavigation } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';


export default function ListsPosts({data, userId}){
    const [likePost, setLikePost] = useState(data?.likes);
    const navigation = useNavigation();

    async function handleLikePost(id, likes){
        const docId = `${userId}_${id}`;

        //Checar se o post ja foi curtido
        const doc = await firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists){
            //Quer dizer que já curtiu o post, então preciso remover o like
            await firestore().collection('posts')
            .doc(id).update({
                likes: likes -1
            })

            await firestore().collection('likes').doc(docId)
            .delete()
            .then(() => {
                setLikePost(likes - 1)
            })
            return;
        }

        //Precisamos dar o like no post
        await firestore().collection('likes')
        .doc(docId).set({
            postId: id,
            userId: userId
        })

        await firestore().collection('posts').doc(id).update({
            likes: likes + 1
        })
        .then(() => {
            setLikePost(likes + 1)
        })
        

    }

    function formatTimePost(){
        //console.log(new Date(data.created.seconds * 1000))
        const dataPost = new Date(data.created.seconds * 1000);

        return formatDistance(
            new Date(),
            dataPost,
            {
                locale: ptBR
            }
        )
    }

    return(
        <Container>

           <Header onPress={() => navigation.navigate('PostUser', {title: data.autor, userId: data.userId})}>
            {data.avatarUrl ? (
                <Avatar
                    source={{uri: data.avatarUrl}}
                />
            ) : (
                <Avatar
                    source={require("../../assets/avatar.png")}
                />
            )}
           
            <Name numberOfLines={1}>{data?.autor}</Name>
           </Header>

           <ContentView>
                <Content>{data?.content}</Content>
           </ContentView>

           <Actions>
                <LiekButton onPress={() => handleLikePost(data.id, likePost)}>
                   
                    <Like>{likePost === 0 ? '' : likePost}</Like>
                    <Icon
                        name={likePost === 0 ? 'hearto' : 'heart'}
                        size={20}
                        color="#E52246"
                    />
                </LiekButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
           </Actions>

        </Container>
    )
}