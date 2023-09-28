import React, { FC, useState } from 'react';
import styles from "./Weather.module.css";
import { useAppSelector } from '../../app/hooks';
import { enqueueSnackbar } from 'notistack';
import { makeRequest } from '../request';

interface WeatherProps {}

const Weather: FC<WeatherProps> = () => {

    let myLocation = useAppSelector((state) => state.settings.location.mylocation);
    let [currentLocationName, setCurrentLocationName] = useState(myLocation?.name)
    let [weatherData, setWeatherData] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    if (!isLoading && (!weatherData || (myLocation?.name != currentLocationName))) {

        if ((myLocation?.name != currentLocationName)) {
            setCurrentLocationName(myLocation?.name);
        }
        
        makeRequest(`https://api.weatherapi.com/v1/current.json?key=804ed3c2fd694c0e990212829232609&q=${myLocation.name}&aqi=no` )
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
                    enqueueSnackbar<'error'>("Failed to load weather data for location: " + myLocation.name)
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
