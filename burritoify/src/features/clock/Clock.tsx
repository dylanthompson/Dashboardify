import React, { FC, useEffect, useState } from 'react';
import styles from './Clock.module.css';

interface ClockProps {}

const Clock: FC<ClockProps> = () => {
   const [date, setDate] = useState(new Date());
  
   useEffect(() => {
     const intervalId = setInterval(() => {
       setDate(new Date());
     }, 1000)
 
     return () => clearInterval(intervalId);
   }, [])
   return (
      <div className={styles.clock}>
         <div className={styles.display}>
            {date.toLocaleTimeString()}
         </div>
      </div>
   )
};

export default Clock;
