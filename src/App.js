import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ACCOUNT_TYPE } from "./utils/constants";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Catalog } from "./pages/Catalog";
import { ContactUs } from "./pages/ContactUs";
import { Dashboard } from "./pages/Dashboard";
import { ViewCourse } from "./pages/ViewCourse";
import { AboutCourse } from "./pages/AboutCourse";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ResetPassword } from "./pages/ResetPassword";
import { UpdatePassword } from "./pages/UpdatePassword";

import { NavBar } from "./components/common/NavBar";
import { Cart } from "./components/core/Dashboard/Cart/Cart";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { Index } from "./components/core/Dashboard/Setting/Index";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { PrivateRoute } from "./components/core/Dashboard/PrivateRoute";
import { VideoDetails } from "./components/core/ViewCourse/VideoDetails";
import { MyCourses } from "./components/core/Dashboard/InstructorCourses/MyCourses";
import { AddCourseIndex } from "./components/core/Dashboard/AddCourse/AddCourseIndex";
import { EditCourseIndex } from "./components/core/Dashboard/EditCourse/EditCourseIndex";
import { EnrolledCourse } from "./components/core/Dashboard/EnrolledCourses/EnrolledCourse";
import { InstructorDashboard } from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">

      <NavBar />

      <div className="mt-[55px]"></div>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/course/:courseId" element={<AboutCourse />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />

        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />

        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />


        <Route path="/reset-password" element={
          <OpenRoute>
            <ResetPassword />
          </OpenRoute>
        } />

        <Route path="/update-password/:token" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />

        {
          user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
          (
            <>
              <Route path="/edit-course/:courseId" element={<EditCourseIndex />} />
            </>
          )
        }

        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>

          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/setting" element={<Index />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            (
              <>
                <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/add-course" element={<AddCourseIndex />} />
                {/* <Route path="/dashboard/edit-course/:courseId" element={<EditCourseIndex />} /> */}
              </>
            )
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            (
              <>
                <Route path="/course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />} />
              </>
            )
          }

        </Route>

        <Route path="*" element={<Error />} />

      </Routes>

    </div >
  );
}

export default App;
