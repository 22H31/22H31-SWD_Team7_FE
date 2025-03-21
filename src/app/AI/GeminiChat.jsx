import { useState, useEffect, useRef } from "react";
import { Card, Input, Button, Spin, Space } from "antd";
import { MessageOutlined, CloseOutlined, RobotOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { marked } from "marked";

export default function GeminiChat() {
  const [messages, setMessages] = useState(
    () => JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const API_KEY = "AIzaSyACyPpVgICQ8lgV_siqG07DwJ3-hSdr7fE";
  useEffect(() => {
    if (isOpen) {
      setMessages(JSON.parse(localStorage.getItem("chatHistory")) || []);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      timeoutRef.current = setTimeout(() => {
        setMessages([]);
        localStorage.removeItem("chatHistory");
        setStarted(false);
      }, 10000 * 6 * 5);
    } else {
      clearTimeout(timeoutRef.current);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
        }
      );
      const data = await response.json();
      const botReply = marked(
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Xin lỗi, tôi không hiểu."
      );

      setMessages([...newMessages, { sender: "Beauty Love", text: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "Beauty Love", text: "❌ Lỗi: Không thể kết nối đến AI!" },
      ]);
    }
    setLoading(false);
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
              bottom: 50,
              right: 0,
              width: 360,
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
              borderRadius: "16px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
            }}
            title={
              <span style={{ fontWeight: "bold", color: "#333" }}>
                Hỗ trợ với AI{" "}
              </span>
            }
            extra={
              <CloseOutlined
                onClick={() => setIsOpen(false)}
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
                    padding: "5px",
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
                        alignSelf:
                          msg.sender === "You" ? "flex-end" : "flex-start",
                        backgroundColor:
                          msg.sender === "You" ? "#1890ff" : "#f1f1f1",
                        color: msg.sender === "You" ? "#fff" : "#000",
                        padding: "10px",
                        borderRadius: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      <strong>{msg.sender}:</strong>{" "}
                      {msg.sender === "Beauty Love" ? (
                        <p dangerouslySetInnerHTML={{ __html: msg.text }} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
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
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    onPressEnter={sendMessage}
                    style={{ padding: "15px 25px", height: "30px" }}
                  />
                  <Button
                    type="primary"
                    onClick={sendMessage}
                    style={{ padding: "15px 25px", height: "30px" }}
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
        icon={<RobotOutlined />}
        size="large"
        onClick={handleOpen}
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
