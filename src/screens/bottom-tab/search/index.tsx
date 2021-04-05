import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  InputContainer,
  StyledTextInput,
  SvgContainer,
  Description,
  RecentSearches,
  KeywordContainer,
  Keyword,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@theme';
import {
  FlatList,
  ListRenderItem,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Searching from '@assets/images/searching.svg';
import { useAppDispatch, useAppSelector } from '@store/store';
import { searchActions } from '@store/slices/search';

const SearchScreen = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const searchKeywords = useAppSelector(state => state.search.keywords);
  const isFocused = useIsFocused();
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<TextInput | null>(null);

  const _onSubmit = () => {
    dispatch(searchActions.searchKeywordRequest(inputValue));
  };

  const _recentSearchesRenderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <KeywordContainer>
        <Keyword>{item}</Keyword>
      </KeywordContainer>
    );
  };

  useEffect(() => {
    isFocused ? inputRef.current?.focus() : inputRef.current?.blur();
  }, [isFocused]);

  return (
    <Container>
      <InputContainer>
        <Icon name="search1" size={20} />
        <StyledTextInput
          ref={inputRef}
          selectionColor={theme.colors.lightBlue1}
          returnKeyType="search"
          placeholder="Search"
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          onSubmitEditing={_onSubmit}
        />
        {inputValue.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              setInputValue('');
            }}
          >
            <Icon name="close" size={20} />
          </TouchableOpacity>
        )}
      </InputContainer>

      {!searchKeywords.length ? (
        <SvgContainer>
          <Searching width={width * 0.6} height={width * 0.6} />
          <Description>
            Search all of Holopic for People and Photos.
          </Description>
        </SvgContainer>
      ) : (
        <RecentSearches>
          <FlatList<string>
            data={searchKeywords}
            renderItem={_recentSearchesRenderItem}
            keyExtractor={(_item, index) => '' + index}
          />
        </RecentSearches>
      )}
    </Container>
  );
};

export default SearchScreen;
