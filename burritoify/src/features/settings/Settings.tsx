import React, { FC, useState } from 'react';
import styles from './Settings.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Form, { getFormValue } from '../Form/Form';
import { setMyLocation } from '../settingsSlicer';
import { useSnackbar } from 'notistack';

export const FORM_FIELDS_Settings = [
   {
     name: 'mylocation',
     type: 'string',
   },
 ]

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
   let myLocation = useAppSelector((state) => state.settings.location);
   let dispatch = useAppDispatch();
   let [location, setStateLocation] = useState(myLocation.mylocation);
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
   
   let handleSubmit = (event: any) => {
      
      enqueueSnackbar<'info'>('Updated settings');

      dispatch(setMyLocation(location))
      event.preventDefault()
   }

   let handleChange = (event, field) => {
      setStateLocation({ "mylocation": getFormValue(event, field) } as any);
   }

  return (
   <div data-testid="Settings" className={styles.settings}>
      Settings
      <Form {...{formFields: FORM_FIELDS_Settings, value: location, handleChange, handleSubmit}}>
      </Form>
   </div>
 )
};

export default Settings;
