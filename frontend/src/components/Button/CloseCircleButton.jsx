import React from 'react';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

export default function CloseCircleButton({ onClick, size = '48px' }) {
    const iconSize = `calc(${size} * 0.6)`;  // Making the icon size proportional to the button size

    return (
        <IconButton 
            style={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                width: size,
                height: size,
                fontSize: iconSize  // Setting the font size which the SvgIcon will inherit
            }}
            onClick={onClick}
        >
            <SvgIcon fontSize="inherit" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" stroke="white" strokeWidth="3.5"/>
            </SvgIcon>
        </IconButton>
    );
}
