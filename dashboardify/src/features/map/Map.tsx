import { Box } from '@mui/material';
import styles from "./Map.module.css"
import React from 'react';
import { Map, Point, Marker } from "pigeon-maps"
import { useAppSelector } from '../../app/hooks';

export const FORM_FIELDS_Map = [
  {
    name: 'location',
    type: 'string',
  }
]

let mapWidget = function (props: any) {

    let mylocation = useAppSelector((state) => state.settings.location.mylocation);

    let defaultGeoCoords:Point = [50.879, 4.6997];

    let renderMap = () => {
      if (mylocation) {
        return (
          <Map center={[parseFloat(mylocation.lat), parseFloat(mylocation.lon)]} defaultZoom={11}>
            <Marker width={50} anchor={[parseFloat(mylocation.lat), parseFloat(mylocation.lon)]} />
          </Map>
        )
      } else {
        return (
          <Map center={defaultGeoCoords} defaultZoom={11}>
            <Marker width={50} anchor={defaultGeoCoords} />
          </Map>
        )
      }
    }

    return (
      <Box className={styles.map}>
        {renderMap()}
      </Box>
    )
}

export { mapWidget as Map}