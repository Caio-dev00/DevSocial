import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    padding-top: 14px;
    flex: 1;
    background-color: #353840;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #F1F1F1;
    margin: 10px;
    border-radius: 4px;
    padding: 5px 10px;
`;

export const Input = styled.TextInput`
    width: 90%;
    background-color: transparent;
    height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #121212;
`;

export const List = styled.FlatList`
    flex: 1;
`;