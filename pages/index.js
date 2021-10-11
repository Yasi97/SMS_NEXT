import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";
import Nav from "../components/navbar";
import Footer from "../components/footer";
import styles from "../styles/Home.module.css";
const Home = () => {
  return (
    <div>
      <Nav />
      <div className={styles.bg}>
        <div>
          <div className={styles.para}>
            <h1
              style={{ textAlign: "right" }}
              className="w3-container w3-center w3-animate-fading container"
            >
              <b> JOIN WITH US NOW </b>
            </h1>
            <p style={{ textAlign: "right", fontSize: "5" }}>
              <b>
                {" "}
                ACHIEVE YOUR FUTURE <br /> GOALS WITH US
                {"    "}
                <br /> <br />
              </b>
            </p>
          </div>
        </div>
        <div>
          <div className={styles.para1}>
            <div
              // style={{ textAlign: "right", fontSize: "6" }}
              className=" w3-animate-bottom container"
            >
              <h1 className={styles.textblock}>
                EXPERIENCE, PRECISION & <br /> EXPERTISE LEARNING{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Home;
