import React from "react";
import { NextPage } from "next";

const Secure: NextPage = () => {
  return <div>Secure</div>;
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { cookies } = req;

  if (!cookies.auth) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Secure;
