
import { useEffect, useCallback, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  // Sử dụng useCallback để tránh re-render liên tục
  const getProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Lỗi khi tải hồ sơ:", error);
    }
  }, []);

  // useEffect chỉ chạy một lần khi component mount
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div>
      <h1>Hồ sơ của bạn</h1>
      {profile ? (
        <div>
          <p>Tên: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default Profile;
