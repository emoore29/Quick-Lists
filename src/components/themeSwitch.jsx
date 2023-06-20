import { useState } from "react";
import useDarkMode from "../utils/useDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitch() {
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
          moonColor="#ecdac4"
          sunColor="#8f5843"
          size={50}
        />
      </div>
    </>
  );
}
