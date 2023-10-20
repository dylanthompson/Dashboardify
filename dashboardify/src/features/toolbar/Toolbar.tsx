import { Box } from '@mui/material';
import styles from "./Toolbar.module.css"
import React from "react";
import { Selector } from '../selector/Selector';
import Inspector from '../inspector/Inspector';

export function ToolBar(props: any) {
    return (
        <Box className={styles.toolbar}>
            <Selector />
        </Box>
    )
}
