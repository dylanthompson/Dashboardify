import styles from './Inspector.module.css';
import { Box, TextField, FormControl, Checkbox, FormControlLabel  } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { widgetRegistry } from '../widget/Widget.registry';
import { setWidgetValue } from '../dashboard/dashboardSlice';
import { FC } from 'react';
import Form, { FormField, getFormValue } from '../Form/Form';
import { store } from '../../app/store';

interface InspectorProps {}

const Inspector: FC<InspectorProps> = () => {
   let selectedWidget = useAppSelector(state => state.dashboardWidgets.selectedWidget);
   let selectedWidgetKey = useAppSelector(state => state.dashboardWidgets.selectedWidgetKey);
   let dispatch = useAppDispatch();
   let widgetType = selectedWidgetKey?.split('|')[0];
   let selectedWidgetRegistry = widgetRegistry.find((wr) => {
      return widgetType == wr.name;
   })

   let handleSubmit = (event: any) => {
      console.log("Submitted")
      event.preventDefault()
   }

   let updateWidget = (event: any, field: FormField) => {
      if (selectedWidget) {
         dispatch(setWidgetValue({
            i: selectedWidget.i,
            name: event.target.name,
            value: getFormValue(event, field)
         }))
      }
   }

   if (selectedWidget && selectedWidgetRegistry?.formFields) {
      return (
         <Box className={styles.inspector}>
            <h3 className={styles.header}>🔎 Inspector</h3>
            <Form {...{ value: selectedWidget, formFields: selectedWidgetRegistry.formFields, handleChange: updateWidget, handleSubmit}}>
            </Form>
         </Box>
      )
   } else {
      return (
         
         <Box className={styles.inspector}>
            <h3 className={styles.header}>🔎 Inspector</h3>
            <div className={styles.none}>No Selection</div>
         </Box>
      )
   }


};

export default Inspector;
