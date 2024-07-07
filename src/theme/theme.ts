import { createTheme } from '@mui/material/styles';
import {SimplePaletteColorOptions} from "@mui/material/styles/createPalette";

declare module '@mui/material/styles' {
    interface Palette {
        beige: SimplePaletteColorOptions;
    }
    interface PaletteOptions {
        beige: SimplePaletteColorOptions;
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#e9d9d8",
            contrastText: '#fff',
        },
        secondary: {
            main: '#f5f5f5',
            contrastText: '#000',
        },
        text: {
            primary: '#000',
        },
        beige: {
            main: '#edebe7',
        },
    },
});

export const Pallete = {
    light: lightTheme,
    dark: {},
    //was it worth doing for a dark theme?
};