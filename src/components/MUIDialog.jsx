import React, { useState } from 'react';
import MUIButton from './MUIButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUsers } from '../slices/userSlice';



const MUIDialog = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({ name: '', description: '' });
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUsers(userData));
        setUserData({ name: '', description: '' });
        handleClose();
    };

    return (
        <div>
            <MUIButton
                text={"YARAT"}
                variant={"contained"}
                color={"error"}
                startIcon={<AddIcon />}
                onclick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Yeni İstifadəçi</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                        placeholder="Ad"
                    />
                    <TextField
                        name="description"
                        value={userData.description}
                        onChange={handleChange}
                        margin="dense"
                        placeholder="Təsvir"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ləğv et</Button>
                    <Button type="submit">Əlavə et</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MUIDialog;
