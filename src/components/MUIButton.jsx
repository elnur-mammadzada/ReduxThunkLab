import { Button } from '@mui/material'
import React from 'react'

const MUIButton = ({ text, variant, color, startIcon, onclick }) => {
    return (

        <Button variant={variant} color={color} startIcon={startIcon} onClick={onclick}>{text}</Button>

    )
}

export default MUIButton
