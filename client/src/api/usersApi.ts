import axios from "axios";
import { get_base_url } from "../config/dev_evn_config";

export const FetchLoggedInUserApi = async () => {
    try {
      const { data: usersData } = await axios.get(
        `http://localhost:8080/api/auth/me`
      );
      return usersData;
    } catch (error) {
      console.error(error);
    }
  };


  export const FetchUserFromApi = async (userId: any) => {
    try {
      const { data: userData } = await axios.get(
        `${get_base_url()}/api/auth/getUser/${userId}`
      );
      return userData;
    } catch (error) {
      console.error(error);
    }
  };