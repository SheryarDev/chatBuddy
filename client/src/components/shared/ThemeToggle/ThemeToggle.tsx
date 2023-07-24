import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { Brightness4 as LightIcon } from "@mui/icons-material";
import { ThemeContext } from "../../../context/ThemeContext";
import DarkIcon from "@mui/icons-material/Brightness4";


export const ThemeToggle = () => {
    const theme = useTheme();
    const colorMode = useContext(ThemeContext);

    return (
        <Box>
            <IconButton sx={{ ml: 1 }} color="inherit" onClick={colorMode.toggleThemeMode}>
                {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
            </IconButton>
        </Box>
    );
};