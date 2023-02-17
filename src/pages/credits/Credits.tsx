import React from "react";
import styles from "./credits.module.scss";

const Credits: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header>
          <h2>Credits</h2>
        </header>
        <div className={styles.section}>
          <p>
            Mission to Mars 2049 is a strategic family board game where you
            build a colony on Mars in a race to reach the planet’s North Pole,
            but hostile parties are standing in your way. The rules of the game
            can be{" "}
            <a
              href="https://issuu.com/dagnisskurbe/docs/mars_rulebook_en_final_a5_preview"
              target="_blank"
              rel="noreferrer"
            >
              found here
            </a>
            .
          </p>
          <p>
            The page is an unofficial online web version of the board game of
            the same name, with an open{" "}
            <a
              href="https://github.com/Kifoxive/mars2049-frontend"
              target="_blank"
              rel="noreferrer"
            >
              source code
            </a>{" "}
            written in Typescript.
          </p>
          <p>
            The first release of the BETA version took place on February 17,
            2023. We will be adding mission cards in the near future and a
            mobile version.
          </p>
          <p>
            We do not take ownership of this game and do not sell its
            trademarks. You can view official pages on{" "}
            <a
              href="https://www.facebook.com/mars2049/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook.
            </a>
          </p>
          <p>
            If you have ideas to improve the game, or if you notice a bug, you
            can{" "}
            <a
              href="mailto::palianycia@seznam.cz"
              target="_blank"
              rel="noreferrer"
            >
              contact the developer :-)
            </a>
          </p>
          <p className={styles.author}>
            developer/design: Kifoxive
            <br /> Happy colonization!
          </p>
        </div>
        <div className={styles.section}>
          <a
            className={styles.flaticon}
            href="https://www.flaticon.com/free-icons/"
            title="icons"
            rel="noreferrer"
          >
            Icons were designed by Umeicon, deemakdaksina, Tomas Knop,
            Muhammad_Usman, Nuricon, Tanah Basah, Vectorslab, Roundicons Premium
            and Freepik — Flaticon
          </a>
        </div>
      </div>
      <footer>Copyright © 2023 Kifoxive </footer>
    </div>
  );
};

export default Credits;
