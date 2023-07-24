import { Box ,Typography,CssBaseline} from '@mui/material'
import { ThemeToggle } from '../shared/ThemeToggle/ThemeToggle'

const Header = () => {
  return (
    <>
    <CssBaseline/>
    <Box sx={{backgroundColor:"primary.main",p:2,display:"flex",justifyContent:"space-between"}}>
        <Box>
          <Typography variant='h5' sx={{color:'white',}}>ChatBuddy</Typography>
        </Box>
        <Box>
          <ThemeToggle/>
        </Box>
    </Box>
    </>
  )
}

export default Header