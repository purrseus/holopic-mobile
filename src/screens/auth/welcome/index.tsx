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
  NextButton,
} from './styles';
import { Dimensions, FlatList, ListRenderItem } from 'react-native';
import Moments from '@assets/images/Moments.svg';
import Photos from '@assets/images/Photos.svg';
import PhonePhotos from '@assets/images/Phone-photos.svg';
import { SvgProps } from 'react-native-svg';
import theme from '@theme';
import { gradientPreset } from '@components/holo-button';

const WIDTH: number = Dimensions.get('window').width;

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

  const _renderItem: ListRenderItem<IWelcomeScreenContent> = ({ item }) => {
    return (
      <Content>
        <TextContainer>
          <Title>{item.title}</Title>
        </TextContainer>
        <item.svg width={WIDTH - 100} height={WIDTH - 100} />
      </Content>
    );
  };

  const _handleSwipeGesture = (x: number) => {
    if (Math.ceil(x) % Math.ceil(WIDTH) === 0) {
      setCurrentIndex(+Math.round(x / WIDTH));
    }
  };

  const _onNext = () => {
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
        }) => _handleSwipeGesture(x)}
        renderItem={_renderItem}
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

      <NextButton
        title={
          index === welcomeScreenContent.length ? t('welcomeButton') : t('next')
        }
        bgColor={theme.colors.lightGray}
        {...(index === welcomeScreenContent.length && {
          gradient: gradientPreset,
          titleColor: theme.colors.white,
        })}
        rightIcon={
          <Icon
            name="arrowright"
            size={26}
            color={
              index === welcomeScreenContent.length
                ? theme.colors.white
                : theme.colors.black
            }
          />
        }
        onPress={_onNext}
      />
    </Container>
  );
};

export default WelcomeScreen;
