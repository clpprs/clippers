import React from "react";
import classNames from "classnames";

// State
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from "recoil";
import { themeAtom } from "../../state";

import death from "../../themes/death.jpg";
import residence from "../../themes/residence.jpg";

// Edit if needed
function DeathThemeButtons(props) {
  const { theme, themes, setTheme } = props;

  const Button = (props) => (
    <button onClick={() => setTheme(props.name)} className="theme-button">
      <img src={props.img} className="theme-button-image" key={props.name} />
    </button>
  );

  return themes.map((t) => <Button {...t} />);
}

function ResidenceThemeButtons(props) {
  const { theme, themes, setTheme } = props;

  const Button = (props) => (
    <button onClick={() => setTheme(props.name)} className="theme-button">
      <img src={props.img} className="theme-button-image" key={props.name} />
    </button>
  );

  return themes.map((t) => <Button {...t} />);
}

function ThemeSwitcher(props) {
  const theme = useRecoilValue(themeAtom);
  const refreshTheme = useRecoilRefresher_UNSTABLE(themeAtom);

  const themes = [
    { name: "death", img: death },
    { name: "residence", img: residence },
  ];

  const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
    refreshTheme(themeAtom);
  };

  const ThemeButtons =
    theme === "death" ? DeathThemeButtons : ResidenceThemeButtons;

  return (
    <div id="theme-switcher" className={classNames([props.className])}>
      <p className="theme-options-label">Switch theme: </p>
      <div className="theme-options">
        <ThemeButtons theme={theme} themes={themes} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default ThemeSwitcher;
