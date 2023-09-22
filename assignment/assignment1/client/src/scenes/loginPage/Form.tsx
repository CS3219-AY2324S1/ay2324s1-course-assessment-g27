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
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { PORT } from "../../constants/constants";
// import Dropzone from "react-dropzone";
// import FlexBetween from "../../components/FlexBetween";

interface FormValues {
  username: string;
  password: string;
  // picture?: File | null | undefined;
  [key: string]: string;
}

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  // picture: yup.object().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  password: "",
  // picture: File,
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const theme: Theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (const key in values) {
      // if (values[key] !== undefined && values[key] !== null) {
      //   if (key === "picture" && values.picture instanceof File) {
      //     // If it's the 'picture' property and it's a File, append it with its name
      //     formData.append("picture", values.picture, values.picture.name);
      //   } else {
      //     // Otherwise, assume it's a string and append it as a string
      formData.append(key, values[key] as string);
      //   }
      // }
    }
    let username = formData.get("username");
    let password = formData.get("password");
    // formData.append("picturePath", values.picture!.name);
    const savedUserRespone = await fetch(
      `http://localhost:${PORT}/auth/register`,
      {
        method: "POST",
        // body: formData,
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const savedUser = await savedUserRespone.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (const key in values) {
      // if (values[key] !== undefined && values[key] !== null) {
      //   if (key === "picture" && values.picture instanceof File) {
      // If it's the 'picture' property and it's a File, append it with its name
      //   formData.append("picture", values.picture, values.picture.name);
      // } else {
      // Otherwise, assume it's a string and append it as a string
      formData.append(key, values[key] as string);
      // }
    }
    // }
    // formData.append("picturePath", values.picture!.name);

    const loggedInRespone = await fetch(`http://localhost:${PORT}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInRespone.json();
    console.log("loggedIn:", loggedIn);

    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/questions");
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
        // setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateRows="repeat(2, minmax(0, 1fr))"
            sx={
              {
                // "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }
            }
          >
            {/*isRegister && (
              <>
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${theme.palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    accept={{ images: [".jpg", ".jpeg", ".png"] }}
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!initialValuesRegister.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {initialValuesRegister.picture.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
                        )*/}
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
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: theme.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
