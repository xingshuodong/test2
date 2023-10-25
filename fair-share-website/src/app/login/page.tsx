import LoginFormPage from "./LoginForm/LoginForm";
import styles from "./page.module.css";

export const metadata = {
  title: "Login - Fair Site",
};

const LoginPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.loginText}>
          <h1 className={styles.heading}>Login now!</h1>
          <p className={styles.subheading}>Login now to connect with us.</p>
        </div>
        <div className={styles.loginForm}>
          <LoginFormPage/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;