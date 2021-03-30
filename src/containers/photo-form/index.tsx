import React, { useRef, useState } from 'react';
import {
  Container,
  Image,
  StyledHoloHeader,
  StyledUserCard,
  Form,
  StyledTextInput,
  UploadButton,
  RemoveButton,
} from './styles';
import FastImage from 'react-native-fast-image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { IProfile } from '@services/user';
import theme from '@theme';
import { IUploadPhotoParams } from '@navigators/app-stack';
import { ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { editPhoto, uploadPhoto } from '@services/photo';
import { commonActions } from '@store/slices/common';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { photoActions } from '@store/slices/photo';
import { HoloScreen } from '@constants';

interface Props {
  headerTitle: string;
  photoUrl: string;
  photo?: IUploadPhotoParams;
  photoInfo?: { title: string; tags: string };
  photoId?: string;
}

const PhotoForm = ({
  headerTitle,
  photoUrl,
  photo,
  photoInfo,
  photoId,
}: Props) => {
  const tagsInputRef = useRef<TextInput | null>(null);
  const [photoStatus, setPhotoStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const { goBack, navigate } = useNavigation();
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
      title: photoInfo?.title || '',
      tags: photoInfo?.tags || '',
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

        if (photoId && photoInfo) {
          try {
            dispatch(commonActions.showOverlayLoading());
            await editPhoto(values.title, values.tags, photoId);
            navigate(HoloScreen.TAB_BAR, { screen: HoloScreen.PROFILE });
            dispatch(
              commonActions.showToast({
                message: 'Your photo has been updated',
              }),
            );
          } catch (error) {
            setPhotoStatus({ ...photoStatus, error: true });
            dispatch(
              commonActions.showToast({ message: t('commonErrorMessage') }),
            );
          } finally {
            dispatch(commonActions.hideOverlayLoading());
          }
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
            selectionColor={theme.colors.black}
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
            selectionColor={theme.colors.black}
            onChangeText={formik.handleChange('tags')}
            autoCapitalize="none"
          />
        </Form>

        {!photoInfo && !photoId ? (
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
        ) : (
          <>
            <UploadButton
              title="Done"
              disabled={!!formik.errors.tags || !!formik.errors.title}
              titleColor={theme.colors.white}
              bgColor={
                photoStatus.error ? theme.colors.red : theme.colors.lightBlue2
              }
              onPress={formik.handleSubmit}
            />
            <RemoveButton
              title="Remove photo"
              titleColor={theme.colors.white}
              bgColor={theme.colors.red}
              onPress={() => {}}
            />
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default PhotoForm;
