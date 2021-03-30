import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import HoloButton from '@components/holo-button';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 40px 0px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  width: ${Dimensions.get('window').width}px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 60px;
`;

export const TextContainer = styled.View`
  height: 30%;
  width: 100%;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  padding-horizontal: 20px;
`;

export const Pagination = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.View<{ index: number; currentIndex: number }>`
  width: 8px;
  height: 8px;
  margin: 4px;
  background-color: ${({ currentIndex, index, theme }) =>
    currentIndex === index ? theme.colors.lightBlue1 : theme.colors.lightGray};
  border-radius: 10px;
  ${({ index, currentIndex }) =>
    currentIndex === index && 'transform: scale(1.5);'}
`;

export const NextButton = styled(HoloButton)`
  margin-horizontal: 30px;
  elevation: 0;
`;
