import { Box } from '@mui/material';
import styles from "./Map.module.css"
import React from 'react';
import { Map, Marker } from "pigeon-maps"
import { useAppSelector } from '../../app/hooks';

export const FORM_FIELDS_Map = [
  {
    name: 'location',
    type: 'string',
  }
]

let mapWidget = function (props: any) {

    let mylocation = useAppSelector((state) => state.settings.location.mylocation);

    return (
      <Box className={styles.map}>
        <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
          <Marker width={50} anchor={[50.879, 4.6997]} />
        </Map>
      </Box>
    )
}

export { mapWidget as Map}