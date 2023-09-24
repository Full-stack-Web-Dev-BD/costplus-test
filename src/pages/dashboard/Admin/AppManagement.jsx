import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import MaterialManagement from "./MaterialManagement/MaterialManagement";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileTab = ({ auth }) => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!auth.user.isAdmin) {
      window.location.href = "#/examples/404";
    }
    if (auth.user.isAdmin) {
      setLoading(false);
    }
  });

  return (
    <div>
      {loading ? (
        <h4
          style={{ fontSize: "26px", textAlign: "center", paddingTop: "100px" }}
        >
          Loading ...
        </h4>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div className="job_tab_wrap">
              <h4 onClick={(e) => console.log(auth)}>Admin Panel</h4>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Materials" {...a11yProps(0)} />
              </Tabs>
            </div>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <MaterialManagement />
          </CustomTabPanel>
        </Box>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(ProfileTab);
