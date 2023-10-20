import { Box } from '@mui/material';
import styles from "./Widget.module.css";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeWidget, setSelectedWidgetKey } from '../dashboard/dashboardSlice';

export function Widget(props: any) {
    let view = useAppSelector(state => state.view.view);
    let selectedWidgetKey = useAppSelector(state => state.dashboardWidgets.selectedWidgetKey);
    let dispatch = useAppDispatch();
    return <Box className={styles.widget + " " + (view == "View" ? styles.view : '') + " " + (props.i === selectedWidgetKey ? styles.selected : '')} onClick={(e) => dispatch(setSelectedWidgetKey(props.i))}>
        <span className={styles.close + " " + (view == "View" ? styles.hidden : '')} onClick={(e) => { e.preventDefault(); return dispatch(removeWidget(props.i))}}>❌</span>
        {props.children}
    </Box>
}
