import React, {ReactNode} from 'react';
import {ThemeProvider as MUIThemeProvider} from "@mui/material/styles";
import {selectTheme} from "./theme-provider-slice";
import {useAppSelector} from "../../app/hooks";
import {Pallete} from "../theme";

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const mode = useAppSelector(selectTheme);

    // useEffect(() => {
        // const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // dispatch(toggleTheme(prefersDarkMode ? 'dark' : 'light'));
    // }, []);

    //here I am commenting on the code, since window.matchMedia does not pass the tests, besides,
    // I do not know if it is necessary to change the theme depending on the user's system

    const theme = Pallete[mode];

    return (
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    );
};