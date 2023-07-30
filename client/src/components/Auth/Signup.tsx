import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AuthWrapper from "../shared/Auth/AuthWrapper";
import { SignupApi } from "../../api/Auth";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  ConfirmPassword: Yup.string()
    .required("Confirm password is Required.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [message] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      const { name, email, password } = values;
      const data = { name, email, password };
      const response = await SignupApi(data);
      console.log("response", response);
      if (response) {
        navigate("/login");
      }
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
            Sign Up
          </Typography>
          {message && (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          )}
          <TextField
            placeholder="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ my: 1 }}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ my: 1 }}
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
          <TextField
            placeholder="Confirm Password"
            name="ConfirmPassword"
            value={formik.values.ConfirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ConfirmPassword &&
              Boolean(formik.errors.ConfirmPassword)
            }
            helperText={
              formik.touched.ConfirmPassword && formik.errors.ConfirmPassword
            }
            sx={{ my: 1 }}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{
              borderRadius: "10px",
              mt: 1,
              textTransform: "capitalize",
            }}
          >
            Sign up
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
              Already have an Account?
            </Typography>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "12px",
                  fontWeight: 600,
                  margin: "0px 5px",
                }}
              >
                Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </AuthWrapper>
    </>
  );
};

export default Signup;
