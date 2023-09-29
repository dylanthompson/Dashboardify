import React, { FC, useState } from 'react';
import styles from './ImagePicker.module.css';
import Form, { FormField, getFormValue } from '../form/Form';
import environment from '../../environment.json'
import { Button } from '@mui/material';
import { makeRequest } from '../request';

interface ImagePickerProps {
   setImage: Function
}

var FORM_FIELDS_ImagePicker: FormField[] = [
   {
      name: 'query',
      label: 'Image Search',
      type: 'string',
      delayUpdate: true,
   }
]

const ImagePicker: FC<ImagePickerProps> = (props) => {

   let [queryObject, setQueryObject] = useState({ query: ''})
   let [images, setImages] = useState([])

   let updateQueryString = (event, field) => {
      let mergeObject = { };
      mergeObject[field.name] = getFormValue(event, field)
      setQueryObject({ ...queryObject, ...mergeObject})
   }

   let handleSubmit = async (event) => {
      //do api request, save responses
      const imageUrls = await makeRequest(environment.apiURL + environment.imageSuggestApi + queryObject.query);
      setImages(imageUrls)
   }

   let selectImage = (event, image) => {
      props.setImage(image);
   }

   return (
      <div className={styles.imagePicker} data-testid="ImagePicker">
         <Form {...{ value: queryObject, formFields: FORM_FIELDS_ImagePicker, handleChange: null, handleViewChange: updateQueryString, handleSubmit: handleSubmit}}>
         </Form>
         {images.map((image, index) => <Button onClick={(event) => selectImage(event, image)}><img className={styles.image} key={index} src={image}/></Button>)}
      </div>
   )
};

export default ImagePicker;
