import { HoloScreen } from '@constants';
import { TAppStackParamsList } from '@navigators/app-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import theme from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import LottieView from 'lottie-react-native';

type PhotoViewerScreenRouteProp = RouteProp<
  TAppStackParamsList,
  HoloScreen.PHOTO_VIEWER
>;

const PhotoViewerScreen = () => {
  const {
    params: { url },
  } = useRoute<PhotoViewerScreenRouteProp>();

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={[{ url }]}
        enableImageZoom
        backgroundColor={theme.colors.background}
        renderIndicator={() => <></>}
        loadingRender={() => (
          <LottieView
            source={require('@assets/animations/loading')}
            style={styles.loading}
            autoPlay
            loop
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
});

export default PhotoViewerScreen;
