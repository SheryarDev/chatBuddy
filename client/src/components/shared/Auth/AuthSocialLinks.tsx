import React from 'react'
import { Box } from '@mui/material'
const AuthSocialLinks = () => {
  return (
    <Box
    component="div"
    sx={{ display: "flex", justifyContent: "center", mt: 1 }}
  >
    <img
      src="/social/search.png"
      alt="facebook"
      width={30}
      height={30}
    />
    <img
      src="/social/facebook.png"
      alt="facebook"
      width={30}
      height={30}
      style={{ margin: "0 10px" }}
    />
    <img
      src="/social/apple.png"
      alt="facebook"
      width={30}
      height={30}
    />
  </Box>
  )
}

export default AuthSocialLinks