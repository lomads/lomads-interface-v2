import React, { useState } from "react";

import { Typography, Box, Modal } from "@mui/material";
import { makeStyles } from '@mui/styles';

import IconButton from 'components/IconButton';

import CloseSVG from 'assets/svg/closeNew.svg'
import iconSvg from 'assets/svg/createProject.svg';
import Button from "components/Button";

const useStyles = makeStyles((theme: any) => ({
    modalTitle: {
        fontSize: '30px !important',
        lineHeight: '33px !important',
        textAlign: 'center',
        color: '#C94B32',
        margin: '20px 0 !important',
    },
    modalSubtitle: {
        color: '#76808d !important',
        fontSize: '14px !important',
        fontWeight: '400 !important',
        lineHeight: '16px !important',
        textAlign: 'center',
    }
}));

interface Props {
    open: boolean;
    closeModal(): any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 573,
    bgcolor: 'background.paper',
    padding: '40px 22px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

export default ({ open, closeModal }: Props) => {
    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <img src={iconSvg} alt="icon-svg" style={{ width: '75px', height: '60px', objectFit: 'cover' }} />
                <Typography className={classes.modalTitle}>Close the workspace</Typography>
                <Typography className={classes.modalSubtitle}>This action is irreversible for now.</Typography>
                <Typography className={classes.modalSubtitle}>You will find closed projects in the archives.</Typography>
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} style={{ width: '100%', marginTop: '20px' }}>
                    <Button variant="outlined" sx={{ marginRight: '20px' }}>NO</Button>
                    <Button variant="contained">YES</Button>
                </Box>
            </Box>
        </Modal>
    )
}