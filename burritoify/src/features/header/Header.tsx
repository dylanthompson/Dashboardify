import styles from "./Header.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setView } from "../viewSlicer";
import { Dialog } from "../dialog/Dialog";
import { useState } from "react";
import Settings from "../settings/Settings";

export function Header() {
  const title = "Dashboardly";
  let dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.settings} onClick={(e) => handleClickOpen()}>📍</div>
        <div className={styles.settings}>⚙️</div>
        <div className={styles.settings} onClick={() => dispatch(setView("View"))}>👁️</div>
      </div>
      <h1 className={styles.text}>{title}</h1>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <Settings />
        </Dialog>
    </div>
  )
}
