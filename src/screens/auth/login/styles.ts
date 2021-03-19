import HoloButton from '@components/holo-button';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px 0px 300px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ContentContainer = styled.View`
  padding-horizontal: 16px;
`;

export const Title = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 10px 0px;
`;

export const Heading = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 30px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  padding: 0px 8px;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.darkGray};
`;

export const PhonePrefixButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 4px;
`;

export const Flag = styled.Text`
  font-size: 20px;
`;

export const DialCode = styled.Text`
  font-size: 18px;
  line-height: 22px;
  padding-right: 6px;
  margin-left: 6px;
  font-family: 'Quicksand-Bold';
  color: ${({ theme }) => theme.colors.black};
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.darkGray};
`;

export const PhoneNumberInput = styled.TextInput`
  width: 65%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SubmitPhoneNumberButton = styled(HoloButton)`
  width: 70%;
`;
