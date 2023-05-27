import React from "react";
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography } from "@mui/material";

import { IoIosArrowBack } from 'react-icons/io';
import { BsCalendarCheck } from 'react-icons/bs';
import compensationStar from 'assets/svg/compensationStar.svg';

const useStyles = makeStyles((theme: any) => ({
    root: {
        height: '100vh',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    arrowContainer: {
        width: '5% !important',
        height: '100% !important',
        borderRadius: '5px !important',
        marginRight: '0.2rem !important',
        background: '#FFF !important',
        cursor: 'pointer !important'
    },
    nameContainer: {
        width: '95% !important',
        height: '100% !important',
        borderRadius: '5px !important',
        background: '#FFF !important',
        padding: '0 32px !important'
    },
    nameText: {
        fontSize: '22px !important',
        lineHeight: '25px !important',
        color: '#76808D'
    },
    secondContainer: {
        width: '100%',
        height: 74,
        marginBottom: '0.2rem',
        background: '#FFF',
        borderRadius: '5px',
        padding: '0 22px !important'
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid xs={12} item display="flex" flexDirection="column" sx={{ margin: '10vh 0' }}>

                <Box sx={{ width: '100%', height: '32px' }}>
                    <Typography>Project Name</Typography>
                </Box>

                <Box sx={{ width: '100%', height: 74, marginBottom: '0.2rem' }} display="flex" alignItems="center">
                    <Box className={classes.arrowContainer} display="flex" alignItems="center" justifyContent={"center"}>
                        <IoIosArrowBack size={20} color="#C94B32" />
                    </Box>
                    <Box className={classes.nameContainer} display="flex" alignItems="center" justifyContent={"space-between"}>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.nameText}>Task Name</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography sx={{ fontSize: '14px', color: '#4BA1DB' }}>Open</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.secondContainer} display="flex" alignItems="center" justifyContent={"flex-end"}>
                    <Typography sx={{ color: '#76808D', fontSize: '16px' }}>Compensation</Typography>
                    <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ width: '127px', height: '35px', borderRight: '1px solid rgba(118, 128, 141, 0.5)', marginRight: '20px' }}>
                        <img src={compensationStar} alt="compensation-star" style={{ marginRight: '7px' }} />
                        <Typography>24 points</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Typography sx={{ color: '#4BA1DB', marginRight: '10px', fontSize: '16px' }}>Deadline</Typography>
                        <BsCalendarCheck color="#4BA1DB" />
                        <Typography sx={{ fontWeight: '700', color: '#4BA1DB', marginLeft: '6px', marginRight: '10px' }}>15/04/2022</Typography>
                    </Box>
                </Box>

            </Grid>
        </Grid>
    )
}