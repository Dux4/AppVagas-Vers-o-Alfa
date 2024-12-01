import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, Content, OpenButton, Title, Data, Company, Status } from './styles';
import { Feather } from '@expo/vector-icons';

import { RootStackParamList } from '../../utils/Types';

interface VagaCardProps {
  id: number;
  title: string;
  dataCreated: string; // Certifique-se de que este campo seja uma string
  company: string;
  status: string; // Adicione o status como uma string
  onPress?: () => void;
}

type Props = NativeStackScreenProps<RootStackParamList>;

export default function VagaCard({ id, title, dataCreated, company, status, onPress }: VagaCardProps) {
  const navigation = useNavigation<Props['navigation']>();

  const handlePress = onPress || (() => navigation.navigate('Details', { id }));

  return (
    <Container onPress={handlePress}>
      <Content>
        <Title numberOfLines={1}>Titulo da Vaga? {title}</Title>
        <Company numberOfLines={1}>Empresa Contratante {company}</Company>
        <Status>Status da vaga: {status}</Status> {/* Exiba o status */}
      </Content>
      <OpenButton>
        <Feather name="chevron-right" size={24} color={'#3D6CB9'} />
      </OpenButton>
    </Container>
  );
}
