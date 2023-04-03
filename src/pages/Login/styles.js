import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #363636;
`;

export const Title = styled.Text`
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
`;

export const Input = styled.TextInput`
    width: 90%;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
    width: 65%;
    background-color: #E52246;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5px;
`;

export const ButtonText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #fff;
`;

export const SignUpButton = styled.TouchableOpacity`
    margin-top: 5px;
`;

export const SignUpButtonText = styled.Text`
    color: #fff;
`;

