import { AppLayout } from "./ui/AppLayout";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Appointments } from "./pages/Appointments";
import { Appointment } from "./pages/Appointment";
import { HealthNews } from "./pages/HealthNews";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";
import { Wallet } from "./pages/Wallet";
import SignIn from "./pages/SignIn";
import { PageNotFound } from "./pages/PageNotFound";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { CreateAppointment } from "./pages/CreateAppointment";
import { ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme();

function App() {
  // const { signedIn, signInOut } = useAppContext();

  // return signedIn ? <AppLayout /> : <OutsideAppRoutePage />;
  // return <AppLayout />;
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />{" "}
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />}></Route>
              <Route index path="dashboard" element={<Dashboard />}></Route>
              <Route path="appointments" element={<Appointments />}></Route>
              <Route
                path="schedule-appointment"
                element={<CreateAppointment />}
              ></Route>
              <Route path="appointment/:id" element={<Appointment />}></Route>
              <Route path="health-news" element={<HealthNews />}></Route>
              <Route path="notifications" element={<Notifications />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="wallet" element={<Wallet />}></Route>
            </Route>

            <Route path="signup" element={<SignUp />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

      {/* <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        /> */}
    </>
  );
}

export default App;
