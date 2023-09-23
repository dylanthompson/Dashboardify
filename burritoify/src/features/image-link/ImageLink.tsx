import { useState } from "react"

import { Box } from '@mui/material';
import styles from "./ImageLink.module.css"
import { useAppSelector } from "../../app/hooks";

export const FORM_FIELDS_ImageLink = [
  {
    name: 'link',
    type: 'string',
  },
  {
    name: 'image',
    type: 'string',
  }
]

export function ImageLink(props: any) {
  let view = useAppSelector((state) => state.view.view);
  const widgets = useAppSelector(state => state.dashboardWidgets.widgets);
  let curWidget = widgets.find((w: any) => w.i == props.i);
  return (
    <Box className={styles.imageLink}>
      <a className={styles.link} href={view === "Edit" ? undefined : curWidget?.link}>
        <img className={styles.image} src="//images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940" />
      </a>
    </Box>
  )
}


