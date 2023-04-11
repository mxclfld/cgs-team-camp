import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PageWrapper } from '../../common/components/wrapper/wrapper.component';
import { Form } from '../../common/components/form/form.component';
import { APP_KEYS } from '../../common/consts';
import { profileUserSchema } from '../schemas/user.schema';

export const Profile = () => {
  // TODO: change password for user && check if old password is same as in DB
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: profileUserSchema,
    onSubmit: () => {
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    }
  });

  return (
    <PageWrapper>
      <Typography variant="h3">Change Password</Typography>
      <Form>
        <TextField
          type="name"
          name="name"
          id="name"
          label="Email"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <p>{formik.touched.name && formik.errors.name ? formik.errors.name : ''}</p>
        <TextField
          type="password"
          name="oldPassword"
          id="oldPassword"
          label="Old Password"
          value={formik.values.oldPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.oldPassword && formik.errors.oldPassword ? formik.errors.oldPassword : ''}
        </p>
        <TextField
          type="password"
          name="newPassword"
          id="newPassword"
          label="New password"
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <p>
          {formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ''}
        </p>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="button"
            variant="contained"
            component={Link}
            to={APP_KEYS.ROUTER_KEYS.TODOS_LIST}
          >
            Back
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Form>
    </PageWrapper>
  );
};
