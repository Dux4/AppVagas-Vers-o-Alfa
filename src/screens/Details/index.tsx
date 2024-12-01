import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { Linking } from 'react-native'; // Importar Linking para abrir URLs
import { Wrapper, Container, Header, HeaderButtonContainer, ButtonIcon, ButtonText, ContentContainer, Title, Description } from './styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const [vaga, setVaga] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const response = await axios.get(`http://26.161.237.227:3000/vagas/${id}`); // Certifique-se de que o endpoint está correto
        setVaga(response.data);
      } catch (error) {
        console.error("Erro ao buscar vaga: ", error);
        setError('Erro ao carregar a descrição da vaga. Tente novamente mais tarde.');
      }
    };

    fetchVaga();
  }, [id]);

  const handleContact = () => {
    const phoneNumber = '1234567890'; // Substitua pelo número do WhatsApp de contato
    const message = `Olá, estou interessado na vaga ${vaga.titulo} anunciada.`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch((err) => console.error("Erro ao abrir o WhatsApp:", err));
  };

  return (
    <Wrapper>
      <Header>
        <HeaderButtonContainer onPress={() => navigation.goBack()}>
          <ButtonIcon>
            <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
          </ButtonIcon>
          <ButtonText>Voltar</ButtonText>
        </HeaderButtonContainer>
        <Logo />
      </Header>

      <Container>
        <ContentContainer>
          <Title>Detalhes da Vaga {id}</Title>
          {error ? (
            <Description>{error}</Description>
          ) : (
            <Description>{vaga ? vaga.descricao : 'Carregando descrição...'}</Description>
          )}
        </ContentContainer>

        {vaga && vaga.status === 'aberta' && (
          <Button
            title="Entrar em contato pelo whatsapp"
            noSpacing={true}
            variant='primary'
            onPress={handleContact} // Adicione a função de contato ao botão
          />
        )}
      </Container>
    </Wrapper>
  );
}
