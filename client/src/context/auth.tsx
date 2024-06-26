import React, { createContext, useEffect, useState,ReactNode } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FetchLoggedInUserApi } from "../api/usersApi";

type decodedToken={
  email:string,
  iat:number,
  exp:number
}

interface User {
  data: {
    id: string;
    email: string;
    name: string;
  }
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([
  {
    data: {id:"",email:"",name:""},
    loading: true,
    error: null,
  },
  () => {},
]);


const UserProvider = ({ children }:  { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    data: {id:"",email:"",name:""},
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken:decodedToken= jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("User");
    } else {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  }

  const fetchUser = async () => {
    const { data: response } = await FetchLoggedInUserApi();
    console.log("loggedinuser",response)

    if (response && response.user) {
      setUser({
        data: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,

        },
        loading: false,
        error: null,
      });
    } else if (response && response?.errors?.length) {
      setUser({
        data: {id:"",email:"",name:""},
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };
console.log("token",token)
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: {id:"",email:"",name:""},
        loading: false,
        error: null,
      });
    }
  }, []);



  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
