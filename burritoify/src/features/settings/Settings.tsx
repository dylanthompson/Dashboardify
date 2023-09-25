import React, { FC } from 'react';
import styles from './Settings.module.css';
import { useAppSelector } from '../../app/hooks';
import Form from '../Form/Form';

export const FORM_FIELDS_Settings = [
   {
     name: 'mylocation',
     type: 'string',
   },
 ]

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
   let myLocation = useAppSelector((state) => state.settings.location.mylocation);
   let handleSubmit = (event: any) => {
      console.log("Submitted")
      event.preventDefault()
   }

   let handleChange = (e, field) => {
      
   }

  return (
   <div data-testid="Settings" className={styles.settings}>
      Settings
      <Form {...{formFields: FORM_FIELDS_Settings, value: myLocation, handleChange, handleSubmit}}>
      </Form>
   </div>
 )
};

export default Settings;
