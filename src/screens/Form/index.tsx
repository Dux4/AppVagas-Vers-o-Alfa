import React, { useState } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (name && email && password) {
      try {
        const user = { name, email, password };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('Usuário cadastrado:', user);
        navigation.navigate('Login');
      } catch (error) {
        console.error('Erro ao salvar o usuário:', error);
      }
    } else {
      console.log('Por favor, preencha todos os campos');
    }
  };

  return (
    <Wrapper>
      <Image source={BGTop} />
      <Container>
        <Form>
          <Logo />
          <Input
            label="Nome"
            placeholder="digite seu nome"
            value={name}
            onChangeText={setName}
          />
          <Input
            label="E-mail"
            placeholder="digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Senha"
            placeholder="digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title="Cadastrar"
            noSpacing={true}
            variant="primary"
            onPress={handleSignUp}
          />
          <TextContainer>
            <TextBlack>Já tem uma conta?</TextBlack>
            <TextLinkContainer onPress={() => navigation.navigate('Login')}>
              <TextLink>Faça seu login.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}
