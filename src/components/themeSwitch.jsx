import { useState } from "react";
import useDarkMode from "../utils/useDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitch({ color, dmColor }) {
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
          style={{}}
          checked={darkMode}
          onChange={toggleDarkMode}
          moonColor={dmColor}
          sunColor={color}
          size={40}
        />
      </div>
    </>
  );
}
