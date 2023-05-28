import { Box, Typography, Grid, Button } from "@mui/material"
import React, { useState } from "react";
import IconButton from "components/IconButton"
import CloseSVG from 'assets/svg/close-new.svg'
import rectangleSbt from 'assets/svg/group265.svg'
import greyStar from 'assets/svg/greySmallStar.svg'
import greyGroup from 'assets/svg/greySmallGroup.svg'
import orangeUploadIcon from 'assets/svg/orangeUploadIcon.svg'
import invertedSBTSquare from 'assets/svg/invertedSBTSquare.svg'
import TextInput from "components/TextInput"
import Select from "components/Select"
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
    imageContainer: {
        position: 'relative',
        display: "inline-block",
    },
    textOverlay: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        color: "#fff",
        padding: '15px',
        background: 'rgb(118,128,141,0.5)',
    },
    imgText: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: '700 !important',
        fontSize: "14px",
        lineHeight: "15px",
        letter: "-1.1%"
    },
    sbtIcon: {
        marginRight: 5,
        marginBottom: 4
    }
}));


const SbtModal = ({ onClose }: { onClose: any }) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const tableData = [{ status: 'Awaiting Payment', time: null, amount: '120 ETH'},{ status: 'Paid', time: '10/20 10:33', amount: '120 ETH'}]
    const currencies = [{ name: '24 SWEAT', icon: greyStar }, { name: '240 Bv', icon: '' }, { name: '240 Tok', icon: '' }, { name: '240 RhO', icon: '' }, { name: '240 Eth', icon: '' }]
    const [images, setImage] = useState(['https://loremflickr.com/320/240?lock=212', 'https://loremflickr.com/320/240?lock=30976', 'https://loremflickr.com/320/240?lock=1']);

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
                <Grid display='flex' flexDirection="row" position="relative" paddingY={2}>
                    {images.map((url: string, index: number) => {
                        return <Box paddingLeft={index > 0 ? 2.5 : 0}><Box className={classes.imageContainer}>
                            <img src={url} alt="Image" width="250px" height="150px" />
                            <Box className={classes.textOverlay}>
                                <img src={invertedSBTSquare} width="12px" height="12px" className={classes.sbtIcon} />
                                <Typography className={classes.imgText}>Name of your SBT</Typography>
                            </Box>
                        </Box>
                        </Box>
                    })}
                </Grid>
            </Box>
            <Grid container display='flex' flexDirection="row" justifyContent='flex-start' my={4}>
                <Box display='flex' flexDirection="row" alignContent='center'>
                    <Typography className={classes.textInput}>My Earnings</Typography>
                    <Select options={['polygon']} selected={0} setSelectedValue={() => { }} selectStyle={{ borderRadius: '0px 10px 10px 0px', borderWidth: 1, borderLeftWidth: 0, borderColor: 'rgba(27, 43, 65, 0.1)', boxShadow: 'inset -1px 0px 4px rgba(27, 43, 65, 0.1)', height: 50, padding: '0px 50px 0px 20px' }} />
                    <Button variant="outlined" sx={{ width: 77, height: 40, fontSize: 16 }}>Request Payment</Button>
                </Box>
                <Grid container display='flex' flexDirection="row" justifyContent="space-between" className={classes.sweatContainer}>
                    <Grid item display='flex' flexDirection="row">{currencies.map((currency) => {
                        return <Grid item display='flex' flexDirection="row" paddingLeft={2}>
                            <img src={currency.icon} style={{ marginRight: 9}}/>
                            <Typography className={classes.textInput}>{currency.name}</Typography>
                        </Grid>
                    })}
                    </Grid>
                    <Grid item paddingLeft={2} display='flex' flexDirection="row">
                        <img src={greyGroup} style={{ marginRight: 6}}/>
                        <Typography className={classes.textInput} color="#188C7C" style={{ marginRight: 6}}>$8,34</Typography>
                        <Typography className={classes.textInput}>total</Typography>
                    </Grid>
                </Grid>
                <Grid container display='flex' flexDirection="column" justifyContent="space-between" my={3}>
                   {tableData.map((data: any, index: number)=>{
                   return <Grid display='flex' flexDirection="row" justifyContent="space-between" sx={{ opacity: index>0? 1: 0.5}}>
                    <Grid item display="flex" flexDirection="row">
                        <Box display="flex" flexDirection="row" padding={2}>
                            <img src={greyGroup} style={{ marginRight: 8}}/>
                            <Typography>{data.amount} /</Typography>
                            <img src={''}/>
                        </Box>
                        <Box>   
                            <Typography className={classes.textInput}>Invoice | UI improvements</Typography>
                            <Typography>from Name of Organisation</Typography>
                        </Box>
                    </Grid>
                    <Grid display='flex' flexDirection="row" justifyContent="flex-end">
                    <Box>
                        <Typography className={classes.textInput}>{data.status}</Typography>
                        <Typography>{data.time || '...'}</Typography>
                    </Box>
                    <img src={orangeUploadIcon} width={25} height={25}/>
                    </Grid>
                   </Grid>
                   })
                }
                </Grid>
            </Grid>
        </Box >
    )
}

export default SbtModal;