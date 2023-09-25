import { Box, Button, ThemeProvider, useTheme } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../App';
import { useAppDispatch } from '../../app/hooks';
import { addWidget } from '../dashboard/dashboardSlice';
import { widgetRegistry, IWidgetRegistry } from '../widget/Widget.registry';
import styles from "./Selector.module.css";
import { getDefaultWidgets } from '../dashboard/layout';

const stylesFunc: any = () => theme;

export function Selector(props: any) {
    let [selectedWidgetName, setSelectedWidgetName] = useState("ImageLink");
    const dispatch = useAppDispatch()

    const selectWidget = function (widget: IWidgetRegistry, event: any) {
        setSelectedWidgetName(widget.name)
    }

    const renderButtons = function (w: IWidgetRegistry) {
        return (
            <Button className={styles.button + ' ' + (selectedWidgetName == w.name ? styles.selected : '')} key={w.name} onClick={(e) => selectWidget(w, e)}>
                <Box className={styles.icon}>{w.icon}</Box> <span>{w.name}</span>
            </Button>
        )
    }

    const addWidgetClick = function () {
        let widget = getDefaultWidgets().find((w) => {
            return w.i?.split('|')[0] == selectedWidgetName;
        }) || {};
        widget.i = selectedWidgetName + '|' + new Date().toISOString(),
        dispatch(addWidget(widget));
    }
    return (
        <div>
            
            <Box className={styles.selector}>
                <h3 className={styles.header}>📊 Create Widget</h3>
                <Button className={styles.button} onClick={addWidgetClick}>
                    <span className={styles.icon}>➕</span>
                    <span>Add Widget</span>
                </Button>
                {widgetRegistry.map((w) => renderButtons(w))}
            </Box>
        </div>
    )
}