import { Box } from '@mui/material';
import styles from "./Map.module.css"
import React from 'react';
import { Map, Marker } from "pigeon-maps"

export const FORM_FIELDS_Map = [
  {
    name: 'location',
    type: 'string',
  }
]

let mapWidget = function (props: any) {
    return (
      <Box className={styles.map}>
        <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
          <Marker width={50} anchor={[50.879, 4.6997]} />
        </Map>
      </Box>
    )
}

export { mapWidget as Map}