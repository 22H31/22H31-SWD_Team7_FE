"use client";
import React from "react";
import styles from "../login/adminLogin.module.css";

// FormInput component for reusable input fields
const FormInput = ({ label, type = "text", value = "", placeholder = "" }) => {
  return (
    <>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type={type}
        className={
          type === "password" ? styles.passwordInput : styles.textInput
        }
        defaultValue={value}
        placeholder={placeholder}
      />
    </>
  );
};

// SignInButton component for the action button
const SignInButton = () => {
  return (
    <button type="submit" className={styles.signInButton}>
      Sign In
    </button>
  );
};

// LoginForm component for the form section
const LoginForm = () => {
  return (
    <section className={styles.loginCard}>
      <h1 className={styles.loginHeading}>Login to Account</h1>
      <p className={styles.loginDescription}>
        Please enter your email and password to continue
      </p>

      <form>
        <FormInput label="Email address or username:" value="" />

        <FormInput label="Password" type="password" />

        <SignInButton />
      </form>
    </section>
  );
};

// Main Dashboard component
function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <div className={styles.backgroundContainer}>
        <div className={styles.contentWrapper}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/378f66393c4787647f2c9a1fa52ce87355d3f0b3ed966b9312852cf511feb888?placeholderIfAbsent=true&apiKey=207f6d0d3ea740fbb9c15c959c23427e"
            alt="Background pattern"
            className={styles.backgroundImage}
          />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;