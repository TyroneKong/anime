import React from "react";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Navigate } from "react-router-dom";
const Logout = ({ setValidUser }) => {
  const logout = () => {
    setValidUser(false);

    <Navigate to="/login" />;
    window.localStorage.clear();
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      <Button
        onClick={logout}
        variant="contained"
        size="small"
        endIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
