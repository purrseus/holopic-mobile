import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@store/store';
import { authActions } from '@store/slices/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Container,
  TextContainer,
  Content,
  Title,
  Pagination,
  Dot,
  StyledHoloButton,
} from './styles';
import { Dimensions, FlatList, ListRenderItem } from 'react-native';
import Moments from '@assets/images/Moments.svg';
import Photos from '@assets/images/Photos.svg';
import PhonePhotos from '@assets/images/Phone-photos.svg';
import { SvgProps } from 'react-native-svg';
import theme from '@theme';

const WIDTH = Dimensions.get('window').width;

interface IWelcomeScreenContent {
  title: string;
  svg: React.FC<SvgProps>;
}

const WelcomeScreen = () => {
  const dispatch = useAppDispatch();
  const { hideWelcomeScreen } = authActions;
  const [index, setIndex] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList<IWelcomeScreenContent> | null>(null);

  const welcomeScreenContent: IWelcomeScreenContent[] = [
    {
      title: t('welcomeTitle1'),
      svg: Moments,
    },
    {
      title: t('welcomeTitle2'),
      svg: PhonePhotos,
    },
    {
      title: t('welcomeTitle3'),
      svg: Photos,
    },
  ];

  const renderItem: ListRenderItem<IWelcomeScreenContent> = ({ item }) => {
    return (
      <Content>
        <TextContainer>
          <Title>{item.title}</Title>
        </TextContainer>
        <item.svg width={WIDTH - 100} height={WIDTH - 100} />
      </Content>
    );
  };

  const handleFlatListScroll = (x: number) => {
    if (Math.ceil(x) % Math.ceil(WIDTH) === 0) {
      setCurrentIndex(+Math.round(x / WIDTH));
    }
  };

  const handleOnPress = () => {
    if (index === welcomeScreenContent.length) {
      dispatch(hideWelcomeScreen());
      return;
    }

    flatListRef?.current?.scrollToIndex({
      index: index,
      animated: true,
    });
    setIndex(index + 1);
  };

  return (
    <Container>
      <FlatList<IWelcomeScreenContent>
        data={welcomeScreenContent}
        keyExtractor={(_, i) => '' + i}
        onScroll={({
          nativeEvent: {
            contentOffset: { x },
          },
        }) => handleFlatListScroll(x)}
        renderItem={renderItem}
        horizontal
        snapToInterval={WIDTH}
        disableScrollViewPanResponder
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
      />

      <Pagination>
        {welcomeScreenContent.map((_, i) => (
          <Dot key={i} index={i} currentIndex={currentIndex} />
        ))}
      </Pagination>

      <StyledHoloButton
        title={
          index === welcomeScreenContent.length ? t('welcomeButton') : t('next')
        }
        // eslint-disable-next-line react-native/no-inline-styles
        titleStyle={{
          fontFamily: 'Quicksand-Bold',
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 26,
          color: theme.colors.black,
        }}
        bgColor={theme.colors.lightGray}
        {...(index === welcomeScreenContent.length && {
          gradient: {
            colors: [theme.colors.lightBlue1, theme.colors.lightBlue2],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          },
        })}
        rightIcon={
          <Icon name="arrowright" size={26} color={theme.colors.black} />
        }
        onPress={handleOnPress}
      />
    </Container>
  );
};

export default WelcomeScreen;
