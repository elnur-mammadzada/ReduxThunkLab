import React, { useEffect } from 'react'
import MUITable from '../../components/MUITable'
import MUIButton from '../../components/MUIButton'
import AddIcon from '@mui/icons-material/Add';
import { Container, Snackbar } from '@mui/material';
import '../Home/Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../slices/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { closeSnackbar } from '../../slices/userSlice';
// import DialogContentText from '@mui/material/DialogContentText';
import MUIDialog from '../../components/MUIDialog';



const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [])


    const handleClose = () => {
        dispatch(closeSnackbar())
    }



    const { users, isLoading, isSnackbarOpen, snackbarMessage } = useSelector((state) => state.user);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }




    return (
        <div className='home'>
            <Container fixed className="container">
                <div className="button-container">
                    <MUIDialog />
                </div>

                <MUITable className="home__table" users={users} />
                <Snackbar
                    onClose={handleClose}
                    open={isSnackbarOpen}
                    autoHideDuration={1000}
                    message={snackbarMessage}
                />


            </Container>
        </div>
    )
}

export default Home
