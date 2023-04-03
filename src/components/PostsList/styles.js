import styled from "styled-components/native";

export const Container = styled.View`
    margin-top: 8px;
    margin: 8px 2%;
    background-color: #FFF;
    border-radius: 8px;
    box-shadow: 1px 1px 3px rgba(18,18,18, 0.4);
    elevation: 3;
    padding: 11px;
`;

export const Header = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
`;
export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 6px;
`;
export const Name = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;
export const ContentView = styled.View`

`;
export const Content = styled.Text`
    font-size: 15px;
    margin-bottom: 8px;
`;

export const Actions = styled.View`
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`;
export const LiekButton = styled.TouchableOpacity`
    flex-direction: row;
    width: 45px;
    align-items: center;
    justify-content: flex-start;
`;
export const Like = styled.Text`
    color: #E52246;
    padding-right: 6px;
`;
export const TimePost = styled.Text`
    color: #121212;
`;

