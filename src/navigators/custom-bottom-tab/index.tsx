import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomTab from './custom-tab';
import { HoloScreen } from '@constants';
import theme from '@theme';
import { AnimatedBottomSheetHeader, Container } from './styles';
import UploadImageButton from './upload-button';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import BottomSheet from './upload-bottom-sheet';
import { useAppDispatch, useAppSelector } from '@store/store';
import { photoActions } from '@store/slices/photo';

const CustomBottomTab = ({
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const collapse = new Animated.Value(1);
  const dispatch = useAppDispatch();
  const uploadBottomSheetVisible = useAppSelector(
    reduxState => reduxState.photo.uploadBottomSheetVisible,
  );

  const _onCloseBottomSheet = () => {
    dispatch(photoActions.showUploadBottomSheet(false));
  };

  const _onBottomSheetSwipeStart = () => {
    Animated.timing(collapse, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const _onBottomSheetSwipeCancel = () => {
    Animated.timing(collapse, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container>
      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.HOME)}
        focused={state.routeNames[state.index] === HoloScreen.HOME}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="home"
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.SEARCH)}
        focused={state.routeNames[state.index] === HoloScreen.SEARCH}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="search1"
      />

      <UploadImageButton />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.LIKES)}
        focused={state.routeNames[state.index] === HoloScreen.LIKES}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="hearto"
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.MY_PROFILE)}
        focused={state.routeNames[state.index] === HoloScreen.MY_PROFILE}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="user"
      />

      <Modal
        isVisible={uploadBottomSheetVisible}
        onSwipeComplete={_onCloseBottomSheet}
        onBackButtonPress={_onCloseBottomSheet}
        onBackdropPress={_onCloseBottomSheet}
        onSwipeStart={_onBottomSheetSwipeStart}
        onSwipeCancel={_onBottomSheetSwipeCancel}
        swipeDirection="down"
        backdropOpacity={0.2}
        backdropColor="#333333"
        backdropTransitionInTiming={150}
        backdropTransitionOutTiming={150}
        style={styles.bottomSheet}
      >
        <AnimatedBottomSheetHeader
          style={{
            width: collapse.interpolate({
              inputRange: [0, 1],
              outputRange: [8, 32],
            }),
            height: collapse.interpolate({
              inputRange: [0, 1],
              outputRange: [8, 4],
            }),
          }}
        />
        <BottomSheet />
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: Dimensions.get('window').height * 0.65,
  },
});

export default CustomBottomTab;
