import React, { useState } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomTab from './custom-tab';
import { HoloScreen } from '@constants';
import theme from '@theme';
import { Container } from './styles';
import UploadImageButton from './upload-button';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import BottomSheet from './upload-bottom-sheet';

const CustomBottomTab = ({
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  return (
    <Container>
      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.HOME)}
        focused={state.routeNames[state.index] === HoloScreen.HOME}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="home"
        iconSize={24}
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.SEARCH)}
        focused={state.routeNames[state.index] === HoloScreen.SEARCH}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="search1"
        iconSize={24}
      />

      <UploadImageButton
        onPress={() => {
          setBottomSheetVisible(!bottomSheetVisible);
        }}
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.LIKES)}
        focused={state.routeNames[state.index] === HoloScreen.LIKES}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="hearto"
        iconSize={24}
      />

      <CustomTab
        onPress={() => navigation.navigate(HoloScreen.PROFILE)}
        focused={state.routeNames[state.index] === HoloScreen.PROFILE}
        activeTintColor={theme.colors.lightBlue1}
        inactiveTintColor={theme.colors.darkGray}
        iconName="user"
        iconSize={24}
      />

      <Modal
        isVisible={bottomSheetVisible}
        onSwipeComplete={() => setBottomSheetVisible(!bottomSheetVisible)}
        swipeDirection="down"
        backdropOpacity={0.3}
        backdropTransitionInTiming={150}
        backdropTransitionOutTiming={150}
        style={styles.bottomSheet}
      >
        <BottomSheet setBottomSheetVisible={setBottomSheetVisible} />
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: 580,
  },
});

export default CustomBottomTab;
