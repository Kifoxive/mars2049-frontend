import React from "react";
import styles from "./home.module.scss";

import { Button } from "src/@components";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>
          Mars 2049 <span>BETA</span>
        </h1>
        <Button text="play" onClick={() => navigate("/rooms")} color="green" />
        {/* <Button
          text="rulebook"
          onClick={() =>
            (window.location.href =
              "https://issuu.com/dagnisskurbe/docs/mars_rulebook_en_final_a5_preview")
          }
          color="yellow"
        /> */}
        <Button
          text="credits"
          onClick={() => navigate("/credits")}
          color="yellow"
        />
      </div>
      <p className={styles.version}>BETA</p>
    </div>
  );
};

export default Home;
