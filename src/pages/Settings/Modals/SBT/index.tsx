import { Box, Typography, Grid, Button, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react";
import { get as _get } from 'lodash'
import { KeyboardArrowDown } from '@mui/icons-material';
import IconButton from "components/IconButton"
import CloseSVG from 'assets/svg/close-new.svg'
import rectangleSbt from 'assets/svg/group265.svg'
import greyStar from 'assets/svg/greySmallStar.svg'
import greyGroup from 'assets/svg/greySmallGroup.svg'
import debitCreditFull from 'assets/svg/debitCreditFull.svg'
import debitCreditTransparent from 'assets/svg/debitCreditTransparent.svg'
import orangeUploadIcon from 'assets/svg/orangeUploadIcon.svg'
import invertedSBTSquare from 'assets/svg/invertedSBTSquare.svg'
import ploygon from 'assets/svg/ploygon.svg'
import TextInput from "components/TextInput"
import { SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains';
import { CHAIN_INFO } from 'constants/chainInfo'
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
    },
    orangeUploadButton: {
        marginLeft: 10,
        background: 'linear-gradient(180deg, #FBF4F2 0%, #EEF1F5 100%)',
        width: 25,
        height: 25,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    tableContainer: {
        maxHeight: 811,
        overflow: 'scroll'
    },
    select: {
        background: '#FFF',
        borderRadius: '10px !important',
        boxShadow: 'none !important',
        fontSize: '16px !important',
        minWidth: 'inherit !importnt',
        padding: '0px !important'
    },
    requestPaymentButton: {
        background: '#fff !important',
        color: '#B12F15 !important',
        fontSize: '16px !important',
        boxShadow: '3px 5px 4px rgba(27, 43, 65, 0.05), -3px -3px 8px rgba(201, 75, 50, 0.1) !important',
        borderRadius: '5px !important',
        width: '177px !important',
        height: '40px !important',
        padding: '0px !important',
        lineHeight: '18px !important',
        letterSpacing: '-1.1% !important',
    }
}));

const SbtModal = ({ onClose }: { onClose: any }) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const tableData = [{ status: 'Awaiting Payment', time: null, amount: '120 ETH' }, { status: 'Paid', time: '10/20 10:33', amount: '120 ETH' }]
    const currencies = [{ name: '24 SWEAT', icon: greyStar }, { name: '240 Bv', icon: '' }, { name: '240 Tok', icon: '' }, { name: '240 RhO', icon: '' }, { name: '240 Eth', icon: '' }]
    const [images, setImage] = useState(['https://loremflickr.com/320/240?lock=212', 'https://loremflickr.com/320/240?lock=30976', 'https://loremflickr.com/320/240?lock=1']);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [currentChain, setCurrentChain] = useState(SupportedChainId.GOERLI)

    return (
        <Box sx={{ width: 786, flex: 1, paddingBottom: '80px', paddingLeft: '3px', borderRadius: '20px 0px 0px 20px' }}>
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
                <Typography mt={2.5} className={classes.textInput}>My SBTs</Typography>
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
                <Grid display='flex' flexDirection="row" alignItems='center' justifyContent='space-between' width={'100%'} mb={2.5}>
                    <Grid display='flex' flexDirection="row" alignItems='center'>
                        <Typography className={classes.textInput}>My Earnings</Typography>
                        <Button onClick={handleClick} aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} className={classes.select} variant="contained" color="secondary" disableElevation startIcon={<img style={{ width: 18, height: 18 }} src={_get(CHAIN_INFO, `${currentChain}.logoUrl`)} />} endIcon={<KeyboardArrowDown />}>
                            {_get(CHAIN_INFO, `${currentChain}.label`)}
                        </Button>
                        <Menu
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {
                                SUPPORTED_CHAIN_IDS.map(sc =>
                                    <MenuItem style={{ textTransform: 'uppercase' }} onClick={() => { handleClose() }}>
                                        <img style={{ marginRight: '8px', width: 18, height: 18 }} src={CHAIN_INFO[sc].logoUrl} />{CHAIN_INFO[sc].label}</MenuItem>)
                            }
                        </Menu>
                    </Grid>
                    <Button variant="contained" className={classes.requestPaymentButton}>Request Payment</Button>
                </Grid>
                <Grid container display='flex' flexDirection="row" justifyContent="space-between" className={classes.sweatContainer}>
                    <Grid item display='flex' flexDirection="row">{currencies.map((currency) => {
                        return <Grid item display='flex' flexDirection="row" paddingLeft={2}>
                            <img src={currency.icon} style={{ marginRight: 9 }} />
                            <Typography className={classes.textInput}>{currency.name}</Typography>
                        </Grid>
                    })}
                    </Grid>
                    <Grid item paddingLeft={2} display='flex' flexDirection="row">
                        <img src={greyGroup} style={{ marginRight: 6 }} />
                        <Typography className={classes.textInput} color="#188C7C" style={{ marginRight: 6 }}>$8,34</Typography>
                        <Typography className={classes.textInput}>total</Typography>
                    </Grid>
                </Grid>
                <Grid container display='flex' flexDirection="column" justifyContent="space-between" my={3} className={classes.tableContainer}>
                    {tableData.map((data: any, index: number) => {
                        return <Grid display='flex' flexDirection="row" justifyContent="space-between" sx={{ opacity: index > 0 ? 1 : 0.5 }}>
                            <Grid item display="flex" flexDirection="row" alignItems='center'>
                                <Box display="flex" flexDirection="row" padding={2}>
                                    <img src={index > 0 ? debitCreditFull : debitCreditTransparent} style={{ marginRight: 8 }} />
                                    <Typography>{data.amount}</Typography>
                                    <Typography sx={{paddingX: 1}}>/</Typography>
                                    <img src={ploygon} />
                                </Box>
                                <Box>
                                    <Typography className={classes.textInput}>Invoice | UI improvements</Typography>
                                    <Typography>from Name of Organisation</Typography>
                                </Box>
                            </Grid>
                            <Grid display='flex' flexDirection="row" justifyContent="center" alignItems="center">
                                <Grid display='flex' flexDirection="column" justifyContent="flex-end" alignItems="center" sx={{float: 'right'}}>
                                    <Typography className={classes.textInput}>{data.status}</Typography>
                                    <Typography>{data.time || '...'}</Typography>
                                </Grid>
                                {index > 0 ? <Box className={classes.orangeUploadButton}>
                                    <img src={orangeUploadIcon} width={15} height={15} />
                                </Box> : <Box width={25}></Box>}
                            </Grid>
                        </Grid>
                    })
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default SbtModal;