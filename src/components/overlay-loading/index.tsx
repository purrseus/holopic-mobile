import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { useAppSelector } from '@store/store';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0005;
`;

const OverlayLoading = () => {
  const loading = useAppSelector(state => state.common.loading);

  return (
    <>
      {loading && (
        <Container>
          <LottieView
            source={require('@assets/animations/loading')}
            style={{ transform: [{ scale: 0.4 }] }}
            autoPlay
            loop
          />
        </Container>
      )}
    </>
  );
};

export default OverlayLoading;
