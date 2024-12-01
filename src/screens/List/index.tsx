import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import axios from 'axios';
import { Wrapper, Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import BottomMenu from '../../components/BottomMenu/BottomMenu'; // Importar o componente de menu inferior

export default function List() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await axios.get('http://26.161.237.227:3000/vagas'); // Substitua pelo seu IP
        console.log(response.data); // Verifique se 'status' está presente nos dados retornados
        setVagas(response.data);
      } catch (error) {
        console.error("Erro ao buscar vagas: ", error);
      }
    };

    fetchVagas();
  }, []);

  return (
    <Wrapper>
      <Image source={BGTop} style={{ maxHeight: 86 }} />
      <Container>
        <Logo />
        <TextVagas>{vagas.length} vagas encontradas!</TextVagas> {/* Verifique o TextVagas */}
        <ListContainer>
          <FlatList
            data={vagas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <VagaCard
                id={item.id}
                title={item.titulo}
                dataCreated={item.data_cadastro}
                company={item.empresa}
                status={item.status} // Adicione o status aqui
              />
            )}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={() => (
              <View>
                <Text>Não há vagas disponíveis no momento.</Text> {/* Verifique o Text aqui */}
              </View>
            )}
          />
        </ListContainer>
      </Container>
      <BottomMenu /> {/* Adicionar o menu inferior aqui */}
    </Wrapper>
  );
}
