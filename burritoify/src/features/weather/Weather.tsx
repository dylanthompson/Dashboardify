import React, { FC, useState } from 'react';
import styles from "./Weather.module.css";
import { useAppSelector } from '../../app/hooks';
import { enqueueSnackbar } from 'notistack';
import { makeRequest } from '../request';
import { FormField } from '../form/Form';

interface WeatherProps {
    location: string
}

export const FORM_FIELDS_Weather: FormField[] = [
    {
       name: 'location',
       type: 'string',
       label: "Location",
       delayUpdate: true
    }
 ]

const Weather: FC<WeatherProps> = (props) => {

    let myLocation = useAppSelector((state) => state.settings.location.mylocation);
    let initialLocationName = !props.location || props.location === 'MYLOCATION' ? myLocation?.name : props.location;
    let [currentLocationName, setCurrentLocationName] = useState(initialLocationName)
    let [weatherData, setWeatherData] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    if (!isLoading && (!weatherData || (initialLocationName != currentLocationName))) {
        setIsLoading(true);
        if ((initialLocationName != currentLocationName)) {
            setCurrentLocationName(initialLocationName);
        }
        
        makeRequest(`https://api.weatherapi.com/v1/current.json?key=804ed3c2fd694c0e990212829232609&q=${initialLocationName}&aqi=no` )
            .then(
            (result) => {
                setIsLoading(false)
                setWeatherData(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                    setIsLoading(false)
                    enqueueSnackbar<'error'>("Failed to load weather data for location: " + initialLocationName)
            }
            )
    }
    

    return (
        <div className={styles.weather}>
            <div className={styles.weatherFlex}>
                <div className={styles.icon}><img title={weatherData?.current?.condition?.text} src={weatherData?.current?.condition.icon}/></div>
                <div className={styles.tempFlex}>
                    <div className={styles.temperature}>
                        <span className={styles.temperatureText}>{weatherData?.current?.temp_f}°</span>
                    </div>
                </div>
            </div>
        </div>
        
    )
};

export default Weather;
