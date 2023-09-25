import styles from "./Header.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setView } from "../viewSlicer";

export function Header() {
  const title = "Dashboardly";
  let dispatch = useAppDispatch();
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.settings}>📍</div>
        <div className={styles.settings}>⚙️</div>
        <div className={styles.settings} onClick={() => dispatch(setView("View"))}>👁️</div>
      </div>
      <h1 className={styles.text}>{title}</h1>
    </div>
  )
}
