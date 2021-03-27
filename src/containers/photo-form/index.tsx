import React, { useRef, useState } from 'react';
import {
  Container,
  Image,
  StyledHoloHeader,
  StyledUserCard,
  Form,
  StyledTextInput,
  UploadButton,
} from './styles';
import FastImage from 'react-native-fast-image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { IProfile } from '@services/user';
import theme from '@theme';
import { IUploadPhotoParams } from '@navigators/app-stack';
import { ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { uploadPhoto } from '@services/photo';
import { commonActions } from '@store/slices/common';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { photoActions } from '@store/slices/photo';

interface Props {
  headerTitle: string;
  photoUrl: string;
  photo?: IUploadPhotoParams;
  photoId?: string;
}

const PhotoForm = ({ headerTitle, photoUrl, photo, photoId }: Props) => {
  const tagsInputRef = useRef<TextInput | null>(null);
  const [photoStatus, setPhotoStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const { goBack } = useNavigation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user: IProfile | undefined = useAppSelector(
    state => state.user.user?.profile,
  );

  const photoFormSchema = yup.object().shape({
    title: yup.string().optional().trim(),
    tags: yup
      .string()
      .matches(/^(\w+\s*)+$/gi)
      .optional()
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      tags: '',
    },
    validationSchema: photoFormSchema,
    onSubmit: values => {
      (async () => {
        if (photo) {
          try {
            setPhotoStatus({ ...photoStatus, loading: true });
            const res = await uploadPhoto(values.title, values.tags, photo);
            if (res.status === 201) {
              dispatch(photoActions.uploadAPhoto(res.data));
              setPhotoStatus({ ...photoStatus, loading: false, success: true });
              goBack();
              dispatch(
                commonActions.showToast({
                  message: t('uploadPhotoSuccess'),
                  duration: 5000,
                }),
              );
            }
          } catch (error) {
            setPhotoStatus({ ...photoStatus, error: true });
            dispatch(
              commonActions.showToast({ message: t('commonErrorMessage') }),
            );
          }
          return;
        }

        if (photoId) {
          // ...
          return;
        }
      })();
    },
  });

  return (
    <Container>
      <StyledHoloHeader headerTitle={headerTitle} showBackButton />
      <ScrollView>
        {!!user && (
          <StyledUserCard
            fullName={user.fullName}
            username={user.username}
            avatarUrl={user.avatar.url}
          />
        )}
        <Image
          source={{ uri: photoUrl }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Form>
          <StyledTextInput
            error={formik.errors.title}
            placeholder={t('addATitle')}
            value={formik.values.title}
            maxLength={64}
            onChangeText={formik.handleChange('title')}
            onSubmitEditing={() => {
              tagsInputRef?.current?.focus();
            }}
          />
          <StyledTextInput
            error={formik.errors.tags}
            ref={tagsInputRef}
            placeholder={t('addTags')}
            value={formik.values.tags}
            maxLength={64}
            onChangeText={formik.handleChange('tags')}
            autoCapitalize="none"
          />
        </Form>
        <UploadButton
          title={photoStatus.loading ? t('uploading') : t('upload')}
          disabled={!!formik.errors.tags || !!formik.errors.title}
          titleColor={theme.colors.white}
          bgColor={
            photoStatus.error ? theme.colors.red : theme.colors.lightBlue2
          }
          onPress={
            photoStatus.success || photoStatus.loading
              ? undefined
              : formik.handleSubmit
          }
          leftIcon={
            photoStatus.loading ? (
              <ActivityIndicator size={20} color={theme.colors.white} />
            ) : (
              <Icon name="upload" size={20} color={theme.colors.white} />
            )
          }
        />
      </ScrollView>
    </Container>
  );
};

export default PhotoForm;
