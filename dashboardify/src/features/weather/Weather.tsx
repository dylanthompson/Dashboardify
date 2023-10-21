import React, { FC, useEffect, useState } from 'react';
import styles from "./Weather.module.css";
import { useAppSelector } from '../../app/hooks';
import { enqueueSnackbar } from 'notistack';
import { makeRequest } from '../request';
import { FormField } from '../form/Form';
import { Oval, RotatingLines } from 'react-loader-spinner';

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

    let myLocation = useAppSelector((state) => state.settings.location?.mylocation);
    let [currentLocationName, setCurrentLocationName] = useState(props.location || myLocation?.name)
    let [weatherData, setWeatherData] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let actualLocation = props.location === 'MYLOCATION' ? myLocation?.name : props.location;
        if (!isLoading && (!weatherData || actualLocation != currentLocationName)) {
            setCurrentLocationName(actualLocation)
            setIsLoading(true);
            let weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=804ed3c2fd694c0e990212829232609&q=${actualLocation}&aqi=no`
            makeRequest(weatherApiUrl)
                .then(
                    (result) => {
                        setIsLoading(false)
                        setWeatherData(result);
                    },
                    (error) => {
                        setIsLoading(false)
                        enqueueSnackbar<'error'>("Failed to load weather data for location: " + actualLocation)
                    }
                )
        }
    },[myLocation, props.location])

    let renderContent = () => {
        if (isLoading || !weatherData) {
            return (
                <div className={styles.loaderContainer}>
                    <div className={styles.loaderIcon}>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                        />
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.weatherFlex}>
                    <div className={styles.icon}><img title={weatherData?.current?.condition?.text} src={weatherData?.current?.condition.icon}/></div>
                    <div className={styles.tempFlex}>
                        <div className={styles.temperature}>
                            <span className={styles.temperatureText}>{weatherData?.current?.temp_f}°</span>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.weather}>
            {renderContent()}
        </div>
    )
};

export default Weather;
