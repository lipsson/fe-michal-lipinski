import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        background: {
            default: "#f5f5f5",
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    shape: {
        borderRadius: 12,
    },
});
