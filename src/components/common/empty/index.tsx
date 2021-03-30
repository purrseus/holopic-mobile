import React from 'react';
import Empty from '@assets/images/empty.svg';
import { Dimensions, StyleSheet } from 'react-native';
import { EmptyDescription } from './styles';

const CommonEmpty = ({ description }: { description: string }) => {
  return (
    <>
      <Empty
        width={Dimensions.get('window').width * 0.5}
        height={Dimensions.get('window').width * 0.5}
        style={styles.svg}
      />
      <EmptyDescription>{description}</EmptyDescription>
    </>
  );
};

const styles = StyleSheet.create({
  svg: {
    alignSelf: 'center',
    margin: 20,
  },
});

export default CommonEmpty;
