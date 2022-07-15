import React from "react";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const Logout = ({ setValidUser }) => {
  //function to logout
  const navigate = useNavigate();
  const logout = () => {
    setValidUser(false);
    navigate("/");
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
