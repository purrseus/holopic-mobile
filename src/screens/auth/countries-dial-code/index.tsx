import React, { useRef, useState } from 'react';
import {
  Container,
  Row,
  SearchCountry,
  Countries,
  ClearButton,
  CountryContainer,
  Name,
  CountryCode,
  CountryName,
  DialCode,
  Flag,
} from './styles';
import countriesCode from '../../../assets/json/phone-prefix.json';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useAppDispatch } from '@store/store';
import { authActions, IPhonePrefix } from '@store/slices/auth';
import { useNavigation } from '@react-navigation/native';
import theme from '@theme';
import { useTranslation } from 'react-i18next';
import HoloHeader from '@components/holo-header';
import Icon from 'react-native-vector-icons/AntDesign';

interface ICountriesCode {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
}

const CountriesDialCodeScreen = () => {
  const { t } = useTranslation();
  const inputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();
  const [value, setValue] = useState<string>('');
  const [countryCode, setCountryCode] = useState<ICountriesCode[]>(
    countriesCode,
  );
  const _selectDialCode = (payload: IPhonePrefix) => {
    dispatch(authActions.setDialCode(payload));
    goBack();
  };

  const _onChangeText = (text: string) => {
    setValue(text);
    if (text.toLowerCase().trim()) {
      const result = countriesCode.filter(ele => {
        return (
          ele.name.toLowerCase().includes(text.toLowerCase().trim()) ||
          ele.code.toLowerCase().includes(text.toLowerCase().trim())
        );
      });
      setCountryCode(result);
    }
    return;
  };

  const _clearTextInput = () => {
    inputRef?.current?.clear();
    inputRef?.current?.focus();
  };

  const _renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          _selectDialCode({ flag: item.flag, dialCode: item.dialCode })
        }
      >
        <CountryContainer>
          <Flag>{item.flag}</Flag>
          <Name>
            <CountryName ellipsizeMode="tail" numberOfLines={1}>
              {item.name}
            </CountryName>
            <CountryCode>{item.code}</CountryCode>
          </Name>
          <DialCode>{item.dialCode}</DialCode>
        </CountryContainer>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Container>
      <HoloHeader
        headerTitle={t('titleCountriesDialCodeScreen')}
        showBackButton
      />
      <Row>
        <SearchCountry
          autoFocus
          placeholder={t('searchCountry')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ fontSize: 16 }}
          onChangeText={_onChangeText}
          selectionColor={theme.colors.black}
          value={value}
          ref={inputRef}
        />
        {!!value.length && (
          <TouchableWithoutFeedback onPress={_clearTextInput}>
            <ClearButton>
              <Icon name="close" size={22} />
            </ClearButton>
          </TouchableWithoutFeedback>
        )}
      </Row>
      <Countries
        data={countryCode}
        renderItem={_renderItem}
        keyExtractor={(_, i) => '' + i}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </Container>
  );
};

export default CountriesDialCodeScreen;
