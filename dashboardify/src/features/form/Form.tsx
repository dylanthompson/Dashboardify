import { Button, Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import styles from './Form.module.css';
import { FC, useState } from 'react';
import Dialog from '../dialog/Dialog';
import ImagePicker from '../image-picker/ImagePicker';
import { enqueueSnackbar } from 'notistack';
import environment from '../../environment.json';
import { makeAmplifyRequest } from '../request';

interface FormProps {
   handleSubmit: Function,
   handleViewChange: Function,
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

export let getFormValue = (event: any, field: FormField) => {
   if (field.type === 'boolean') {
      return event.target.checked;
   }
   return event.target.value
}

const Form: FC<FormProps> = (props) => {

   const [imagePickerOpen, setImagePickerOpen] = useState(false);
   const [currentImageField, setCurrentImageField] = useState(null);
   let [delayUpdateTimeout, setDelayUpdateTimeout] = useState(null);



   let handleSubmit = (e: any) => {
      if (props.handleSubmit) {
         props.handleSubmit(e);
      }
      e.preventDefault()
   }

   let handleViewChange = (e, fields) => {
      props?.handleViewChange?.(e, fields);
   }

   let handleChange = (e, field) => {
      handleViewChange(e, field);
      if (props.handleChange) {
         if (field.delayUpdate) {
            if (delayUpdateTimeout) {
               clearTimeout(delayUpdateTimeout);
            }
            setDelayUpdateTimeout(setTimeout(() => {
               clearTimeout(delayUpdateTimeout);
               setDelayUpdateTimeout(null);
               props.handleChange(e, field);
            }, 2500));
         } else {
            props.handleChange(e, field);
         }
      }
   }

   let renderButton = () => {
      if (props.handleSubmit) {
         return <Button type="submit">Submit</Button>
      }
   }

   const openImagePicker = (field) => {
      setCurrentImageField(field);
      setImagePickerOpen(true);
   };

   const toDataURL = url => makeAmplifyRequest(environment.apiName, environment.toBase64Api + url)

   const encodeImage = async (url:string, field: FormField) => {
      if (!url || (!url.startsWith('https://') && !url.startsWith('http://'))) {
         enqueueSnackbar<'warning'>('Invalid URL could not be encoded, must start with https:// or http://')
         return;
      }
      try {
         let dataUrl = await toDataURL(url)
         setImage(dataUrl.imageData, field)
      } catch(error) {
         enqueueSnackbar<'error'>(error)  
      }
      
      
   }

   const handleClose = (value: string) => {
      setImagePickerOpen(false);
   };

   const setImage = (newValue, formField?: FormField) => {
      if (formField) {
         handleChange({ target: { value: newValue, name: formField.name } }, formField);
      } else {
         handleChange({ target: { value: newValue, name: currentImageField.name } }, currentImageField);
      }
   }

   const renderField = (field: FormField, currentValue: any, handleChange: Function) => {
      if (field.type) {
         switch (field.type) {
            case "string":
               return <TextField id={field.name} label={field.label || field.name} className={styles.stringField + ' ' + styles.formField} type="text" name={field.name} value={currentValue || ''} onChange={(e) => handleChange(e, field)} />
            case "image":
               return (
                  <span>
                     <div className={styles.inlineButtonContainer}>
                        <div title="Image Picker" className={styles.inlineButton + ' ' + styles.imagePicker} onClick={(e) => openImagePicker(field)}>🖼️</div>
                        <div title="Base64 Encode" className={styles.inlineButton + ' ' + styles.encodeImage} onClick={(e) => encodeImage(currentValue, field)}>📃</div>
                     </div> 
                     <TextField id={field.name} label={field.label || field.name} className={styles.stringField + ' ' + styles.formField} type="text" name={field.name} value={currentValue || ''} onChange={(e) => handleChange(e, field)} />
                  </span>
               )
            case "boolean":
               return <FormControlLabel control={<Checkbox id={field.name} className={styles.stringField + ' ' + styles.formField} name={field.name} value={currentValue || false} onChange={(e) => handleChange(e, field)} />} label={field.label || field.name} />
            default:
               return <span className={styles.error}>Unknown field type {field.type}</span>

         }
      }
      return <span className={styles.error}>Missing field type {field.type}</span>
   }

   return (
      <FormControl component="form" className={styles.form} onSubmit={handleSubmit}>
         {props.formFields.map((field: FormField, i: number) => (
            <span key={i} className={styles.formRow}>
               {renderField(field, props.value?.[field.name], handleChange)}
            </span>
         ))}
         {renderButton()}
         <Dialog
            open={imagePickerOpen}
            title="Image Picker"
            onClose={handleClose}
         >
            <ImagePicker setImage={setImage} />
         </Dialog>
      </FormControl>
   )
};

export default Form;
