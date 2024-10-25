import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../slices/userSlice';
// import { userById } from '../../../slices/userSlice';
import { updateUsers } from '../../../slices/userSlice';



const UpdatePage = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { userById } = useSelector((state) => state.user);
    console.log(userById)

    const [state, setState] = useState(userById)

    useEffect(() => {
        if (userById) {
            setState(userById);
        }
    }, [userById]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    console.log(state)
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUsers(state));
        handleClose();
    };



    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
            <DialogTitle>İstifadəçi Düzəliş</DialogTitle>
            <DialogContent>
                <TextField
                    name="name"
                    value={state.name || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    placeholder="Ad"
                />
                <TextField
                    name="description"
                    value={state.description || ""}
                    onChange={handleChange}
                    margin="dense"
                    placeholder="Təsvir"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Ləğv et</Button>
                <Button type="submit">Düzəliş et</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdatePage;
