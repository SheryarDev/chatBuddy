import React, { ReactNode} from "react";
import { Box,} from "@mui/material";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";



interface Props {
    children: ReactNode;
  }

const AuthWrapper: React.FC<Props>  = ({ children}) => {

  return (
    <>

      <Box
        component="div"
        sx={{
          backgroundColor: "#F8F7FB",
          p: 3,
          maxWidth: "1349px",
          mx: "auto",
        }}
      >

        <AuthHeader/>

        <Box
          component="div"
          sx={{
            height: "600px",
            boxShadow: 4,
            borderRadius: "12px",
            mx: { md: 6, lg: 8, laptop: 12 },
            my: 4,
            display: "flex",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              p: 4,
              display: { xs: "none", sm: "block" },
              width: { sm: "50%" },

            }}
            component="div"
          >
            <Box sx={{position:"relative",width:"100%",height:"100%"}}>
            <img
              src="/AuthCover.png"
              alt="Auth Cover Image"
              style={{ width: "100%", height: "550px",}}
            />
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 0, sm: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
            }}
            component="div"
          >

          {children}
          </Box>


        </Box>


        <AuthFooter/>
      </Box>
    </>
  );
};

export default AuthWrapper;
