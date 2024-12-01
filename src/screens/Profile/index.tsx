import React, { useState, useEffect, useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    setName(user.name);
                    setEmail(user.email);
                    setPassword(user.password);
                }
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
            }
        };

        loadUserData();
    }, []);

    const handleSave = async () => {
        try {
            const user = { name, email, password };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            console.log('Informações salvas:', user);
        } catch (error) {
            console.error('Erro ao salvar as informações do usuário:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao tentar sair:', error);
        }
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
                    <Input 
                        label='Nome' 
                        placeholder='digite seu nome' 
                        value={name} 
                        onChangeText={setName}
                    />
                    <Input 
                        label='E-mail' 
                        placeholder='digite seu e-mail' 
                        value={email} 
                        onChangeText={setEmail}
                    />
                    <Input 
                        label='Senha' 
                        placeholder='digite sua senha' 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry
                    />
                </ContentContainer>

                <Button 
                    title="Salvar informações" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={handleSave}
                />

                <Button 
                    title="Logout" 
                    noSpacing={true} 
                    variant='secondary'
                    onPress={handleLogout}
                />
            </Container>
            <BottomMenu />
        </Wrapper>
    );
}
