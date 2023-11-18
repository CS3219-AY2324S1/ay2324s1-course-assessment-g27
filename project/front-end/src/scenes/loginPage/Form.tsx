import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  // useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/system";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import { registerUser } from "../../api/usersAPI/registerUser";
import { loginUser } from "../../api/usersAPI/loginUser";
import { Alert, AlertTitle } from "@mui/material";

interface FormValues {
  username: string;
  password: string;
  confirmPassword?: string;
  // picture?: File | null | undefined;
  [key: string]: string | undefined;
}

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
  // picture: yup.object().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  password: "",
  confirmPassword: "",
  // picture: File,
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [msg, setMsg] = useState("");
  const theme: Theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const register = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key] as string);
    }
    try {
      const savedUser = await registerUser(
        values.username,
        values.password,
        values.confirmPassword!
      );
      onSubmitProps.resetForm();
      if (errorVisible) {
        setErrorVisible(false);
      }
      setMsg("Registered Successfully");
      setAlertVisible(true);

      setPageType("login");
    } catch (err: any) {
      setMsg(err.message);
      if (alertVisible) {
        setAlertVisible(false);
      }
      setErrorVisible(true);
    }
  };

  const login = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key] as string);
    }
    try {
      const loggedIn = await loginUser(values.username, values.password);

      onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: loggedIn.userWithoutPassword,
          token: loggedIn.token,
        })
      );
      navigate("/homePage");
    } catch (err: any) {
      setMsg(err.message);
      if (alertVisible) {
        setAlertVisible(false);
      }
      setErrorVisible(true);
    }
  };

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box pt="35px" display="grid" gap="30px" width="90%">
            <Typography
              fontWeight={900}
              variant="h3"
            >
              {isLogin ? "Sign in to PeerPrep" : "Register for an account"}
            </Typography>
            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {isRegister && (
              <TextField
                label="Confirm Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            )}
          </Box>

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Button
              type="submit"
              sx={{
                m: "2rem 0",
                p: "10px",
                backgroundColor: theme.palette.highlight.purple,
                color: theme.palette.background.alt,
                fontWeight: "900",
                fontSize: "15px",
                borderRadius: 24,
                "&:hover": { color: theme.palette.highlight.purple },
                width: "60%",
                boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </Box>
          <Box>
            {alertVisible && (
              <Alert severity="success" onClose={() => setAlertVisible(false)}>
                <AlertTitle>Success</AlertTitle>
                {msg}
              </Alert>
            )}
            {errorVisible && (
              <Alert severity="error" onClose={() => setErrorVisible(false)}>
                <AlertTitle>Error</AlertTitle>
                {msg}
              </Alert>
            )}
          </Box>
          <>
            <Typography
              component="span"
              margin="1rem 0"
            >
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
            </Typography>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              component="span"
              sx={{
                m: "1rem 0",
                textDecoration: "underline",
                fontWeight: "800",
                color: theme.palette.highlight.purple,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.light,
                },
              }}
            >
              {isLogin ? "Register an account" : "Log in"}
            </Typography>
          </>
        </form>
      )}
    </Formik>
  );
};

export default Form;
