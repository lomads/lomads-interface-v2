<<<<<<< HEAD
import React from "react";
import { useEffect } from "react";
import { Container, Grid, Typography, Box, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CHEERS from "assets/svg/cheers.svg";
import LOMADS_LOGO from "assets/svg/Group 773.svg";
import LOMADS_LOGO_TEXT from "assets/svg/Group 772.svg";
import METAMASK from "assets/images/metamask.png";
import COIINBASE from "assets/images/Coinbase-icon.svg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import GMAIL from "assets/images/gmail.png";
import APPLE from "assets/images/apple.png";
import { createAccountAction, logoutAction } from "store/actions/session";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
=======
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { throttle as _throttle, debounce as _debounce, get as _get, find as _find } from 'lodash'
import { Container, Grid, Typography, Box, Paper, Menu, Link, useMediaQuery } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import CHEERS from 'assets/svg/cheers.svg'
//import LOMADS_LOGO from 'assets/svg/lomadsfulllogo.svg'
import LOMADLOGO from "../../assets/svg/lomadsLogoRed.svg";
import MOBILEDEVICE from "../../assets/svg/mobile_device.svg";
import LOMADS_LOGO from 'assets/svg/Group 773.svg'
import LOMADS_LOGO_TEXT from 'assets/svg/Group 772.svg'
import METAMASK from 'assets/svg/metamask.svg'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import GMAIL from 'assets/images/gmail.png'
import APPLE from 'assets/images/apple.png'
import { KeyboardArrowDown } from '@mui/icons-material';
import { SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains';
import toast from 'react-hot-toast';
import { createAccountAction, setTokenAction, setNetworkConfig, logoutAction, setUserAction } from 'store/actions/session';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
>>>>>>> 827c7d84e6aafde5552cf74b7f96669d0ad4c284
import Button from "components/Button";
import { useWeb3Auth } from "context/web3Auth";
import { WALLET_ADAPTERS } from "@web3auth/base";
import Modal from "@mui/material/Modal";

import screenshot from "assets/svg/screenshot 1.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const useStyles = makeStyles((theme: any) => ({
<<<<<<< HEAD
  root: {
    height: "100vh",
    maxHeight: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden !important",
  },
  logo: {
    width: 138,
    height: 81,
  },
  cheers: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },
  metamaskButton: {
    height: "80px !important",
    cursor: "pointer",
    alignContent: "inherit",
    background: "#fff",
    borderColor: "#c94b32",
    borderRadius: "10px !important",
    borderWidth: 0,
    filter:
      "drop-shadow(3px 5px 4px rgba(27,43,65,.05)) drop-shadow(-3px -3px 8px rgba(201,75,50,.1)) !important",
    padding: 40,
  },
  walletBtn: {
    height: "80px !important",
    cursor: "pointer",
    alignContent: "inherit",
    background: "#fff",
    borderColor: "#c94b32",
    borderRadius: "10px !important",
    borderWidth: 0,
    padding: 40,
    color: "#000!important",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px!important",
  },
  walletImg: {
    height: "30px",
    width: "30px",
  },
  select: {
    background: "#FFF",
    borderRadius: "10px !important",
    boxShadow: "none !important",
    fontSize: "16px !important",
    minWidth: "inherit !importnt",
    padding: "0px !important",
  },
=======
    root: {
        minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden !important'
    },
    logo: {
        width: 138,
        height: 81
    },
    cheers: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center'
    },
    metamaskButton: {
        height: '80px !important',
        cursor: 'pointer',
        alignContent: "inherit",
        background: "#fff",
        borderColor: "#c94b32",
        borderRadius: '10px !important',
        borderWidth: 0,
        filter: "drop-shadow(3px 5px 4px rgba(27,43,65,.05)) drop-shadow(-3px -3px 8px rgba(201,75,50,.1)) !important",
        padding: 40
    },
    select: {
        background: '#FFF',
        borderRadius: '10px !important',
        boxShadow: 'none !important',
        fontSize: '16px !important',
        minWidth: 'inherit !importnt',
        padding: '0px !important'
    },    
    subtitle1: {
        fontSize: '25px !important',
        fontWeight: '400 !important',
        lineHeight: '30px !important',
        textAlign: 'center',
        color: '#B12F15',
        margin: '30px 0 !important'
    },
    subtitle2: {
        fontSize: '38px !important',
        lineHeight: '42px !important',
        textTransform: 'uppercase',
        color: '#1B2B41',
	textAlign: 'center',
    },
>>>>>>> 827c7d84e6aafde5552cf74b7f96669d0ad4c284
}));

const Login = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpen] = React.useState(false);
  const { token, user } = useSelector((store: any) => store.session);
  const { login, account, logout, web3Auth } = useWeb3Auth();

<<<<<<< HEAD
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
=======
    const { provider, login, account, chainId, logout, web3Auth } = useWeb3Auth();
    const matches = useMediaQuery('(min-width:992px)');
>>>>>>> 827c7d84e6aafde5552cf74b7f96669d0ad4c284

  useEffect(() => {
    if (token && user && account) {
      if (from) {
        const manDisc = localStorage.getItem("MANUAL_DISCONNECT");
        if (!manDisc) navigate(from);
        else {
          localStorage.removeItem("MANUAL_DISCONNECT");
          navigate("/");
        }
      } else navigate("/");
    }
<<<<<<< HEAD
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, account]);

  const handleLogin = async (
    loginType = WALLET_ADAPTERS.METAMASK,
    provider: undefined | string = undefined
  ) => {
    dispatch(logoutAction());
    await logout();
    let token = null;
    if (
      loginType === WALLET_ADAPTERS.METAMASK ||
      loginType === WALLET_ADAPTERS.COINBASE
    ) {
      token = await login(loginType);
    } else if (loginType === WALLET_ADAPTERS.OPENLOGIN) {
      token = await login(WALLET_ADAPTERS.OPENLOGIN, provider);
    }
    if (token) {
      let userInfo = null;
      if (web3Auth?.connectedAdapterName === "openlogin")
        userInfo = await web3Auth?.getUserInfo();
      dispatch(createAccountAction({ token, userInfo }));
    }
  };
=======
    if (matches) {
    return (
        <>
            <Grid container className={classes.root}>
                <Container style={{ position: 'absolute', top: 0 }} maxWidth="lg">
                    <Box sx={{ mt: 3 }} display="flex" flexDirection="row" alignItems="center" style={{ float: 'right' }}>
                        <Link rel="noopener noreferrer" target="_blank" href="https://lomads.medium.com/" sx={{ mx: 2 }} color="primary" style={{ textDecoration: 'none', cursor: 'pointer' }}>BLOG</Link>
                        <Link rel="noopener noreferrer" target="_blank" href="https://lomads-1.gitbook.io/lomads/" sx={{ ml: 2, mr: 3 }} color="primary" style={{ textDecoration: 'none', cursor: 'pointer' }}>DOCS</Link>
                        <Button onClick={() => window.open(`https://calendly.com/lomads-nishant/nishant-lomads-reg`, '_blank')} size="small" variant="contained" endIcon={<ArrowRightAltIcon />}>Request Demo</Button>
                    </Box>
                </Container>
                <Grid xs={12} item display="flex" flexDirection="column" alignItems="center">
                    <Box zIndex={0} position="absolute" bottom={0}>
                        <img src={CHEERS} style={{ marginBottom: '-5px' }} />
                    </Box>
                    <Box mb={8} mt={6} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <img src={LOMADS_LOGO} />
                        <img style={{ height: 30, width: 147, objectFit: 'contain', marginTop: '15px' }} src={LOMADS_LOGO_TEXT} />
                    </Box>
                    <Box sx={{ zIndex: 999, height: '362px', borderRadius: '10px', boxShadow: '-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)', overflow: 'hidden' }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
>>>>>>> 827c7d84e6aafde5552cf74b7f96669d0ad4c284

  return (
    <>
      <Grid container className={classes.root}>
        <Container style={{ position: "absolute", top: 0 }} maxWidth="lg">
          <Box
            sx={{ mt: 3 }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            style={{ float: "right" }}
          >
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://lomads.medium.com/"
              sx={{ mx: 2 }}
              color="primary"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              BLOG
            </Link>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://lomads-1.gitbook.io/lomads/"
              sx={{ ml: 2, mr: 3 }}
              color="primary"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              DOCS
            </Link>
            <Button
              onClick={() =>
                window.open(
                  `https://calendly.com/lomads-nishant/nishant-lomads-reg`,
                  "_blank"
                )
              }
              size="small"
              variant="contained"
              endIcon={<ArrowRightAltIcon />}
            >
              Request Demo
            </Button>
          </Box>
        </Container>
        <Grid
          xs={12}
          item
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box zIndex={0} position="absolute" bottom={0}>
            <img src={CHEERS} style={{ marginBottom: "-5px" }} alt="" />
          </Box>
          <Box
            mb={8}
            mt={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <img src={LOMADS_LOGO} alt="" />
            <img
              style={{
                height: 30,
                width: 147,
                objectFit: "contain",
                marginTop: "15px",
              }}
              src={LOMADS_LOGO_TEXT}
              alt="text_logo"
            />
          </Box>
          <Box
            sx={{
              zIndex: 999,
              height: "362px",
              borderRadius: "10px",
              boxShadow:
                "-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)",
              overflow: "hidden",
            }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box>
              <img src={screenshot} alt="" />
            </Box>

            <Box
              sx={{ width: "450px", height: "100%", background: "#FFF" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography
                color="primary"
                sx={{
                  fontSize: "30px",
                  fontWeight: "400",
                  marginBottom: "35px",
                }}
              >
                Connect Your Wallet
              </Typography>
              <Box display="flex" flexDirection="row">
                <Button
                  onClick={() => handleOpenModal()}
                  className={classes.metamaskButton}
                  variant="contained"
                  color="secondary"
                  sx={{
                    ":hover": {
                      backgroundColor: "#AC685D",
                      boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                      color: "#fff!important",
                      transition: "all .3s ease",
                    },
                  }}
                >
                  Login With Wallet
                </Button>
              </Box>
              <Box sx={{ margin: "22px 0" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="210"
                  height="2"
                  viewBox="0 0 210 2"
                  fill="none"
                >
                  <path
                    d="M1 1H209"
                    stroke="#C94B32"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Box>
              <Typography
                variant="h2"
                style={{
                  fontSize: "16px",
                  color: "rgba(27, 43, 65, 0.5)",
                  cursor: "pointer",
                }}
              >
                Or continue without your wallet:{" "}
              </Typography>
              <Box
                sx={{}}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() =>
                    handleLogin(WALLET_ADAPTERS.OPENLOGIN, "google")
                  }
                  style={{
                    marginRight: "22px",
                    width: "144px",
                    height: "50px",
                    background: "#FFF",
                    boxShadow:
                      "-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    style={{ width: 100, cursor: "pointer" }}
                    src={GMAIL}
                    alt=""
                  />
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() =>
                    handleLogin(WALLET_ADAPTERS.OPENLOGIN, "apple")
                  }
                  style={{
                    width: "144px",
                    height: "50px",
                    background: "#FFF",
                    boxShadow:
                      "-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    style={{ width: 80, cursor: "pointer" }}
                    src={APPLE}
                    alt=""
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box height={200}></Box>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            boxSshadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            border: "none",
            borderRadius: "6px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          <Button
            onClick={() => handleLogin(WALLET_ADAPTERS.METAMASK)}
            className={classes.walletBtn}
            variant="contained"
            color="secondary"
            sx={{
              ":hover": {
                backgroundColor: "#AC685D",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                color: "#fff!important",
                transition: "all .3s ease",
              },
            }}
          >
            <img src={METAMASK} className={classes.walletImg} alt="" />
            &nbsp; METAMASK
          </Button>
          <Button
            onClick={() => handleLogin(WALLET_ADAPTERS.COINBASE)}
            className={classes.walletBtn}
            variant="contained"
            color="secondary"
            sx={{
              ":hover": {
                backgroundColor: "#AC685D",
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                color: "#fff!important",
                transition: "all .3s ease",
              },
            }}
          >
            <img src={COIINBASE} className={classes.walletImg} alt="" />
            &nbsp; COIN BASE
          </Button>
        </Box>
      </Modal>
    </>
  );
};

<<<<<<< HEAD
export default Login;
=======
                    </Box>




                    {/* <Box mt={4} display="flex" flexDirection="row" alignItems="center">
                        <Typography variant='body1' fontWeight="bold" mr={2}>Select Blockchain:</Typography>
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
                                    <MenuItem style={{ textTransform: 'uppercase' }} onClick={() => { handleSwitchNetwork(sc); handleClose() }}>
                                        <img style={{ marginRight: '8px', width: 18, height: 18 }} src={CHAIN_INFO[sc].logoUrl} />{CHAIN_INFO[sc].label}</MenuItem>)
                            }
                        </Menu>
                    </Box> */}
                    <Box height={200}></Box>
                </Grid>
            </Grid>
        </>
    );
}
else {
    return (
        <Grid container className={classes.root}>
            <Grid xs={12} item display="flex" flexDirection="column" alignItems="center">
                <Box position="absolute" top={0} left={0} sx={{ padding: '30px' }}>
                    <img src={LOMADLOGO} />
                </Box>
                <Box>
                    <img src={MOBILEDEVICE} />
                </Box>
                <Box sx={{ padding: '0 30px' }}>
                    <Typography className={classes.subtitle1}>Lomads app needs a PC<br />for now.</Typography>
                    <Typography className={classes.subtitle2} sx={{ fontWeight: '800' }}>CATCH YOU<br /> ON THE <span style={{ fontWeight: '300', fontStyle: 'italic', color: '#C94B32' }}><br />BIG SCREEN</span></Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
};
>>>>>>> 827c7d84e6aafde5552cf74b7f96669d0ad4c284
