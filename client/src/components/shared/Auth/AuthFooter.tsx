import {Box,Typography} from "@mui/material"
const AuthFooter = () => {
  return (
    <footer>
        <Box component="footer">
          <Typography
            sx={{ textAlign: "center", color: "#9CA3AF", fontSize: 12, pt: 4 }}
          >
            2023 ChatBuddy, All rights reserved.
          </Typography>
        </Box>
    </footer>
  )
}

export default AuthFooter