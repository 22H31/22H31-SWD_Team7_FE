"use client";
import React, { useState, useEffect } from "react";
import styles from "../teamManage/teamPage.module.css";
import TeamHeader from "../teamManage/teamHeader";
import TeamMemberCard from "../teamManage/teamMemberCard";
import FontLoader from "../teamManage/FontLoader";
import PopupForm from "./PopupForm";
import PopupEditForm from "./PopupEditForm";
import BlockPopup from "./BlockPopup"; 

function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToBlock, setMemberToBlock] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/User");
      if (!response.ok) throw new Error("Failed to fetch members");

      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleAddMember = async (newMember) => {
    try {
      const response = await fetch("https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/User/create_staff_accout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) throw new Error("Failed to add member");

      handleClosePopup();
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setShowEditPopup(true);
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      console.log("Updating member:", updatedMember);
      const response = await fetch(`https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/User/${updatedMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMember),
      });

      if (!response.ok) throw new Error("Failed to update member");
      
      setTeamMembers((prev) =>
        prev.map((member) => (member.id === updatedMember.id ? updatedMember : member))
      );
      setShowEditPopup(false);
      setEditingMember(null);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleOpenBlockPopup = (member) => {
    setMemberToBlock(member);
    setShowBlockPopup(true);
  };

  const handleCloseBlockPopup = () => {
    setShowBlockPopup(false);
    setMemberToBlock(null);
  };

  const handleToggleBlockMember = async () => {
    if (!memberToBlock) return;
  
    const isBlocked = memberToBlock.lockoutEnd && memberToBlock.lockoutEnd !== "0001-01-01T00:00:00";
    const newLockoutEnd = isBlocked ? "0001-01-01T00:00:00" : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  
    try {
      const response = await fetch(
        `https://swdteam7-hfgrdwa4dfhbe0ga.southeastasia-01.azurewebsites.net/api/User/toggle-lock/${memberToBlock.id}`, // Giữ ID trong URL
        {
          method: "POST", // Dùng POST theo yêu cầu API
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lockoutEnd: newLockoutEnd }), // Gửi dữ liệu cần thiết
        }
      );
  
      if (!response.ok) throw new Error("Failed to toggle block status");
  
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === memberToBlock.id ? { ...m, lockoutEnd: newLockoutEnd } : m))
      );
      handleCloseBlockPopup();
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };
  
  
  return (
    <main className={styles.pageContainer}>
      <FontLoader />
      <section className={styles.content}>
        <TeamHeader onOpenPopup={handleOpenPopup} />
        <div className={styles.teamMemberGrid}>
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.userName}
              role="Employee"
              email={member.email}
              imageUrl=""
              onEdit={() => setEditingMember(member) || setShowEditPopup(true)}
              onBlock={() => handleOpenBlockPopup(member)}
              isBlocked={member.lockoutEnd && member.lockoutEnd !== "0001-01-01T00:00:00"}
            />
          ))}
        </div>
      </section>

      {showPopup && <PopupForm onClose={handleClosePopup} onSave={handleAddMember} />}
      {showEditPopup && editingMember && (
    <PopupEditForm
      member={editingMember}
      onClose={() => setShowEditPopup(false)}
      onSave={handleUpdateMember} 
    />
  )}
      {showBlockPopup && memberToBlock && (
        <BlockPopup member={memberToBlock} onClose={handleCloseBlockPopup} onBlock={handleToggleBlockMember} />
      )}
    </main>
  );
}
export default TeamPage;
