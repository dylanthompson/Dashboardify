import React, { FC } from 'react';
import styles from './Form.module.css';
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';

interface FormProps {
   handleSubmit: Function,
   handleChange: Function,
   formFields: Array<FormField>,
   value: any,
}


export interface FormField {
   name: string;
   label?: string;
   type: string;
   delayUpdate?: boolean;
}

const renderField = (field: FormField, currentValue: any, handleChange: Function) => {
   if (field.type) {
      switch(field.type) {
         case "string":
            return <TextField id={field.name} label={field.label || field.name} className={styles.stringField + ' ' + styles.formField} type="text" name={field.name} value={currentValue || ''} onChange={(e) => handleChange(e, field)}/>
         case "boolean":
            return <FormControlLabel control={<Checkbox id={field.name} className={styles.stringField + ' ' + styles.formField} name={field.name} value={currentValue || false} onChange={(e) => handleChange(e, field)} />} label={field.label ||field.name} />
         default:
            return <span className={styles.error}>Unknown field type {field.type}</span>
         
      }
   }
   return <span className={styles.error}>Missing field type {field.type}</span>
}

export let getFormValue = (event:any, field: FormField) => {
   if (field.type === 'boolean') {
      return event.target.checked;
   }
   return event.target.value
}

const Form: FC<FormProps> = (props) => {
   
   let handleSubmit = (e:any) => {
      if (props.handleSubmit) {
         props.handleSubmit(e);
      }
   }

   let handleChange = (e, field) => {
      props.handleChange(e, field);
   }

   let renderButton = () => {
      if (props.handleSubmit) {
         return <Button type="submit">Save</Button>
      }
   }

   return (
      <FormControl component="form" className={styles.form} onSubmit={handleSubmit}>
         {props.formFields.map((field: FormField, i: number) => (
            <span key={i} className={styles.formRow}>
               {renderField(field, props.value?.[field.name], handleChange)}
            </span>
         ))}
         {renderButton()}
      </FormControl>
      )
};

export default Form;