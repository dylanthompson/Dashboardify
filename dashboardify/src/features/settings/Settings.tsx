import React, { FC, useState } from 'react';
import styles from './Settings.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Form, { getFormValue } from '../form/Form';
import { setMyLocation } from '../settingsSlicer';
import { useSnackbar } from 'notistack';
import { makeHttpRequest } from '../request';

export const FORM_FIELDS_Settings = [
   {
     name: 'name',
     label: "My Location",
     type: 'string',
   },
 ]

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
   let storeMyLocationName = useAppSelector((state) => state.settings.location?.mylocation?.name);
   let dispatch = useAppDispatch();
   let [myStateLocationName, setMyStateLocationName] = useState(storeMyLocationName || '');
   let [isLoading, setIsLoading] = useState(false);
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
   
   let handleSubmit = (event: any) => {
      event.preventDefault()

      if (!myStateLocationName) {
         dispatch(setMyLocation(null))
         return;
      }

      setIsLoading(true);
      makeHttpRequest("https://geocode.maps.co/search?q="  + myStateLocationName)
         .then(
            (result) => {
               setIsLoading(false)
               enqueueSnackbar<'info'>('Updated settings')
               dispatch(setMyLocation({ name: myStateLocationName, lat: result?.[0]?.lat, lon: result?.[0]?.lon }))
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                  setIsLoading(false)
                  enqueueSnackbar<'error'>("Failed to geocode location: " + myStateLocationName)
            }
         )
      
   }

   let handleChange = (event, field) => {
      setMyStateLocationName(getFormValue(event, field));
   }

  return (
   <div data-testid="Settings" className={styles.settings}>
      <Form {...{formFields: FORM_FIELDS_Settings, value: { name: myStateLocationName}, handleChange, handleSubmit, handleViewChange: null}}>
      </Form>
   </div>
 )
};

export default Settings;
