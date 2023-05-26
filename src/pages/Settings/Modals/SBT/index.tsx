import { Box, Typography, Grid, Button } from "@mui/material"
import React, { useState } from "react";
import IconButton from "components/IconButton"
import CloseSVG from 'assets/svg/close-new.svg'
import rectangleSbt from 'assets/svg/group265.svg'
import greyStar from 'assets/svg/greySmallFrame.svg'
import greyGroup from 'assets/svg/greySmallGroup.svg'
import TextInput from "components/TextInput"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
    headerTitle: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: '400 !important',
        fontSize: '30px !important',
        lineHeight: '33px',
        color: '#C94B32'
    },
    headerDescription: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        textAlign: 'center',
        fontWeight: '400 !important',
        fontSize: '16px !important',
        lineHeight: '20px !important',
        color: '#76808D'
    },
    textInput: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '700 !important',
        fontSize: '16px',
        lineHeight: '18px',
        letterSpacing: '-0.011em',
        color: '#76808D',
        marginBottom: '10px',
    },
    sweatContainer: {
        height: '61.00001907348633px',
        width: '100%',
        left: '22px',
        top: '86px',
        borderRadius: '5px',
        padding: '20px',
        justify: 'space-between',
        backgroundColor: 'rgba(118, 128, 141, .1)',
    },
    overlayImage: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "15px",
        gap: "10px",
        position: "absolute",
        left: "0%",
        right: "0%",
        top: "0%",
        bottom: "0%",
        background: "rgba(118, 128, 141, 0.05)",
        borderRadius: "5px"
    }
}));


const SbtModal = ({ onClose }: { onClose: any }) => {
    const classes = useStyles();
    const [name, setName] = useState('');

    const [images, setImage] = useState(['']);
    return (
        <Box sx={{ width: 930, flex: 1, paddingBottom: '80px', paddingLeft: '3px', borderRadius: '20px 0px 0px 20px' }}>
            <IconButton sx={{ position: 'fixed', right: 32, top: 32 }} onClick={onClose}>
                <img src={CloseSVG} />
            </IconButton>
            <Box display="flex" flexDirection="column" my={6} alignItems="center">
                <img src={rectangleSbt} />
                <Typography mt={2.5} className={classes.headerTitle}>Welcome, User</Typography>
                <Typography mt={1.5} className={classes.headerDescription}>Set your info, privacy, and security</Typography>
            </Box>
            <Box>
                <TextInput value={name}
                    onChange={(evt: any) => setName(evt.target.value)}
                    placeholder="myname" sx={{ my: 2, width: 350 }} label="Name" />
            </Box>
            <Box>
                <Typography mt={4.5} className={classes.textInput}>My SBTs</Typography>
                {images.map((url: string) => {
                    return <Box>
                        <img src={url} />
                        <Typography>Name of the sbt</Typography>
                    </Box>
                })}
            </Box>
            <Grid container display='flex' flexDirection="row" justifyContent='flex-start' mb={10}>
                <Box display='flex' flexDirection="row" alignContent='center'>
                    <Typography mt={4.5} className={classes.textInput}>My Earnings</Typography>
                    <Button variant="outlined">Request Payment</Button>
                </Box>
                <Grid container display='flex' flexDirection="row" className={classes.sweatContainer}>
                    <Grid item display='flex' flexDirection="row" paddingLeft={2}>
                        <img src={greyStar} />
                        <Typography className={classes.textInput}>24 SWEAT</Typography>
                    </Grid>
                    <Grid item paddingLeft={2}>
                        <Typography className={classes.textInput}>240 Hk</Typography>
                    </Grid>
                    <Grid item paddingLeft={2}>
                        <Typography className={classes.textInput}>240 Bv</Typography>
                    </Grid>
                    <Grid item paddingLeft={2}>
                        <Typography className={classes.textInput}>240 Tok</Typography>
                    </Grid>
                    <Grid item paddingLeft={2}>
                        <Typography className={classes.textInput}>240 RhO</Typography>
                    </Grid>
                    <Grid item paddingLeft={2}>
                        <Typography className={classes.textInput}>240 Eth</Typography>
                    </Grid>
                    <Grid item paddingLeft={2}>
                        <Typography className={classes.textInput}>240 Eth</Typography>
                    </Grid>
                    <Grid item display='flex' flexDirection="row" paddingLeft={2}>
                        <img src={greyGroup} />
                        <Typography>$8.34</Typography>
                        <Typography className={classes.textInput}>total</Typography>
                    </Grid>
                </Grid>
                <Box display='flex' flexDirection="column">
                    <Typography mt={4.5} className={classes.textInput}>Table</Typography>
                </Box>
            </Grid>
        </Box>
    )
}

export default SbtModal;