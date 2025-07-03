import React, { useState, useEffect } from "react";

function isTelegram() {
  return window.Telegram && window.Telegram.WebApp;
}

function getTheme() {
  if (isTelegram()) {
    // colorScheme может быть "dark" или "light"
    return window.Telegram.WebApp.colorScheme || "light";
  }
  return "light";
}

export default function App() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    if (isTelegram()) {
      // Подписка на изменение темы
      window.Telegram.WebApp.onEvent("themeChanged", () => {
        setTheme(getTheme());
      });
    }
  }, []);

  const colors =
    theme === "dark"
      ? {
          background: "#23262F",
          color: "#fff",
          button: "#377df7"
        }
      : {
          background: "#fff",
          color: "#23262F",
          button: "#377df7"
        };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.color,
        padding: 24
      }}
    >
      <h1>Telegram Mini App</h1>
      <div style={{ margin: "24px 0" }}>
        <button
          style={{
            marginRight: 16,
            padding: "12px 24px",
            background: colors.button,
            color: "#fff",
            border: "none",
            borderRadius: 18,
            fontWeight: "bold",
            fontSize: 24,
            cursor: "pointer"
          }}
          onClick={() => alert("Форма: Задать вопрос")}
        >
          Задать вопрос
        </button>
        <button
          style={{
            padding: "12px 24px",
            background: "transparent",
            color: colors.button,
            border: `2px solid ${colors.button}`,
            borderRadius: 18,
            fontWeight: "bold",
            fontSize: 24,
            cursor: "pointer"
          }}
          onClick={() => alert("Форма: Получить консультацию")}
        >
          Получить консультацию
        </button>
      </div>
      {/* Убрали вывод темы */}
    </div>
  );
}
