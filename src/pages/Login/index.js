import React, {useState, useContext} from 'react';
import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpButtonText } from './styles';
import { ActivityIndicator, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {
  const [login, setLogin] = useState(true)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp, signIn, loadingAuth} = useContext(AuthContext);


  function toggleLogin(){
    setLogin(!login);
    setNome('');
    setEmail('');
    setPassword('');
  }

  async function handleSignIn(){

    if(email === '' || password === ''){
      alert('Preencha todos os Campos');
      return;
    }

    await signIn(email, password);

    

  }

  async function handleSignUp(){

    if(email === '' || password === '' || nome === ''){
      alert('Preencha todos os Campos para cadastrar');
      return;
    }

    await signUp(email, password, nome)

  }

  if(login){
    return (
      <Container>
   
           <TitleAnimated animation="flipInY">
             Dev<Text style={{color:'#E52246'}}>Social</Text>
           </TitleAnimated>
   
           <Input
             placeholder="Seu email"
             value={email}
             onChangeText={(text) => setEmail(text)}
           />
   
           <Input
             placeholder="Sua senha"
             secureTextEntry={true}
             value={password}
             onChangeText={(text) => setPassword(text)}
           />

   
           <Button onPress={handleSignIn}>
              {loadingAuth ? (
                <ActivityIndicator size={20} color="#FFF"/>
              ) : (
                <ButtonText>Acessar</ButtonText>
              )} 
           </Button>

   
           <SignUpButton onPress={toggleLogin}>
             <SignUpButtonText>Não possuo uma conta!</SignUpButtonText>
           </SignUpButton>
      </Container>
     );
  }

 return (
   <Container>

        <TitleAnimated animation="flipInX">
          Dev<Text style={{color:'#E52246'}}>Social</Text>
        </TitleAnimated>

        <Input
          placeholder="Seu nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <Input
          placeholder="Seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="Sua senha"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF"/>
          ) : (
            <ButtonText>Cadastrar</ButtonText>
          )}
        
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpButtonText>Já possuo uma conta!</SignUpButtonText>
        </SignUpButton>
   </Container>
  );
}