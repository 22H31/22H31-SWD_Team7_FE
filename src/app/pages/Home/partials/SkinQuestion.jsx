import "./SkinQuestion.css";

const SkinQuestion = () => {
  return (
    <div className="skin-question-container">
    <div className="depend-div">
      <div className="skin-question-card">
        <img
          src="/SQhome.png"
          alt="Skincare"
          className="skin-question-image"
        />
        <div className="skin-question-content">
          <h3>Câu hỏi về làn da</h3>
          <p>
            Những câu hỏi về chăm da sẽ hình thành thói quen cho làn da của bạn
            ngày càng tươi trẻ
          </p>
          <button className="skin-question-button">Tìm hiểu thêm</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SkinQuestion;
