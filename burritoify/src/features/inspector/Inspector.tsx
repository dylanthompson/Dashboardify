import styles from './Inspector.module.css';
import { Box, TextField, FormControl, Checkbox, FormControlLabel  } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { widgetRegistry } from '../widget/Widget.registry';
import { setSelectedWidgetValue } from '../dashboard/dashboardSlice';
import { FC, useState } from 'react';
import Form, { FormField, getFormValue } from '../form/Form';
import { store } from '../../app/store';

interface InspectorProps {}

const Inspector: FC<InspectorProps> = () => {
   let selectedWidget = useAppSelector(state => state.dashboardWidgets.selectedWidget)
   let selectedWidgetKey = useAppSelector(state => state.dashboardWidgets.selectedWidgetKey)
   let [localSelectedWidget, setLocalSelectedWidget] = useState(selectedWidget)
   let [delayUpdateTimeout, setDelayUpdateTimeout] = useState(null);
   let dispatch = useAppDispatch();
   let widgetType = selectedWidgetKey?.split('|')[0];
   let selectedWidgetRegistry = widgetRegistry.find((wr) => {
      return widgetType == wr.name;
   })

   if (selectedWidget && selectedWidget.i !== localSelectedWidget?.i) {
      setLocalSelectedWidget(selectedWidget);
      localSelectedWidget = selectedWidget;
   }
   
   let handleSubmit = (event: any) => {
      event.preventDefault()
   }

   let updateWidget = (event: any, field: FormField) => {
      if (selectedWidget) {
         let fieldValue = getFormValue(event, field)
         let mergeObject = {};
         mergeObject[event.target.name] = fieldValue;
         setLocalSelectedWidget({...localSelectedWidget, ...mergeObject})
         if (field.delayUpdate) {
            if (delayUpdateTimeout) {
               clearTimeout(delayUpdateTimeout);
            }
            setDelayUpdateTimeout(setTimeout(() => {
               clearTimeout(delayUpdateTimeout);
               setDelayUpdateTimeout(null);
               dispatch(setSelectedWidgetValue({
                  i: selectedWidget.i,
                  name: event.target.name,
                  value: fieldValue
               }))
            }, 2500));
         } else {
            dispatch(setSelectedWidgetValue({
               i: selectedWidget.i,
               name: event.target.name,
               value: getFormValue(event, field)
            }))
         }
      }
   }

   if (localSelectedWidget && selectedWidgetRegistry?.formFields) {
      return (
         <Box className={styles.inspector}>
            <h3 className={styles.header}>🔎 Inspector</h3>
            <Form {...{ value: localSelectedWidget, formFields: selectedWidgetRegistry.formFields, handleChange: updateWidget, handleSubmit: null}}>
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
