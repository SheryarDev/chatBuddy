import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useMemo,useEffect ,useState} from "react";
import {Login, Signup,Home} from "./components";
import { ThemeContext } from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/darkTheme";
import { lightTheme } from "./Theme/lightTheme";
import {createTheme ,PaletteMode}from "@mui/material";


function App() {

  const storage = typeof window !== "undefined" ? localStorage.theme : "light";
  const [storageTheme, setStorageTheme] = useState(storage);
  const [mode, setMode] = useState<PaletteMode>(storage);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
    setStorageTheme(mode);
  }, [theme, storageTheme, mode]);
  return (
    <>
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
             <Route path="/login" element={<Login/>} />
             <Route path="/signup" element={<Signup/>} />
             <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
        </ThemeContext.Provider>

    </>
  );
}

export default App;
