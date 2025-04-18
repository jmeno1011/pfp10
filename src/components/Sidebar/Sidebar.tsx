import { Link, useLocation } from "react-router-dom";
import { DashboardIcon, PeopleIcon } from "../../assets/icons";
import useSettingsStore from "../../store/settings";
import styles from "./Sidebar.module.css";

const pages = [
  { id: 1, name: "Overview", path: "/", icon: <DashboardIcon /> },
  { id: 2, name: "Dashboard", path: "/dashboard", icon: <PeopleIcon /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { sidebarState, setSidebarState } = useSettingsStore();
  const toggleSidebar = () => {
    setSidebarState(sidebarState === "OPEN" ? "CLOSE" : "OPEN");
  };

  return (
    <div
      className={`${styles.wrapper} ${
        sidebarState === "CLOSE" ? styles.sidebarClose : ""
      }`}
    >
      <div className={styles.sidebarHeader}>
        {sidebarState === "OPEN" && <h2>PFP-10</h2>}
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {sidebarState === "OPEN" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          )}
        </button>
      </div>
      <div className={styles.divider} />
      <ul className={styles.menu}>
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              to={page.path}
              className={`${styles.link} ${
                pathname === page.path ? styles.active : ""
              }`}
            >
              <span className={styles.icon}>{page.icon}</span>
              {sidebarState === "OPEN" && (
                <span className={styles.text}>{page.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
