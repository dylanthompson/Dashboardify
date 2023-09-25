import styles from './Inspector.module.css';
import { Box, TextField, FormControl, Checkbox, FormControlLabel  } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormField, widgetRegistry } from '../widget/Widget.registry';
import { setWidgetValue } from '../dashboard/dashboardSlice';
import { FC } from 'react';

interface InspectorProps {}

const Inspector: FC<InspectorProps> = () => {
   let matchingWidget = useAppSelector(state => state.dashboardWidgets.selectedWidget);
   let selectedWidgetKey = useAppSelector(state => state.dashboardWidgets.selectedWidgetKey);
   let dispatch = useAppDispatch();
   let widgetType = selectedWidgetKey?.split('|')[0];
   let matchingWidgetRegistry = widgetRegistry.find((wr) => {
      return widgetType == wr.name;
   })

   let handleSubmit = (event: any) => {
      console.log("Submitted")
      event.preventDefault()
   }

   let getFormValue = (event:any, field: FormField) => {
      if (field.type === 'boolean') {
         return event.target.checked;
      }
      return event.target.value
   }

   let handleChange = (event: any, field: FormField) => {
      if (matchingWidget) {
         dispatch(setWidgetValue({
            i: matchingWidget.i,
            name: event.target.name,
            value: getFormValue(event, field)
         }))
      }
   }

   let renderField = (field: FormField) => {
      if (field.type) {
         switch(field.type) {
            case "string":
               return <TextField id={field.name} label={field.name} className={styles.stringField + ' ' + styles.formField} type="text" name={field.name} value={matchingWidget?.[field.name] || ''} onChange={(e) => handleChange(e, field)}/>
            case "boolean":
               return <FormControlLabel control={<Checkbox id={field.name} className={styles.stringField + ' ' + styles.formField} name={field.name} value={matchingWidget?.[field.name] || false} onChange={(e) => handleChange(e, field)} />} label={field.name} />
            default:
               return <span className={styles.error}>Unknown field type {field.type}</span>
            
         }
      }
      return <span className={styles.error}>Missing field type {field.type}</span>
   }

   if (matchingWidget && matchingWidgetRegistry?.formFields) {
      return (
         <Box className={styles.inspector}>
            <h3 className={styles.header}>🔎 Inspector</h3>
            <FormControl className={styles.form} onSubmit={handleSubmit}>
                  {matchingWidgetRegistry.formFields.map((field: FormField, i: number) => (
                     <span key={i} className={styles.formRow}>
                        {renderField(field)}
                     </span>
                  ))}
            </FormControl>
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
