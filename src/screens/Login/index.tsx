import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthContext } from '../../../src/contexts/AuthContext';

export default function Login({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const success = await signIn(email, password);
      if (success) {
        navigation.navigate('VagasList'); // Navega para a tela de listagem de vagas após o login
      } else {
        alert('Credenciais inválidas!');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao fazer login. Tente novamente!');
    }
  };

  return (
    <Wrapper>
      <Image source={BGTop} />
      <Container>
        <Form>
          <Logo />
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
            title="Entrar"
            noSpacing={true}
            variant="primary"
            onPress={handleLogin}
          />
          <TextContainer>
            <TextBlack>Não tem uma conta?</TextBlack>
            <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
              <TextLink>Crie agora mesmo.</TextLink>
            </TextLinkContainer>
          </TextContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}
