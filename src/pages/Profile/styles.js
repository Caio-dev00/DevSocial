import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #353840;
`;

export const Name = styled.Text`
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 28px;
    font-weight: bold;
    color: white;
`;

export const Email = styled.Text`
    color: #FFF;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    font-size: 18px;
    font-style: italic;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 10px;
    background-color: ${props => props.bg};
    width: 80%;
    height: 50px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    color: ${props => props.color};
`;

export const UploadLoadButton = styled.TouchableOpacity`
    margin-top: 20%;
    background-color: #FFF;
    width: 165px;
    height: 165px;
    border-radius: 90px;
    justify-content: center;
    align-items: center;
    z-index: 8;
`;

export const UploadText = styled.Text`
    font-size: 55px;
    position: absolute;
    color: #E52246;
    opacity: 0.5;
    z-index: 99;
`;

export const Avatar = styled.Image`
    width: 160px;
    height: 160px;
    border-radius: 80px;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
    width: 100%;
    height: 70%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    left: 15px;
    flex-direction: row;
    align-items: center;
`;

export const Input = styled.TextInput`
    background-color: #DDD;
    width: 80%;
    border-radius: 4px;
    padding: 10px;
    font-size: 17px;
    text-align: center;
`;