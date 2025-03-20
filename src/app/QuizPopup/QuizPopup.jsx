import { useState, useEffect } from "react";
import { Button, Card, message, Modal, Typography } from "antd";
import { APIGetSkintestQuestion, APIGetSkintestResult } from "../api/api";
import PageLayOut from "../layouts/PageLayOut/PageLayOut";
import "./QuizPage.css"; // Import file CSS nếu cần
import { useNavigate } from "react-router";
import { CheckCircleTwoTone, SkinTwoTone } from "@ant-design/icons";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]); // Lưu danh sách câu hỏi
  const [answersState, setAnswersState] = useState({}); // Lưu câu trả lời người dùng
  const navigate = useNavigate();
  // 🛠️ Gọi API lấy danh sách câu hỏi
  useEffect(() => {
    APIGetSkintestQuestion()
      .then((res) => {
        setQuestions(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  // Xử lý chọn đáp án
  const handleAnswerChange = (questionId, answerId) => {
    setAnswersState({ ...answersState, [questionId]: answerId });
  };

  // 🛠️ Xử lý gửi dữ liệu sau khi hoàn thành quiz
  const handleSubmit = () => {
    const formattedAnswers = Object.values(answersState); // Lấy danh sách answerId

    console.log("User Answers:", formattedAnswers);
    const userId = localStorage.getItem("userID");
    APIGetSkintestResult(userId, formattedAnswers)
      .then((res) => {
        // message.success("Cập nhật loại da của bạn thành công!");
        console.log("API Response:", res.data);
        showResultModal(res.data);
      })
      .catch((err) => console.error("API Error:", err));

    // axios.post("/api/submit-quiz", answersState)
    //   .then((res) => console.log("Submit success:", res.data))
    //   .catch((err) => console.error("Submit error:", err));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title, Text } = Typography;
  const [modalData, setModalData] = useState(null);
  const showResultModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const getSkinTypeConclusion = (skinType) => {
    switch (skinType) {
      case "Oily":
        return "Da bạn thuộc loại dầu, hãy chú ý kiềm dầu và làm sạch đúng cách!";
      case "Dry":
        return "Da bạn thuộc loại khô, cần dưỡng ẩm thường xuyên!";
      case "Combination":
        return "Da hỗn hợp cần sự chăm sóc kỹ lưỡng giữa vùng dầu và vùng khô!";
      case "Normal":
        return "Da bạn cân bằng, ít vấn đề! Hãy tiếp tục chăm sóc tốt!";
      case "Sensitive":
        return "Da nhạy cảm dễ kích ứng, hãy chọn sản phẩm dịu nhẹ!";
      default:
        return "Không xác định được loại da, vui lòng thử lại!";
    }
  };

  return (
    <>
      <PageLayOut>
        <div className="quiz-page">
          <h1>Cập nhật về tình trạng da của bạn</h1>
          {questions.length > 0 ? (
            <div className="questions-container">
              {questions.map((question) => (
                <div key={question.questionId} className="question-box">
                  <h3>{question.questionDetail}</h3>
                  <div className="answer-container">
                    {question.answers.map((answer) => (
                      <button
                        key={answer.answerId}
                        className={`answer-button ${
                          answersState[question.questionId] === answer.answerId
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswerChange(
                            question.questionId,
                            answer.answerId
                          )
                        }
                      >
                        {answer.answerDetail}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Đang tải câu hỏi...</p>
          )}
          <Button
            type="primary"
            onClick={handleSubmit}
            className="submit-button"
          >
            Hoàn thành
          </Button>
          <Modal
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
              navigate("/profile");
            }}
            footer={null}
            centered
            width={500}
          >
            {modalData && (
              <Card
                bordered={false}
                style={{ background: "#FFF0F6", borderRadius: 15 }}
              >
                <Title
                  level={4}
                  style={{ textAlign: "center", color: "#E83E8C" }}
                >
                  Kết quả phân tích da của bạn thuộc loại:
                  <p style={{ color: "black" }}>
                    {modalData.skinType.toUpperCase()}
                  </p>
                </Title>
                <Text strong style={{ color: "#D63384" }}>
                  📅 Ngày phân tích:
                </Text>
                <Text>
                  {" "}
                  {new Date(modalData.rerultCreateAt).toLocaleString()}
                </Text>
                <br />
                <Text strong style={{ color: "#D63384" }}>
                  💧 Da Dầu:
                </Text>{" "}
                {modalData.totalSkinOilyScore}
                <br />
                <Text strong style={{ color: "#D63384" }}>
                  🌵 Da Khô:
                </Text>{" "}
                {modalData.totalSkinDryScore}
                <br />
                <Text strong style={{ color: "#D63384" }}>
                  🔄 Da Hỗn Hợp:
                </Text>{" "}
                {modalData.totalSkinCombinationScore}
                <br />
                <Text strong style={{ color: "#D63384" }}>
                  🍃 Da Nhạy Cảm:
                </Text>{" "}
                {modalData.totalSkinSensitiveScore}
                <br />
                <Text strong style={{ color: "#D63384" }}>
                  😊 Da Thường:
                </Text>{" "}
                {modalData.totalSkinNormalScore}
                <br />
                <Card
                  style={{
                    marginTop: 10,
                    background: "#F8D7DA",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text strong style={{ color: "#721C24" }}>
                    📌 Kết Luận:
                  </Text>
                  <p style={{ color: "#721C24" }}>
                    {getSkinTypeConclusion(modalData.skinType)}
                  </p>
                </Card>
              </Card>
            )}
          </Modal>
        </div>
      </PageLayOut>
    </>
  );
}
