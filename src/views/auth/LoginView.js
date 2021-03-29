import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState('');
  console.log(navigate);

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'teamcodebehind@Hotmail.com',
              password: 'Password123',
              rememberMe: false
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required'),
              rememberMe: Yup.boolean()
            })}
            onSubmit={(values) => {
              setCurrentState();
              setCurrentState(JSON.stringify(values, null, 2));
              // navigate('/app/addresses', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={(e) => {
                    setCurrentState('');
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={(e) => {
                    setCurrentState('');
                    handleBlur(e);
                  }}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.rememberMe}
                    name="rememberMe"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    Remember Me
                  </Typography>
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  onClick={() => {
                    setCurrentState('Sign up clicked!');
                  }}
                >
                  Don&apos;t have an account?
                  <Link component={RouterLink} to="#" variant="h6">
                    Sign up
                  </Link>
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  onClick={() => {
                    setCurrentState('Forgot Password clicked!');
                  }}
                >
                  <Link component={RouterLink} to="#" variant="h6">
                    Forgot Password
                  </Link>
                </Typography>
                {currentState}
                {Boolean(touched.email && errors.email) && <>{errors.email}</>}
                {Boolean(touched.password && errors.password) && (
                  <>{errors.password}</>
                )}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
