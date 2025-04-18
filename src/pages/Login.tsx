import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Login.module.css";
import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [id, setId] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id === "test") {
      login(id);
      navigate("/");
    } else {
      alert("invalid ID");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <h2 className={styles.title}>PFP-10</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="LOGIN ID: test"
          value={id}
          onChange={handleOnChange}
          name="id"
        />
        <button className={styles.button}>LOGIN</button>
      </form>
    </div>
  );
}
