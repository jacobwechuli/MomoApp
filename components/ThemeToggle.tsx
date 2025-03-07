import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export default function ThemeToggle() {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        return null;
    } 
    const { theme, setTheme } = themeContext;
    return (
        <button
        className="p-2 rounded-md border"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
}