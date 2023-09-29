import { Box, Button, ThemeProvider, useTheme } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../App';
import { useAppDispatch } from '../../app/hooks';
import { addWidget } from '../dashboard/dashboardSlice';
import { widgetRegistry, IWidgetRegistry } from '../widget/Widget.registry';
import styles from "./Selector.module.css";
import { getDefaultWidgets } from '../dashboard/layout';
import { setView } from '../viewSlicer';
import { Dialog } from '../dialog/Dialog';
import Settings from '../settings/Settings';
import { useSnackbar } from 'notistack';

const stylesFunc: any = () => theme;

export function Selector(props: any) {
    let [selectedWidgetName, setSelectedWidgetName] = useState("ImageLink");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };

    const handleViewClick = () => {
        enqueueSnackbar<"info">("Press Escape to return to Edit mode.", {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center'
            }
        })
        dispatch(setView("View"));
    }



    return (
        <div>

            <Box className={styles.selector}>
                <Button className={styles.button} onClick={handleClickOpen}>
                    <span className={styles.icon}>📍</span>
                    <span>Location</span>
                </Button>
                <Button className={styles.button} onClick={handleViewClick}>
                    <span className={styles.icon}>👁️</span>
                    <span>Toggle View</span>
                </Button>
                <h3 className={styles.header}>📊 Create Widget</h3>
                <Button className={styles.button} onClick={addWidgetClick}>
                    <span className={styles.icon}>➕</span>
                    <span>Add Widget</span>
                </Button>
                {widgetRegistry.map((w) => renderButtons(w))}
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Settings />
            </Dialog>
        </div>
    )
}