import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Error from '@assets/images/error.svg';
import { ErrorDescription } from './styles';

const CommonError = () => {
  return (
    <>
      <Error
        width={Dimensions.get('window').width * 0.5}
        height={Dimensions.get('window').width * 0.5}
        style={styles.error}
      />
      <ErrorDescription>{'Error! :('}</ErrorDescription>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    alignSelf: 'center',
    margin: 20,
  },
});

export default CommonError;
