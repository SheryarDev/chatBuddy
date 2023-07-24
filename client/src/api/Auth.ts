import axios from "axios";
import { get_base_url } from "../config/dev_evn_config";
// import { useContext } from "react";
// import { UserContext } from "../context/auth";
// import { FetchLoggedInUserApi } from "./UserApis";

export const LoginApi = async (data:any) => {
  try {
    const response= await axios.post(`http://localhost:8080/api/auth/login`,data)
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const SignupApi = async (data:any) => {
    try {
      const response= await axios.post(
        `http://localhost:8080/api/auth/signup`,
       data
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

export const ForgotPasswordApi = async (formData: {
  get: (arg0: string) => any;
}) => {
  try {
    const forgotData = await axios.post(
      `${get_base_url()}/api/auth/forgot-password`,
      {
        email: formData.get("email"),
      }
    );

    return forgotData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const ResetPasswordApi = async (
  formData: { get: (arg0: string) => any },
  token: any
) => {
  try {
    const resetData = await axios.post(
      `${get_base_url()}/api/auth/reset-password/${token}`,
      {
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      }
    );

    return resetData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const UpdateUserContextState = async () => {
//   const [userState, setUserState] = useContext(UserContext);

//   const { data: response } = await FetchLoggedInUserApi();

//   if (response && response.user) {
//     setUserState({
//       data: {
//         id: response.user.id,
//         email: response.user.email,
//         name: response.user.name,
//       },
//       loading: false,
//       error: null,
//     });
//   } else if (response && response?.errors?.length) {
//     setUserState({
//       data: null,
//       loading: false,
//       error: response.errors[0].msg,
//     });
//   }
// };
