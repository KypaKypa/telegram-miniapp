import React, { useEffect } from "react";
import { mountMainButton, mainButtonState } from "@telegram-apps/sdk-react";

function App() {
  useEffect(() => {
    // Монтируем кнопку и задаём параметры
    const mainButton = mountMainButton({
      text: "Отправить",
      isVisible: true,
      isActive: true,
      onClick: () => {
        window.Telegram.WebApp.sendData(JSON.stringify({ hello: "world" }));
      }
    });

    // Чистим после размонтирования
    return () => mainButton.unmount();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Mini App через новую версию SDK</h1>
      <p>Рабочая кнопка Telegram MainButton.</p>
      <div>
        <b>Состояние MainButton:</b>{" "}
        {mainButtonState.text} |{" "}
        {mainButtonState.isVisible ? "Видим" : "Скрыт"} |{" "}
        {mainButtonState.isActive ? "Активен" : "Неактивен"}
      </div>
    </div>
  );
}

export default App;
