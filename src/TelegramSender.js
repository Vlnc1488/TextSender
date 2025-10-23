import React, { useState } from "react";

const TelegramSender = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // данные твоего бота
  const BOT_TOKEN = "8432328027:AAEBmyRvVyjHp1-NVQkPsthqegV2D9nU0tM";
  const ADMIN_ID = "8456999511"; // твой Telegram ID

  const sendMessage = async () => {
    if (!name.trim() || !message.trim()) {
      alert("⚠️ Заполни оба поля: имя и сообщение");
      return;
    }

    const textToSend = `<b>Новое сообщение</b>\n\n👤 Имя: ${name}\n💬 Сообщение: ${message}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const payload = {
      chat_id: ADMIN_ID,
      text: textToSend,
      parse_mode: "HTML",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok) {
        alert("✅ Сообщение отправлено администратору!");
        setName("");
        setMessage("");
      } else {
        alert("❌ Ошибка при отправке: " + data.description);
      }
    } catch (error) {
      alert("⚠️ Ошибка соединения: " + error.message);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Запись</h2>

      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Ваше сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          resize: "none",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2AABEE",
          color: "white",
          cursor: "pointer",
        }}
      >
        Отправить
      </button>
    </div>
  );
};

export default TelegramSender;
