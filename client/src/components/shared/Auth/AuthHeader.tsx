import { Typography } from '@mui/material'

const AuthHeader = () => {
  return (
    <header>
       <Typography
          sx={{
            fontWeight: 700,
            fontSize: "24px",
            color: "primary.main",
            cursor: "pointer",
          }}

        >
          ChatBuddy
        </Typography>
    </header>
  )
}

export default AuthHeader