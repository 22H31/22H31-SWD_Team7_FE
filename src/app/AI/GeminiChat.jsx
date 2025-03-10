import { useState, useEffect, useRef } from "react";
import { Card, Input, Button, List, Spin, Space } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

export default function GeminiChat() {
  const [messages, setMessages] = useState(
    () => JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false); // Kiểm tra đã nhấn "Bắt đầu" chưa
  const messagesEndRef = useRef(null);
  const timeoutRef = useRef(null);

  const apiKey = "AIzaSyAmyTKACXkQYdiKC6Yw3G4AcfuADdFGXM4"; // Thay bằng API Key của bạn

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));

    if (started) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      const chatContainer = messagesEndRef.current?.parentElement;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages, started]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
        }
      );

      const data = await response.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Xin lỗi, tôi không hiểu.";
      setMessages([...newMessages, { sender: "Gemini", text: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "Gemini", text: "❌ Lỗi: Không thể kết nối đến AI!" },
      ]);
    }
    setLoading(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setStarted(false);

    // Hủy bỏ timeout nếu mở lại chat
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);

    // Xóa dữ liệu sau 5 phút
    timeoutRef.current = setTimeout(() => {
      setMessages([]);
      localStorage.removeItem("chatHistory");
    }, 1 * 60 * 1000);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Card
            style={{
              position: "absolute",
              bottom: 60,
              right: 0,
              width: 360,
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
              borderRadius: "16px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
            }}
            title={
              <span style={{ fontWeight: "bold", color: "#333" }}>
                💬 Chatbox
              </span>
            }
            extra={
              <CloseOutlined
                onClick={handleCloseChat}
                style={{ cursor: "pointer", color: "#888" }}
              />
            }
          >
            {!started ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Button
                  type="primary"
                  onClick={() => setStarted(true)}
                  style={{ fontSize: "16px", padding: "10px 20px" }}
                >
                  Bắt đầu
                </Button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    height: 280,
                    overflowY: "auto",
                    borderRadius: "10px",
                    padding: "8px",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        maxWidth: "75%",
                        alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                        backgroundColor: msg.sender === "You" ? "#1890ff" : "#f1f1f1",
                        color: msg.sender === "You" ? "#fff" : "#000",
                        padding: "10px",
                        borderRadius: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))}
                </div>

                {loading && (
                  <Spin
                    style={{
                      display: "block",
                      textAlign: "center",
                      margin: "8px 0",
                    }}
                  />
                )}
                <div ref={messagesEndRef} />
                <Space.Compact
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    onPressEnter={sendMessage}
                  />
                  <Button
                    type="primary"
                    onClick={sendMessage}
                    style={{ padding: "15px 25px" }}
                  >
                    Gửi
                  </Button>
                </Space.Compact>
              </>
            )}
          </Card>
        </motion.div>
      )}
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        onClick={handleOpenChat}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          backgroundColor: "#1890ff",
          border: "none",
          transition: "all 0.3s",
        }}
      />
    </div>
  );
}
