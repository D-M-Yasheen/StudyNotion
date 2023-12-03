import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { NavBar } from "./components/common/NavBar";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ResetPassword } from "./pages/ResetPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { About } from "./pages/About";
import { ContactUs } from "./pages/ContactUs";
import { Error } from "./pages/Error";
import { PrivateRoute } from "./components/core/Dashboard/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { Index } from "../src/components/core/Dashboard/Setting/Index";
import { AddCourseIndex } from "./components/core/Dashboard/AddCourse/AddCourseIndex";
import { MyCourses } from "./components/core/Dashboard/InstructorCourses/MyCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import { EditCourseIndex } from "./components/core/Dashboard/EditCourse/EditCourseIndex";
import { Catalog } from "./pages/Catalog";
import { AboutCourse } from "./pages/AboutCourse";
import { EnrolledCourse } from "./components/core/Dashboard/EnrolledCourses/EnrolledCourse";
import { Cart } from "./components/core/Dashboard/Cart/Cart";
import { ViewCourse, WatchCourse } from "./pages/ViewCourse";
import { VideoDetails } from "./components/core/ViewCourse/VideoDetails";
import { InstructorDashboard } from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen 
      bg-richblack-900 flex flex-col font-inter ">

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
                <Route path="/dashboard/add-course" element={<AddCourseIndex />} />

                <Route path="/dashboard/instructor" element={<InstructorDashboard />} />

                <Route path="/dashboard/edit-course/:courseId" element={<EditCourseIndex />} />

                <Route path="/dashboard/my-courses" element={<MyCourses />} />
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
