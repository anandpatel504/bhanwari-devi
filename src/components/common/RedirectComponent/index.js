import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { getQueryVariable } from "../../../common/utils";
import { METHODS } from "../../../services/api";
import { PATHS } from "../../../constant";

function RedirectComponent() {
  const [emailId, setEmailId] = useState(null);
  // const uri = window.location.href;
  // const uri = `https://www.merakilearn.org/redirect?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MSIsImVtYWlsIjoicG9vbmFtMTlAbmF2Z3VydWt1bC5vcmciLCJpYXQiOjE2NDU1MDgwNDIsImV4cCI6MTY3NzA2NTY0Mn0.az9n0hnUmj_2jHzj7LJ6ldAa_f74_gECF1BBDIzgU44&redirectUrl=admission`;

  const token = getQueryVariable("token");
  // undefined => "", remove leading slashes in redirect
  const redirect = (getQueryVariable("redirectUrl") || "").replace(/^\/+/g, "");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    }).then((res) => {
      if (res.data.user.email) {
        setEmailId(res.data.user.email);
      }
    });
  }, []);

  if (emailId && !emailId.includes("@fake.com")) {
    localStorage.setItem("Token", token);
  }

  return (
    <>
      {emailId ? (
        <Redirect
          to={!emailId.includes("@fake.com") ? "/" + redirect : PATHS.LOGIN}
        />
      ) : null}
    </>
  );
}

export default RedirectComponent;
