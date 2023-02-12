import React from "react";
import styles from "./home.module.scss";

import { Button } from "src/@components";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Mars 2049</h1>
        <Button text="play" onClick={() => navigate("/rooms")} color="yellow" />
      </div>
    </div>
  );
};

export default Home;
