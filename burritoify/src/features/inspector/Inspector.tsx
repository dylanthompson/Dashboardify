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
   let dispatch = useAppDispatch();
   let widgetType = selectedWidgetKey?.split('|')[0];
   
   let selectedWidgetRegistry = widgetRegistry.find((wr) => {
      return widgetType == wr.name;
   })

   if (selectedWidget && selectedWidget.i !== localSelectedWidget?.i) {
      setLocalSelectedWidget(selectedWidget);
      localSelectedWidget = selectedWidget;
   }

   let updateWidgetView = (event: any, field: FormField) => {
      if (selectedWidget) {
         let fieldValue = getFormValue(event, field)
         let mergeObject = {};
         mergeObject[event.target.name] = fieldValue;
         setLocalSelectedWidget({...localSelectedWidget, ...mergeObject})
      }
   }
   

   let updateWidget = (event: any, field: FormField) => {
      if (selectedWidget) {
         dispatch(setSelectedWidgetValue({
            i: selectedWidget.i,
            name: event.target.name,
            value: getFormValue(event, field)
         }))
      }
   }

   if (localSelectedWidget && selectedWidgetRegistry?.formFields) {
      return (
         <Box className={styles.inspector}>
            <h3 className={styles.header}>🔎 Inspector</h3>
            <Form {...{ value: localSelectedWidget, formFields: selectedWidgetRegistry.formFields, handleChange: updateWidget, handleViewChange: updateWidgetView, handleSubmit: null}}>
            </Form>
         </Box>
      )
   } else {
      return null
   }


};

export default Inspector;
