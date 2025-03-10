"use client";
import React from "react";
import styles from "../teamManage/teamPage.module.css";
import TeamHeader from "../teamManage/teamHeader";
import TeamMemberCard from "../teamManage/teamMemberCard";
import FontLoader from "../teamManage/FontLoader";

function TeamPage() {
  // Sample team member data
  const teamMembers = [
    {
      id: 1,
      name: "Jason Price",
      role: "Admin",
      email: "janick_parisian@yahoo.com",
      imageUrl: "https://placehold.co/100x100/333333/333333",
    },
    // More team members could be added here
  ];

  return (
    <main className={styles.pageContainer}>
         <FontLoader />
      <section className={styles.content}>
        <TeamHeader />
        <div className={styles.teamMemberGrid}>
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              email={member.email}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default TeamPage;