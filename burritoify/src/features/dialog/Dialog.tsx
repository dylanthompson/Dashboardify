import React, { FC } from 'react';
import { DialogWrapper } from './Dialog.styled';

interface DialogProps {}

const Dialog: FC<DialogProps> = () => (
 <DialogWrapper data-testid="Dialog">
    Dialog Component
 </DialogWrapper>
);

export default Dialog;
