import * as React from 'react';
import { get as _get, find as _find } from 'lodash'
import { makeStyles } from '@mui/styles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import palette from 'theme/palette';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import HeaderLogo from 'components/HeaderLogo';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'helpers/useAppDispatch';
import Account from 'components/Account';
import { useAppSelector } from 'helpers/useAppSelector';
import { useWeb3Auth } from 'context/web3Auth';
import { useDAO } from 'context/dao';


const drawerWidth: number = 116;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  height: 107,
  boxShadow: 'inherit',
  backgroundColor: 'transparent',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'absolute',
      left: 0,
      whiteSpace: 'nowrap',
      width: drawerWidth,
      background: `linear-gradient(178.31deg, #C94B32 0.74%, #A54536 63.87%)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.up('sm')]: {
          width: 0,
        },
      }),
    },
  }),
);

const useStyles = makeStyles((theme: any) => ({
    root: {
      display: 'flex',
      background: `linear-gradient(169.22deg,#fdf7f7 12.19%,#efefef 92%)`,
    },
    main: {
        background: `linear-gradient(169.22deg,#fdf7f7 12.19%,#efefef 92%)`,
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    logoContainer: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg,#fbf4f2,#eef1f5)',
      borderRadius: '10px',
      boxShadow: 'inset 1px 0 4px rgb(27 43 65 / 10%)',
      height: '70.71px',
      left: '83px',
      position: 'absolute',
      top: '69px',
      transform: 'rotate(45deg)',
      width: '70.71px',
      overflow: 'hidden'
    },
    text: {
      color: palette.primary.main,
      fontSize: '35px !important',
      fontWeight: 600,
      transform: 'rotate(-45deg)'
    },
    image: {
      transform: 'rotate(-45deg)',
      width: '141%',
      maxWidth: '141% !important',
      height: '141%;',
      flexShrink: 0,
      backgroundColor: 'white'
    },
    strip: {
      overflowX: 'hidden',
      paddingTop: '120px !important',
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': { display: 'none' },
    },
    stripItem: {
      cursor: 'pointer',
      width: 116,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px 0 8px 0',
      '&:hover': {
        backgroundColor: palette.primary.dark
      }
    },
    invertedBox: {
      backgroundColor: "#FFF",
      border: '2px solid #FFFFFF',
      boxShadow: 'inset 1px 0px 4px rgba(27, 43, 65, 0.1)',
      borderRadius: '10px',
      transform: 'rotate(45deg)',
      height: '35px',
      width: '35px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    create: {
      fontWeight: '600 !important',
      fontSize: '16px !important',
      lineHeight: '18px !important',
      textAlign: 'center',
      letterSpacing: '-0.011em !important',
      color: `${'#FFF'} !important`,
      transform: `rotate(-45deg)`,
    },
    initials: {
        fontWeight: '600 !important',
        fontSize: '16px !important',
        lineHeight: 25,
        textAlign: 'center',
        letterSpacing: '-0.011em !important',
        color: `${palette.primary.main} !important`,
        transform: `rotate(-45deg)`,
        textTransform: 'uppercase'
    },
    daoText: {
      fontFamily: `'Inter', sans-serif`,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '14px',
      textAlign: 'center',
      color: '#FFFFFF',
      opacity: 0.9,
      padding: '16px',
      whiteSpace: 'initial'
      },
      title: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: '700 !important',
        fontSize: '20px !important',
        lineHeight: '33px !important',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        color: `${palette.primary.dark} !important`,
    },
    description: {
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "14px",
        maxWidth: 200,
        lineHeight: "18px",
        letterSpacing: "-0.011em",
        color: "rgba(118, 128, 141, 0.5) !important"
    },
    subtitle: {
        fontSize: '14px !important',
        fontWeight: "400 !important",
        lineHeight: '19px !important',
        color: "#1b2b41 !important"
    },
  }));

export default ({ children }: any) => {
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { contractId } = useParams()
  const { account } = useWeb3Auth()

  const [open, setOpen] = React.useState(false);
  // @ts-ignore
  const { token, user } = useAppSelector(store => store.session)
  const { DAO, DAOList, resetDAO } = useDAO()

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  const daoInitials =(dao: any) => {
    if(dao) {
      const daoName = _get(dao, 'name', '').trim().split(" ");
      return daoName.length === 1
      ? daoName[0].charAt(0)
      : daoName[0].charAt(0) + daoName[daoName.length - 1].charAt(0)
    }
    return ''
  }


  return (
      <Box className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            style={{ background: 'transparent', height: '100%', paddingLeft: 0, paddingRight: 0 }}
          >
            <HeaderLogo dao={DAO} onMouseLeave={hideDrawer} onMouseEnter={showDrawer} />
            <Box sx={{ mt: 0 }} style={{ padding: 0, height: '100%', flex: 1 }}>
                <Box display="flex" minHeight={107} sx={{ pb: 2, background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(251,244,242,1) 0%)", pt: 3, pr: 4 }} flexDirection="row" alignItems="flex-start">
                    <Box sx={{ flexGrow: 1, ml: 4 }}>
                        <Typography sx={{ marginLeft: "20px" }} className={classes.title}>{_get(DAO, 'name', '')}</Typography>
                        <Typography sx={{ marginLeft: "20px", maxWidth: 800 }} className={classes.subtitle}>{_get(DAO, 'description', '')}</Typography>
                    </Box>
                    <Account/>
                </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box style={{ width: drawerWidth, background: 'transparent' }} ></Box>
        <Drawer onMouseLeave={hideDrawer} onMouseEnter={showDrawer} variant="permanent" open={open}>
          <List className={classes.strip}>
          {
              DAOList && DAOList.map((dao: any) => {
                const daoName = _get(dao, 'name', '') ? _get(dao, 'name', '').split(" ") : '';
				const daoImage = _get(dao, 'image', '');
                return (
                <Box onClick={() => { 
                        resetDAO(); 
                        setTimeout(() => navigate(`/${dao?.url}`), 100)
                    }} className={classes.stripItem}>
                    <Box className={classes.invertedBox}>
                    { daoImage ? <img className={classes.image} src={daoImage} /> :
                      <Typography variant='h6' className={classes.initials}>{daoInitials(dao)}</Typography>
                      }
                    </Box>
                        <Typography className={classes.daoText}>{_get(dao, 'name', '')}</Typography>
                    </Box> )
              })
            }
            <Box onClick={() => navigate('/sbt')}  className={classes.stripItem}>
                <Box className={classes.invertedBox} sx={{ backgroundColor: 'transparent' }}>
                  <Typography variant='h6' className={classes.create}>+</Typography>
                </Box>
                <Typography className={classes.daoText}>CREATE</Typography>
              </Box> 
          </List>
        </Drawer>
        <Box
          component="main"
          className={classes.main}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mb: 4, mt: '107px' }}>
            { children }
          </Container>
        </Box>
      </Box>
  );
}