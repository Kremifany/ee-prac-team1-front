import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material'
import { theme } from '../utils/theme'
import Logo from '../assets/logo70.png'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
//import Grid from '@mui/material/Grid' // Grid version 1

import Grid from '@mui/material/Unstable_Grid2'

import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { toast, ToastContainer } from 'react-toastify' // Add this import
import 'react-toastify/dist/ReactToastify.css' // Add this import

import { useState } from 'react'
import axios from 'axios'

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, touched, errors, handleChange, handleBlur, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const login = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/v1/auth/login',
            {
              password: values.password,
              email: values.email,
            },
          )
          const { data, statusText } = response
          console.log(data)
          if (statusText !== 'OK') {
            throw new Error('Login failed')
          }
          navigate('/')
          const { token, user } = data
          const { userId } = user
          // Save token and userId to localStorage
          localStorage.setItem('jwtToken', token)
          localStorage.setItem('userId', userId)
        } catch (error) {
          // Show error message
          toast.error(
            error.message || 'Login failed. Please check your credentials.',
            {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },
          )
          console.error('Error logging in:', error)
        }
      }

      login()
    },
  })

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ bgcolor: theme.palette.background.main, minHeight: '100vh' }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={500}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={3}
              padding={3}
              borderRadius={5}
            >
              <img src={Logo} alt="Player Buddy Logo" />

              <Typography
                padding={3}
                textAlign="center"
                sx={{
                  color: theme.palette.primary.contrastText,
                  font: theme.typography.fontFamily,
                  fontWeight: theme.typography.titleText.fontWeight,
                  fontSize: theme.typography.titleText.fontSize,
                }}
              >
                LOGIN
              </Typography>
              <Typography
                padding={3}
                textAlign="center"
                sx={{
                  color: theme.palette.primary.contrastText,
                  font: theme.typography.fontFamily,
                  fontWeight: theme.typography.subTitleText.fontWeight,
                  fontSize: theme.typography.titleText.fontSize,
                }}
              >
                Hi there! Nice to see you again.
              </Typography>

              <TextField
                sx={{
                  bgcolor: "#fff",
                  "& .MuiInputLabel-root.Mui-focused":
                    theme.overrides.MuiInputLabel.root["&.Mui-focused"],
                  "& .MuiOutlinedInput-root":
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                type={"text"}
                placeholder="Enter your e-mail"
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                sx={{
                  bgcolor: "#fff",
                  "& .MuiInputLabel-root.Mui-focused":
                    theme.overrides.MuiInputLabel.root["&.Mui-focused"],
                  "& .MuiOutlinedInput-root":
                    theme.overrides.MuiOutlinedInput.root,
                }}
                size="small"
                margin="normal"
                placeholder="Enter your password"
                variant="outlined"
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePasswordVisibility}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  ...theme.commonButtonStyles,
                  marginLeft: 2,
                  marginRight: 2,
                }}
              >
                Login
              </Button>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 3, md: 3 }}
              >
                <Grid marginLeft={0} marginTop={3} xs={6}>
                  <Typography
                    variant="h7"
                    padding={0}
                    textAlign="center"
                    sx={{ color: theme.palette.primary.contrastText }}
                  >
                    <span>Don’t have an account? </span>
                    <Link
                      onClick={() => navigate("/register")}
                      style={{ cursor: "pointer" }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Grid>
                <Grid marginTop={3} xs={6}>
                  <Typography
                    variant="h7"
                    padding={3}
                    textAlign="center"
                    sx={{ color: theme.palette.primary.contrastText }}
                  >
                    <Link
                      onClick={() => navigate('/forgotpassword')}
                      style={{ cursor: 'pointer' }}
                    >
                      Forgot Password?
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </ThemeProvider>
      {/* Add the ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Add the ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Login;
