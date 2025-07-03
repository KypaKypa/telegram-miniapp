import React, { useState, useEffect } from "react";

// Проверка: в Telegram ли мы
function isTelegram() {
  return window.Telegram && window.Telegram.WebApp;
}

function getTheme() {
  // Попробуем получить тему из Telegram
  if (isTelegram()) {
    return window.Telegram.WebApp.colorScheme || "light";
  }
  // Fallback: светлая тема
  return "light";
}

export default function App() {
  const [theme, setTheme] = useState(getTheme());

  // Подписка на изменение темы в Telegram
  useEffect(() => {
    if (isTelegram()) {
      window.Telegram.WebApp.onEvent("themeChanged", () => {
        setTheme(getTheme());
      });
    }
  }, []);

  // Стили под темы
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
            borderRadius: 10,
            fontWeight: "bold",
            fontSize: 18,
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
            borderRadius: 10,
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer"
          }}
          onClick={() => alert("Форма: Получить консультацию")}
        >
          Получить консультацию
        </button>
      </div>
      <div style={{ opacity: 0.6 }}>
        <small>Тема: {theme === "dark" ? "тёмная" : "светлая"}</small>
      </div>
    </div>
  );
}
