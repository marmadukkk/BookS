import React from "react";
import { createRoot } from "react-dom/client"; // Импорт функции createRoot из react-dom/client для рендеринга приложения
import App from "./App"; // Импорт основного компонента приложения

// Получаем контейнер, в который будет рендериться приложение
const container = document.getElementById("root");

// Создаем корневой элемент с помощью createRoot, передавая контейнер
const root = createRoot(container);

// Рендерим приложение внутри корневого элемента
root.render(
  <React.StrictMode>
    {/* StrictMode — это инструмент для выявления потенциальных проблем в приложении */}
    <App /> {/* Основной компонент приложения */}
  </React.StrictMode>
);
