import React from "react";
import { Text } from "react-native";
import { Container, Title } from "./styles";

export default function Header(){
    return(
        <Container>
            <Title>
                Dev<Text style={{color:'#E52246'}}>Social</Text>
            </Title>
        </Container>
    )
}