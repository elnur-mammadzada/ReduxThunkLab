import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers, getUserById } from '../slices/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import MUIDialog from './MUIDialog';
import UpdatePage from '../pages/Home/UpdatePage/UpdatePage';



const MUITable = ({ users }) => {
    const dispatch = useDispatch();



    const handleDelete = (id) => {
        dispatch(deleteUsers(id))

    };



    const handleUpdate = (id) => {
        dispatch(getUserById(id))

        setOpen(true)
    };

    const [open, setOpen] = useState(false);
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        if (users && users.length > 0) {
            const keys = Object.keys(users[0]);
            setColumns(keys);
        }
    }, [users]);


    return (
        <TableContainer component={Paper}>
            <Table >
                <TableHead>


                    <TableRow sx={{ border: '1px solid black' }}>
                        {columns.map((col) => (
                            <TableCell key={col}>{col}</TableCell>
                        ))}
                        <TableCell>Delete</TableCell>
                        <TableCell>Edit</TableCell>


                    </TableRow>





                </TableHead>

                <TableBody>

                    {users && users.map((user) => (<TableRow key={user.id} sx={{ border: '1px solid black' }} >
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.description}</TableCell>
                        <TableCell>{<DeleteIcon sx={{
                            cursor: 'pointer',
                            color: 'error.main',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                            },
                        }} onClick={() => handleDelete(user.id)}



                        />}</TableCell>
                        <TableCell>
                            {<EditIcon sx={{
                                cursor: 'pointer',
                                color: 'success.main',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                },
                            }} onClick={() => handleUpdate(user.id)}

                            />}


                        </TableCell>
                    </TableRow>))}




                </TableBody>
            </Table>
            <UpdatePage open={open} setOpen={setOpen} />
        </TableContainer>
    )
}

export default MUITable



