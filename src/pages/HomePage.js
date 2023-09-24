import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Home from "./Home";
import Upgrade from "./Upgrade";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import Jobs from "./Jobs/Jobs";
import SceduleJobs from "./Jobs/SceduleJobs";
import DashboardPage from "./dashboard/DashboardPage";
import MaterialandQuestions from "./Jobs/MaterialandQuestions";
// import Materials from './dashboard/JobsZone/Materials';
// import UploadPart from './dashboard/JobsZone/UploadPart';
// import Parts from './dashboard/JobsZone/Parts/Parts';
import FileUpload from "./dashboard/JobsZone/Upload/FileUpload";
import ChooseService from "./dashboard/JobsZone/Parts/ChooseService";
import ProfileTabs from "./dashboard/JobsZone/ProfileTabs";
import { connect, useDispatch } from "react-redux";
import { LOGIN_SUCCESS, SET_USER } from "../store/actions/actionTypes";
import jwtDecode from "jwt-decode";
import { NotAuthenticated } from "./examples/NotAuthenticated";
import axios from "axios";
import { BASE_URL, authTokenInHeader } from "../utils/constant";
import JobDetails from "./dashboard/JobsZone/JobDetails";
import MyAllParts from "./Jobs/MyAllParts";
import ContactPage from "./dashboard/Contact/ContactPage";
import "./app.css";
import Scedule from "./Jobs/Scedule";
import Subscription from "./dashboard/Subscription/Subscription";
import AppManagement from "./dashboard/Admin/AppManagement";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const AdminRouteWithLoader = ({ user, component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      window.location.href = "/#/examples/404";
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const fetchUser = async (userID) => {
    if (!userID) {
      return {};
    }
    const response = await axios.get(`${BASE_URL}/api/users/${userID}`, {
      headers: authTokenInHeader(),
    });
    return response.data;
  };
  useEffect(() => {
    const initApp = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        dispatch({ type: LOGIN_SUCCESS, payload: decodedToken.user });
        setAuthenticated(true);
        if (decodedToken?.user?.id) {
          const userDetails = await fetchUser(decodedToken?.user?.id);
          dispatch({ type: SET_USER, payload: userDetails });
        }
      }
    };
    initApp();
  }, [dispatch]);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        loaded ? ( // Check if loaded
          authenticated ? ( // Check if authenticated
            <>
              <Sidebar />
              <main className="content">
                <Navbar />
                <Component {...props} />
                <Footer
                  toggleSettings={toggleSettings}
                  showSettings={showSettings}
                />
              </main>
            </>
          ) : (
            <div>
              <NotAuthenticated />
            </div>
          )
        ) : (
          <Preloader show={true} />
        )
      }
    />
  );
};
const HomePage = () => (
  <>
    <Switch>
      <RouteWithSidebar
        exact
        path={"/app-management"}
        component={AppManagement}
      />
      <RouteWithLoader exact path={Routes.Home.path} component={Home} />
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <RouteWithLoader
        exact
        path={Routes.ForgotPassword.path}
        component={ForgotPassword}
      />
      <RouteWithLoader
        exact
        path={Routes.ResetPassword.path}
        component={ResetPassword}
      />
      <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
      <RouteWithLoader
        exact
        path={Routes.NotFound.path}
        component={NotFoundPage}
      />
      <RouteWithLoader
        exact
        path={"#/examples/404"}
        component={NotAuthenticated}
      />
      <RouteWithLoader
        exact
        path={Routes.ServerError.path}
        component={ServerError}
      />

      {/* pages */}
      <RouteWithSidebar
        exact
        path={Routes.Dashboard.path}
        component={DashboardPage}
      />
      {/* Jobs Flow -> New Job -> Enter job title -> Upload your CAD file -> Material and Questions (CAD render & analysis) */}
      <RouteWithSidebar exact path={"/jobs"} component={Jobs} />
      <RouteWithSidebar exact path={"/scedule-job"} component={SceduleJobs} />
      <RouteWithSidebar
        exact
        path="/job-details/:jobId"
        component={JobDetails}
      />
      <RouteWithSidebar
        exact
        path={"/choose-service/:jobId"}
        component={ChooseService}
      />
      <RouteWithSidebar
        exact
        path={"/upload-file/:jobId"}
        component={FileUpload}
      />
      <RouteWithSidebar
        exact
        path={"/material-and-questions/:partsID"}
        component={MaterialandQuestions}
      />
      <RouteWithSidebar exact path={"/myprofile"} component={ProfileTabs} />
      <RouteWithSidebar exact path={"/parts"} component={MyAllParts} />
      <RouteWithSidebar exact path={"/contact"} component={ContactPage} />
      <RouteWithSidebar exact path={"/scedule"} component={Scedule} />
      <RouteWithSidebar exact path={"/subscription"} component={Subscription} />

      {/* old */}
      <RouteWithSidebar
        exact
        path={Routes.DashboardOverview.path}
        component={DashboardPage}
      />
      <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
      <RouteWithSidebar
        exact
        path={Routes.Transactions.path}
        component={Transactions}
      />
      <RouteWithSidebar
        exact
        path={Routes.Settings.path}
        component={Settings}
      />
      <RouteWithSidebar
        exact
        path={Routes.BootstrapTables.path}
        component={BootstrapTables}
      />

      {/* components */}
      <RouteWithSidebar
        exact
        path={Routes.Accordions.path}
        component={Accordion}
      />
      <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
      <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
      <RouteWithSidebar
        exact
        path={Routes.Breadcrumbs.path}
        component={Breadcrumbs}
      />
      <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
      <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
      <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
      <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
      <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
      <RouteWithSidebar
        exact
        path={Routes.Pagination.path}
        component={Pagination}
      />
      <RouteWithSidebar
        exact
        path={Routes.Popovers.path}
        component={Popovers}
      />
      <RouteWithSidebar
        exact
        path={Routes.Progress.path}
        component={Progress}
      />
      <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
      <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
      <RouteWithSidebar
        exact
        path={Routes.Tooltips.path}
        component={Tooltips}
      />
      <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

      {/* documentation */}
      <RouteWithSidebar
        exact
        path={Routes.DocsOverview.path}
        component={DocsOverview}
      />
      <RouteWithSidebar
        exact
        path={Routes.DocsDownload.path}
        component={DocsDownload}
      />
      <RouteWithSidebar
        exact
        path={Routes.DocsQuickStart.path}
        component={DocsQuickStart}
      />
      <RouteWithSidebar
        exact
        path={Routes.DocsLicense.path}
        component={DocsLicense}
      />
      <RouteWithSidebar
        exact
        path={Routes.DocsFolderStructure.path}
        component={DocsFolderStructure}
      />
      <RouteWithSidebar
        exact
        path={Routes.DocsBuild.path}
        component={DocsBuild}
      />
      <RouteWithSidebar
        exact
        path={Routes.DocsChangelog.path}
        component={DocsChangelog}
      />

      <Redirect to={Routes.NotFound.path} />
    </Switch>
  </>
);
export default HomePage;
