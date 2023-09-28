import React, { FC } from 'react';
import styles from './Footer.module.css';
import { ToolBar } from '../toolbar/Toolbar';
import Inspector from '../inspector/Inspector';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
 <div data-testid="Footer" className={styles.footer}>
   <ToolBar />
   <Inspector />
 </div>
);

export default Footer;
