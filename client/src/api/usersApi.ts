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


  export const FetchUserFromApi = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/getUser/${userId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };