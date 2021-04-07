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
  SearchBackground,
  HeaderRecentSearches,
  HeaderTitleRecentSearches,
  ClearKeywordButton,
  HeadingSvg,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@theme';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Searching from '@assets/images/searching.svg';
import { useAppDispatch, useAppSelector } from '@store/store';
import { searchActions } from '@store/slices/search';
import Result from './result';

enum SearchStatus {
  EMPTY = 'empty',
  RECENT = 'recent',
  RESULT = 'result',
}

const SearchScreen = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const searchKeywords = useAppSelector(state => state.search.keywords);
  const [filterKeywords, setFilterKeywords] = useState<string[]>(
    searchKeywords,
  );
  const isFocused = useIsFocused();
  const [inputValue, setInputValue] = useState<string>('');
  const [searchStatus, setSearchStatus] = useState<SearchStatus>(
    SearchStatus.EMPTY,
  );
  const inputRef = useRef<TextInput | null>(null);

  const _onSubmit = () => {
    if (!inputValue.length) {
      return;
    }
    setSearchStatus(SearchStatus.RESULT);
    dispatch(searchActions.searchKeywordRequest(inputValue));
  };

  const _recentSearchesRenderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <KeywordContainer>
        <Icon name="clockcircleo" size={20} color={theme.colors.darkGray} />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setSearchStatus(SearchStatus.RESULT);
            dispatch(searchActions.searchKeywordRequest(item));
            setInputValue(item);
          }}
        >
          <Keyword numberOfLines={1} ellipsizeMode="tail">
            {item}
          </Keyword>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => {
            dispatch(searchActions.removeASearchKeyword(item));
            const cloneFilterKeywords = [...filterKeywords];
            cloneFilterKeywords.splice(
              filterKeywords.findIndex(keyword => keyword === item),
              1,
            );
            setFilterKeywords(cloneFilterKeywords);
          }}
        >
          <Icon name="close" size={20} color={theme.colors.darkGray} />
        </TouchableOpacity>
      </KeywordContainer>
    );
  };

  useEffect(() => {
    isFocused && searchStatus !== SearchStatus.RESULT
      ? inputRef.current?.focus()
      : inputRef.current?.blur();
  }, [isFocused, searchStatus]);

  return (
    <Container>
      <InputContainer>
        <Icon name="search1" size={20} style={styles.icon} />
        <StyledTextInput
          ref={inputRef}
          selectionColor={theme.colors.lightBlue1}
          returnKeyType="search"
          placeholder="Search"
          value={inputValue}
          onChangeText={text => {
            if (searchStatus !== SearchStatus.RECENT) {
              setSearchStatus(SearchStatus.RECENT);
            }

            setInputValue(text);
            setFilterKeywords(
              searchKeywords.filter(keyword => keyword.includes(text)),
            );
          }}
          onSubmitEditing={_onSubmit}
          onFocus={() => {
            if (searchKeywords.length) {
              setSearchStatus(SearchStatus.RECENT);
            }
          }}
          autoCapitalize="none"
        />
        {inputValue.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              setInputValue('');
              inputRef.current?.focus();
            }}
          >
            <Icon name="close" size={20} style={styles.icon} />
          </TouchableOpacity>
        )}
      </InputContainer>

      {searchStatus === SearchStatus.EMPTY && (
        <SvgContainer>
          <Searching width={width * 0.6} height={width * 0.6} />
          <HeadingSvg>Let's find something interesting!</HeadingSvg>
          <Description>
            Search all of Holopic for People and Photos.
          </Description>
        </SvgContainer>
      )}

      {searchStatus === SearchStatus.RECENT && filterKeywords.length > 0 && (
        <SearchBackground>
          <RecentSearches>
            <FlatList<string>
              data={filterKeywords}
              renderItem={_recentSearchesRenderItem}
              keyExtractor={(_item, index) => '' + index}
              stickyHeaderIndices={[0]}
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={
                <HeaderRecentSearches>
                  <HeaderTitleRecentSearches>
                    Recent Searches
                  </HeaderTitleRecentSearches>
                  <TouchableOpacity
                    onPress={() => {
                      setInputValue('');
                      setSearchStatus(SearchStatus.EMPTY);
                      dispatch(searchActions.clearSearchKeywords());
                    }}
                  >
                    <ClearKeywordButton>clear</ClearKeywordButton>
                  </TouchableOpacity>
                </HeaderRecentSearches>
              }
            />
          </RecentSearches>
        </SearchBackground>
      )}

      {searchStatus === SearchStatus.RESULT && (
        <Container>
          <Result />
        </Container>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 4,
  },
});

export default SearchScreen;
