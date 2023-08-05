import React,{useState,useContext} from "react"
import { Box ,Typography,CssBaseline,IconButton,Menu,Avatar,Tooltip,Badge,MenuItem} from '@mui/material'
import { ThemeToggle } from '../shared/ThemeToggle/ThemeToggle'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UserContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
const settings = ['Logout'];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user]=useContext(UserContext)
  const navigate=useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    handleLogout()
  };
  const handleLogout=()=>{
    const token = localStorage.removeItem("token");
    console.log("remove token",token)
    navigate('/login')
  }
  return (
    <>
    <CssBaseline/>
    <Box sx={{backgroundColor:"primary.main",p:2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Box>
          <Typography variant='h5' sx={{color:'white',}}>ChatBuddy</Typography>
        </Box>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <ThemeToggle/>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Box sx={{ flexGrow: 0 ,mx:1}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box><Typography variant="h6" sx={{color:"white"}}>{user?.data?.name}</Typography></Box>
          </Box>
        </Box>
    </Box>
    </>
  )
}

export default Header