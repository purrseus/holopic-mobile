import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef>();

export const getNavigation = (): NavigationContainerRef | null => {
  return navigationRef.current;
};
