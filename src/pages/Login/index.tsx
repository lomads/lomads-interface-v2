import React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  throttle as _throttle,
  debounce as _debounce,
  get as _get,
  find as _find,
} from 'lodash'
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Menu,
  Link,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@mui/styles'
import CHEERS from 'assets/svg/cheers.svg'
//import LOMADS_LOGO from 'assets/svg/lomadsfulllogo.svg'
import LOMADS_LOGO from 'assets/svg/Group 773.svg'
import LOMADS_LOGO_TEXT from 'assets/svg/Group 772.svg'
import METAMASK from 'assets/images/metamask.png'
import COIINBASE from 'assets/images/Coinbase-icon.svg'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import GMAIL from 'assets/images/gmail.png'
import APPLE from 'assets/images/apple.png'
import { KeyboardArrowDown } from '@mui/icons-material'
import { SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import toast from 'react-hot-toast'
import {
  createAccountAction,
  setTokenAction,
  setNetworkConfig,
  logoutAction,
  setUserAction,
} from 'store/actions/session'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'components/Button'
import { useWeb3Auth } from 'context/web3Auth'
import { WALLET_ADAPTERS } from '@web3auth/base'
import { ethers } from 'ethers'
import { CHAIN_INFO } from 'constants/chainInfo'
import Modal from '@mui/material/Modal'

import screenshot from 'assets/svg/screenshot 1.svg'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100vh',
    maxHeight: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden !important',
  },
  logo: {
    width: 138,
    height: 81,
  },
  cheers: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  },
  metamaskButton: {
    height: '80px !important',
    cursor: 'pointer',
    alignContent: 'inherit',
    background: '#fff',
    borderColor: '#c94b32',
    borderRadius: '10px !important',
    borderWidth: 0,
    filter:
      'drop-shadow(3px 5px 4px rgba(27,43,65,.05)) drop-shadow(-3px -3px 8px rgba(201,75,50,.1)) !important',
    padding: 40,
  },
  walletBtn: {
    height: '80px !important',
    cursor: 'pointer',
    alignContent: 'inherit',
    background: '#fff',
    borderColor: '#c94b32',
    borderRadius: '10px !important',
    borderWidth: 0,
    padding: 40,
    color: '#000!important',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px!important',
  },
  walletImg: {
    height: '30px',
    width: '30px',
  },
  select: {
    background: '#FFF',
    borderRadius: '10px !important',
    boxShadow: 'none !important',
    fontSize: '16px !important',
    minWidth: 'inherit !importnt',
    padding: '0px !important',
  },
}))

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const from = searchParams.get('from')
  const { token, user, selectedChainId } = useSelector(
    (store: any) => store.session
  )
  const [currentChain, setCurrentChain] = useState(SupportedChainId.GOERLI)
  const [reloaded, setReloaded] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const { provider, login, account, chainId, logout, web3Auth } = useWeb3Auth()

  const [openModal, setOpen] = React.useState(false)
  const handleOpenModal = () => {
    setOpen(true)
  }
  const handleCloseModal = () => {
    setOpen(false)
  }

  // useEffect(() => {
  //     if(window?.ethereum){
  //         const chainInfo = CHAIN_INFO[+_get(window?.ethereum, 'networkVersion', 5)]
  //         dispatch(setNetworkConfig({ selectedChainId: +_get(window?.ethereum, 'networkVersion', 5), chain: chainInfo.chainName, web3AuthNetwork: chainInfo.network }))
  //     }
  // }, [window?.ethereum])

  // const handleOnMessage = (message: any) => {
  //     if(message?.data?.data?.data?.method === "metamask_chainChanged" && message?.data?.data?.data?.params?.networkVersion !== "loading") {
  //         console.log("+message?.data?.data?.data?.method?.params?.networkVersion", message?.data?.data?.data?.params?.networkVersion)
  //         if(!isNaN(+message?.data?.data?.data?.params?.networkVersion)) {
  //             const chainInfo = CHAIN_INFO[+message?.data?.data?.data?.params?.networkVersion]
  //             if(chainInfo) {
  //                 dispatch(setNetworkConfig({ selectedChainId: +message?.data?.data?.data?.params?.networkVersion, chain: chainInfo.chainName, web3AuthNetwork: chainInfo.network }))
  //             }
  //         }
  //     }
  // }

  // useEffect(() => {
  //     window.addEventListener("message", handleOnMessage);
  //     return () => {
  //       window.removeEventListener("message", handleOnMessage);
  //     };
  //   }, []);

  useEffect(() => {
    setCurrentChain(selectedChainId)
  }, [selectedChainId])

  useEffect(() => {
    console.log('TOKEN , USER, ACC', token, user, account)
    if (token && user && account) {
      if (from) {
        const manDisc = localStorage.getItem('MANUAL_DISCONNECT')
        if (!manDisc) navigate(from)
        else {
          localStorage.removeItem('MANUAL_DISCONNECT')
          navigate('/')
        }
      } else navigate('/')
    }
  }, [token, user, account])

  const handleSwitchNetwork = _throttle(async (chain: any) => {
    const chainInfo = CHAIN_INFO[chain]
    console.log(chainInfo)
    dispatch(
      setNetworkConfig({
        selectedChainId: chain,
        chain: chainInfo.chainName,
        web3AuthNetwork: chainInfo.network,
      })
    )
    setCurrentChain(chain)
  }, 1000)

  // useEffect(() => {
  //     if (account && token && web3Auth) {
  //         if(web3Auth?.connectedAdapterName === "openlogin") {
  //             web3Auth?.getUserInfo()
  //             .then((res:any) => {
  //                 console.log("userInfo", res)
  //                 setUserInfo(res)
  //                 setState((prev: any) => {
  //                     return {
  //                         ...prev,
  //                         name: _get(res, 'name', null),
  //                         email: _get(res, 'email', null),
  //                     }
  //                 })
  //             })
  //         }
  //     }
  // }, [account, token, web3Auth])

  const handleLogin = async (
    loginType = WALLET_ADAPTERS.METAMASK,
    provider: undefined | string = undefined
  ) => {
    dispatch(logoutAction())
    await logout()
    console.log('window?.ethereum', window?.ethereum)
    // if(window?.ethereum){
    //     const chainInfo = CHAIN_INFO[+_get(window?.ethereum, 'networkVersion', 5)]
    //     console.log(chainInfo)
    //     dispatch(setNetworkConfig({ selectedChainId: +_get(window?.ethereum, 'networkVersion', 5), chain: chainInfo.chainName, web3AuthNetwork: chainInfo.network }))
    // }
    //setTimeout(async () => {
    let token = null
    if (
      loginType === WALLET_ADAPTERS.METAMASK ||
      loginType === WALLET_ADAPTERS.COINBASE
    ) {
      token = await login(loginType)
    } else if (loginType === WALLET_ADAPTERS.OPENLOGIN) {
      token = await login(WALLET_ADAPTERS.OPENLOGIN, provider)
    }
    if (token) {
      let userInfo = null
      if (web3Auth?.connectedAdapterName === 'openlogin')
        userInfo = await web3Auth?.getUserInfo()
      dispatch(createAccountAction({ token, userInfo }))
    }
    //}, 1000)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Container style={{ position: 'absolute', top: 0 }} maxWidth='lg'>
          <Box
            sx={{ mt: 3 }}
            display='flex'
            flexDirection='row'
            alignItems='center'
            style={{ float: 'right' }}
          >
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://lomads.medium.com/'
              sx={{ mx: 2 }}
              color='primary'
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              BLOG
            </Link>
            <Link
              rel='noopener noreferrer'
              target='_blank'
              href='https://lomads-1.gitbook.io/lomads/'
              sx={{ ml: 2, mr: 3 }}
              color='primary'
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              DOCS
            </Link>
            <Button
              onClick={() =>
                window.open(
                  `https://calendly.com/lomads-nishant/nishant-lomads-reg`,
                  '_blank'
                )
              }
              size='small'
              variant='contained'
              endIcon={<ArrowRightAltIcon />}
            >
              Request Demo
            </Button>
          </Box>
        </Container>
        <Grid
          xs={12}
          item
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Box zIndex={0} position='absolute' bottom={0}>
            <img src={CHEERS} style={{ marginBottom: '-5px' }} />
          </Box>
          <Box
            mb={8}
            mt={6}
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
          >
            <img src={LOMADS_LOGO} />
            <img
              style={{
                height: 30,
                width: 147,
                objectFit: 'contain',
                marginTop: '15px',
              }}
              src={LOMADS_LOGO_TEXT}
            />
          </Box>
          <Box
            sx={{
              zIndex: 999,
              height: '362px',
              borderRadius: '10px',
              boxShadow:
                '-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)',
              overflow: 'hidden',
            }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box>
              <img src={screenshot} />
            </Box>

            <Box
              sx={{ width: '450px', height: '100%', background: '#FFF' }}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
            >
              <Typography
                color='primary'
                sx={{
                  fontSize: '30px',
                  fontWeight: '400',
                  marginBottom: '35px',
                }}
              >
                Connect Your Wallet
              </Typography>
              <Box display='flex' flexDirection='row'>
                <Button
                  onClick={() => handleOpenModal()}
                  className={classes.metamaskButton}
                  variant='contained'
                  color='secondary'
                  sx={{
                    ':hover': {
                      backgroundColor: '#AC685D',
                      boxShadow:
                        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                      color: '#fff!important',
                      transition: 'all .3s ease',
                    },
                  }}
                >
                  Login With Wallet
                </Button>
              </Box>
              <Box sx={{ margin: '22px 0' }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='210'
                  height='2'
                  viewBox='0 0 210 2'
                  fill='none'
                >
                  <path
                    d='M1 1H209'
                    stroke='#C94B32'
                    stroke-width='2'
                    stroke-linecap='round'
                  />
                </svg>
              </Box>
              <Typography
                variant='h2'
                style={{
                  fontSize: '16px',
                  color: 'rgba(27, 43, 65, 0.5)',
                  cursor: 'pointer',
                }}
              >
                Or continue without your wallet:{' '}
              </Typography>
              <Box
                sx={{}}
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() =>
                    handleLogin(WALLET_ADAPTERS.OPENLOGIN, 'google')
                  }
                  style={{
                    marginRight: '22px',
                    width: '144px',
                    height: '50px',
                    background: '#FFF',
                    boxShadow:
                      '-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)',
                    borderRadius: '5px',
                  }}
                >
                  <img style={{ width: 100, cursor: 'pointer' }} src={GMAIL} />
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  onClick={() =>
                    handleLogin(WALLET_ADAPTERS.OPENLOGIN, 'apple')
                  }
                  style={{
                    width: '144px',
                    height: '50px',
                    background: '#FFF',
                    boxShadow:
                      '-3px -3px 8px 0px rgba(201, 75, 50, 0.10), 3px 5px 4px 0px rgba(27, 43, 65, 0.05)',
                    borderRadius: '5px',
                  }}
                >
                  <img style={{ width: 80, cursor: 'pointer' }} src={APPLE} />
                </Box>
              </Box>
            </Box>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-describedby='parent-modal-description'
      >
        <Box
          sx={{
            ...style,
            boxSshadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
            border: 'none',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingTop: '24px',
            paddingBottom: '24px',
          }}
        >
          <Button
            onClick={() => handleLogin(WALLET_ADAPTERS.METAMASK)}
            className={classes.walletBtn}
            variant='contained'
            color='secondary'
            sx={{
              ':hover': {
                backgroundColor: '#AC685D',
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                color: '#fff!important',
                transition: 'all .3s ease',
              },
            }}
          >
            <img src={METAMASK} className={classes.walletImg} alt='' />
            &nbsp; METAMASK
          </Button>
          <Button
            onClick={() => handleLogin(WALLET_ADAPTERS.COINBASE)}
            className={classes.walletBtn}
            variant='contained'
            color='secondary'
            sx={{
              ':hover': {
                backgroundColor: '#AC685D',
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                color: '#fff!important',
                transition: 'all .3s ease',
              },
            }}
          >
            <img src={COIINBASE} className={classes.walletImg} alt='' />
            &nbsp; COIN BASE
          </Button>
        </Box>
      </Modal>
    </>
  )
}
