import React from 'react';
import {ThemeProvider} from "./theme/theme-provider/theme-provider";
import { SnackbarProvider } from 'notistack';
import {CssBaseline} from "@mui/material";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import {Root} from "./routes/root";
import {HomePage} from "./pages/home/home-page";
import './App.css';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<HomePage />}/>
      {/*<Route path="add-task" element={<TaskModal/>}/>*/}
      {/*<Route path="tasks" element={<Content/>}>*/}
      {/*  <Route path=":id" element={<TaskEditModal/>}/>*/}
      {/*</Route>*/}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
));

function App() {
  return (
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline/>
          <RouterProvider router={appRouter}/>
        </SnackbarProvider>
      </ThemeProvider>
  )
}

export default App;
