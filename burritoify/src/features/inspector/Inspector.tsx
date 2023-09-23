import React, { FC } from 'react';
import styles from './Inspector.module.css';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormField, widgetRegistry } from '../widget/Widget.directory';
import { setWidgets } from '../dashboard/dashboardSlice';

interface InspectorProps {}

const Inspector: FC<InspectorProps> = () => {
   let widgets = useAppSelector(state => state.dashboardWidgets.widgets);
   let selectedWidgetKey = useAppSelector(state => state.dashboardWidgets.selectedWidgetKey);
   let dispatch = useAppDispatch();
   let widgetType = selectedWidgetKey?.split('|')[0];
   let matchingWidgetRegistry = widgetRegistry.find((wr) => {
      return widgetType == wr.name;
   })
   let matchingWidget = widgets.find((w: any) => {
      return w.i == selectedWidgetKey;
   })

   let handleSubmit = (event: any) => {
      console.log("Submitted")
      event.preventDefault()
   }

   let handleChange = (event: any) => {
      console.log("changed")
      dispatch(setWidgets(widgets))
   }

   let renderField = (field: FormField) => {
      if (field.type) {
         switch(field.type) {
            case "string":
               return <input className={styles.stringField} type="text" name={field.name} value={matchingWidget[field.name]} onChange={(e) => handleChange(e)}/>
            default:
               return <span className={styles.error}>Unknown field type {field.type}</span>
            
         }
      }
      return <span className={styles.error}>Missing field type {field.type}</span>
   }

   if (matchingWidgetRegistry?.formFields) {
      return (
         <Box className={styles.inspector}>
            <form onSubmit={handleSubmit}>
               {matchingWidgetRegistry.formFields.map((field: FormField, i: number) => (
                  <div key={i} className={styles.formRow}>
                     <span>{field.name}</span>
                     {renderField(field)}
                  </div>
               ))}
            </form>
         </Box>
      )
   } else {
      return (
         <Box className={styles.inspector}>
            No Selection
         </Box>
      )
   }


};

export default Inspector;
