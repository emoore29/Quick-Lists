import { useState } from "react";
import useDarkMode from "../utils/useDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitch({ secondaryColor }) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <>
      <div>
        <DarkModeSwitch
          style={{ marginRight: "2rem" }}
          checked={darkMode}
          onChange={toggleDarkMode}
          moonColor={secondaryColor}
          sunColor={secondaryColor}
          size={50}
        />
      </div>
    </>
  );
}
