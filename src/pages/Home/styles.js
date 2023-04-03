import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #353840;
`;

export const ButtonArea = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #202225;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 5%;
    right: 6%;
    z-index: 999;
`;

export const PostList = styled.FlatList`
    flex: 1;
    background-color: #F1F1F1;
`;