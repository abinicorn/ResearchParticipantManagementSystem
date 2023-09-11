import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import SvgIcon from '@mui/material/SvgIcon';

const UncheckedIcon = (props) => (
    <SvgIcon {...props}>
        <circle cx="12" cy="12" r="11" stroke="#000" strokeWidth="2" fill="none" />
    </SvgIcon>
);

const CheckedIcon = (props) => (
    <SvgIcon {...props}>
        <circle cx="12" cy="12" r="11" stroke="#000" strokeWidth="2" fill="none" />
        <path d="M4 12l5 5L20 6" stroke="green" strokeWidth="3" fill="none" />
    </SvgIcon>
);

export default function CustomCheckbox(props) {
    return (
        <Checkbox
            icon={<UncheckedIcon />}
            checkedIcon={<CheckedIcon />}
            {...props}
        />
    );
}
