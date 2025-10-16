
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({ onSignOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (onSignOut) onSignOut();
    setTimeout(() => navigate("/"), 1000); // redirect after 1s
  }, [onSignOut, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Signing out...</h2>
      <p>You will be redirected to Home shortly.</p>
    </div>
  );
};

export default SignOut;
