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
import Button from "components/Button";
import { useWeb3Auth } from "context/web3Auth";
import { WALLET_ADAPTERS } from "@web3auth/base";
import Modal from "@mui/material/Modal";

import screenshot from "assets/svg/screenshot 1.svg";
import { loadDAOListAction } from "store/actions/dao";
import { useDAO } from "context/dao";
import { useAppSelector } from "helpers/useAppSelector";

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
  const { DAOList } = useDAO();
  const [logined, setLogined] = React.useState("inlineFlex");

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const hasUncompletedDao = (_daoList: any) => {
    const uncompletedDas = _daoList.filter(
      (item: any) => item.safes.length === 0
    );
    return uncompletedDas.length ? uncompletedDas[0] : false;
  };

  function isArray(value: any) {
    return Array.isArray(value);
  }

  useEffect(() => {
    if (token && user && account) {
      setLogined("none");
      dispatch(loadDAOListAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, account]);

  useEffect(() => {
    if (token && user && account) {
      if (DAOList !== null && isArray(DAOList)) {
        if (DAOList?.length) {
          const uncompletedDao = hasUncompletedDao(DAOList);
          if (uncompletedDao) {
            navigate(`/${uncompletedDao?.url}/attach-safe/new`, {
              replace: true,
              state: { createFlow: true },
            });
          } else {
            if (from) {
              const manDisc = localStorage.getItem("MANUAL_DISCONNECT");
              if (!manDisc) navigate(from);
              else {
                localStorage.removeItem("MANUAL_DISCONNECT");
                navigate("/");
              }
            }
          }
        } else {
          navigate("/");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DAOList, token, user, account]);

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

  return (
    <>
      <Grid container className={classes.root}>
        <Container style={{ position: "absolute", top: 0 }} maxWidth="lg">
          <Box
            sx={{ mt: 3 }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            style={{ float: "right", display: logined }}
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

export default Login;
