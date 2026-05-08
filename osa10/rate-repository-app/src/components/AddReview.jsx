import { useState } from 'react';
import { useNavigate } from 'react-router-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { ErrorText, FormView } from './Form/styled';
import FormInputView from './Form/InputView';
import SubmitPressable from './Form/SubmitPressable';

import useAddReview from '../hooks/useAddReview';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100')
    .required('Rating is required'),
  review: yup.string().optional(),
});

const AddReview = () => {
  const [error, setError] = useState('');
  const [addReview] = useAddReview();
  const navigate = useNavigate();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const navigateToRepo = (id) => navigate(`/repos/${id}`);

  const onSubmit = async (values) => {
    try {
      const id = await addReview(values);
      console.log(id);
      navigateToRepo(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(form) => {
        const hasOwnerNameError =
          form.errors.ownerName && form.touched.ownerName;
        const hasRepoNameError =
          form.errors.repositoryName && form.touched.repositoryName;
        const hasRatingError = form.errors.rating && form.touched.rating;

        return (
          <FormView>
            <FormInputView
              placeholder="Repository owner name"
              onChangeText={form.handleChange('ownerName')}
              value={form.values.ownerName}
              hasError={hasOwnerNameError}
              errorText={form.errors.ownerName}
            />
            <FormInputView
              placeholder="Repository name"
              onChangeText={form.handleChange('repositoryName')}
              value={form.values.repositoryName}
              hasError={hasRepoNameError}
              errorText={form.errors.repositoryName}
            />
            <FormInputView
              placeholder="Rating between 0 and 100"
              onChangeText={form.handleChange('rating')}
              value={form.values.rating}
              hasError={hasRatingError}
              errorText={form.errors.rating}
            />
            <FormInputView
              placeholder="Review"
              onChangeText={form.handleChange('text')}
              value={form.values.text}
              multiline
            />
            <SubmitPressable
              text="Create a review"
              onPress={form.handleSubmit}
            />
            {error ? <ErrorText>{error}</ErrorText> : null}
          </FormView>
        );
      }}
    </Formik>
  );
};

export default AddReview;
