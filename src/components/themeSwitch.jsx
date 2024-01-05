import { useState } from "react";
import useDarkMode from "../utils/useDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitch({ color, dmColor }) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(checked ? "dark" : "light");
    setDarkMode(checked);
  };

  const handleButtonClick = () => {
    toggleDarkMode(!darkMode);
  };

  return (
    <>
      <button
        aria-label="Toggles dark mode"
        onClick={handleButtonClick}
        role="switch"
      >
        <DarkModeSwitch
          onChange={toggleDarkMode}
          checked={darkMode}
          moonColor={dmColor}
          sunColor={color}
          size={30}
        />
      </button>
    </>
  );
}
