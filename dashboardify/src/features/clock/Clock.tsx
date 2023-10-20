import React, { FC, useEffect, useState } from 'react';
import styles from './Clock.module.css';
import { useAppSelector } from '../../app/hooks';

interface ClockProps {
   i: string,
   showSeconds: boolean
}

export const FORM_FIELDS_Clock = [
   {
      name: 'location',
      type: 'string',
   },
   {
      name: 'showSeconds',
      type: 'boolean',
   },
]

const Clock: FC<ClockProps> = (props) => {
   const [date, setDate] = useState(new Date());
   const widgets = useAppSelector(state => state.dashboardWidgets.widgets);
   let curWidget = widgets.find((w: any) => w.i == props.i);

   let renderDate = (date) => {
      if (!curWidget.showSeconds) {
         return date.toLocaleTimeString([], {
            timeStyle: 'short'
          })
      } else {
         return date.toLocaleTimeString([], {
          })
      }
   }
  
   useEffect(() => {
     const intervalId = setInterval(() => {
       setDate(new Date());
     }, 1000)
 
     return () => clearInterval(intervalId);
   }, [])
   return (
      <div className={styles.clock}>
         <div className={styles.display + ' ' + (!curWidget.showSeconds ? styles.mediumClock : undefined)}>
            {renderDate(date)}
         </div>
      </div>
   )
};

export default Clock;
