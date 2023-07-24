import React from "react";
import {
  Box,
  TextField,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@mui/material";

const Chat = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
            width: "100%",
            p: 1.5,
          }}
        >
          <Grid item xs={1}>
            <Avatar sx={{ width: "50px", height: "50px" }} />
          </Grid>
          <Grid item xs={11}>
            <Typography>Sheryar</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "60%",  }}></Box>
      <Box sx={{ height: "149px", }}>
        <TextField
          multiline
          rows={3}
          placeholder="Write you message.."
          fullWidth
          inputProps={{
            style: {
              border: "none",
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button variant="contained" sx={{ width: "150px" }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
