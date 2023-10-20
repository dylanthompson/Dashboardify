import { Box } from '@mui/material';
import { useAppSelector } from "../../app/hooks";
import styles from "./ImageLink.module.css";

export const FORM_FIELDS_ImageLink = [
  {
    name: 'link',
    type: 'string',
  },
  {
    name: 'image',
    type: 'image',
  }
]

export function ImageLink(props: any) {
  let view = useAppSelector((state) => state.view.view);
  const widgets = useAppSelector(state => state.dashboardWidgets.widgets);
  let curWidget = widgets.find((w: any) => w.i == props.i);
  return (
    <Box className={styles.imageLink}>
      <a className={styles.link} href={view === "Edit" ? undefined : curWidget?.link}>
        <div className={styles.background}>
          <img src={curWidget?.image}/>
        </div>
        <img className={styles.image} src={curWidget?.image} />
      </a>
    </Box>
  )
}


