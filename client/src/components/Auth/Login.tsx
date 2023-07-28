import React, { useState,useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CssBaseline } from "@mui/material";
import AuthWrapper from "../shared/Auth/AuthWrapper";
import { Link ,useNavigate} from "react-router-dom";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginApi } from "../../api/Auth";
import { UserContext } from "../../context/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, SetMessage] = useState("");
  const [user,setUser]=useContext(UserContext)
  const navigate=useNavigate();
  console.log("user",user)

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any) => {
    try {
      const { email, password } = values;
      const data={email,password}
    const response:any=await LoginApi(data)
    console.log("response",response)
    console.log("id",response?.data?.data?.user?.id)
    console.log("name",response?.data?.data?.user?.name)
    console.log("email",response?.data?.data?.user?.email)
    // console.log("error",response.data.errors[0].msg)
    if (response.data.data) {
      setUser({
        data: {
          id: response?.data?.data?.user?.id,
          email: response?.data?.data?.user?.email,
          name: response?.data?.data?.user?.name,
        },
        loading: false,
        error: null
      })

      localStorage.setItem("token", response?.data?.data.token);
      localStorage.setItem("User", JSON.stringify(response?.data?.data.user));
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${response?.data?.data.token}`;
      navigate("/");
    } else {
      SetMessage(response.data.errors[0].msg);
      setTimeout(() => {
        SetMessage("");
      }, 1000);
    }

    // if(response){
    //   navigate("/")
    // }

    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <CssBaseline />
      <AuthWrapper>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", width: "80%" }}
        >
          <Typography
            sx={{
              color: "primary.main",
              fontWeight: 600,
              fontSize: "20px",
              textAlign: "center",
              mb: 2,
            }}
          >
            Login
          </Typography>
          {message && (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          )}
          <TextField
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ my: 2 }}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ my: 1 }}
            type={showPassword ? "text" : "password"}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            sx={{
              textDecoration: "none",
              textAlign: "end",
              fontSize: "14px",
              cursor: "pointer",
              color: "primary.main",
            }}
          >
            Forgot Password?
          </Typography>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              borderRadius: "10px",
              mt: 1,
              textTransform: "capitalize",
            }}
          >
            Login
          </Button>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 4,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: "#33333",
                fontSize: "12px",
              }}
            >
              Dont have an Account?
            </Typography>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#150578",
                fontSize: "12px",
                fontWeight: 600,
                margin: "0px 5px",
              }}
            >
              Sign up
            </Link>
          </Box>

          {/* <AuthSocialLinks/> */}
        </Box>
      </AuthWrapper>
    </>
  );
};

export default Login;
