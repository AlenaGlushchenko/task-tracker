import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Outlet} from "react-router-dom";
import {useTheme} from "@mui/material";

export const Root = () => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: theme.palette.secondary.main
            }}
        >
            <Typography variant="h1" sx={{color: theme.palette.primary.main}}>todos</Typography>
            <Outlet/>
        </Box>
    )
}