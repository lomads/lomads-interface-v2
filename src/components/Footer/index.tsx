import React from "react";
//import '../../styles/Footer.css';
import { Box } from '@mui/material';
import logo from '../../assets/svg/lomadsGray.svg';
import polygonGray from '../../assets/svg/polygonGray.svg';
import safeGray from '../../assets/svg/safeGray.svg';
import ipfsGray from '../../assets/svg/ipfsGray.svg';

import logoWhite from '../../assets/svg/lomadsWhite.svg';
import polygonWhite from '../../assets/svg/polygonWhite.svg';
import safeWhite from '../../assets/svg/safeWhite.svg';
import ipfsWhite from '../../assets/svg/ipfsWhite.svg';

const useStyles = makeStyles((theme: any) => ({
	DAOsuccess: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '100vh',
		textAlign: 'center'
	},
	itemsGroup: {
		marginTop: '2%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
	congrats: {
		fontFamily: 'Inter, sans-serif',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: '22px',
		lineHeight: '25px',
		textAlign: 'center',
		letterSpacing: '-0.011em',
		color: '#76808D',
		margin: '133px 0px 13.5px 0px'
	},
	header: {
		fontFamily: 'Insignia',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: '35px',
		lineHeight: '35px',
		paddingBottom: '13px',
		textAlign: 'center',
		color: '#C94B32'
	},
	redirectText: {
		fontFamily: 'Inter, sans-serif',
		fontStyle: 'italic',
		fontWeight: '400',
		fontSize: '16px',
		lineHeight: '25px',
		textAlign: 'center',
		letterSpacing: '-0.011em',
		color: '#76808D',
		textDecoration: 'underline',
		cursor: 'pointer'
	},
	colors: {
		height: '1vw',
		width: '2.5vw',
		backgroundColor: 'aqua',
		borderRadius: '30px',
		position: 'absolute',
		top: '0',
		right: '0'
	},
	groupenjoy: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		right: '0px',
		margin: 'auto',
		width: '300px',
	}
}));

const Footer = ({ theme }: any ) => {
    const classes = useStyles()

    return (
        <Box className='footer'>
            <Box className="left-section">
                <p style={theme === 'light' ? { color: '#FFF' } : { color: '#76808D' }}>Powered by</p>
                {
                    theme === 'light'
                        ?
                        <>
                            <img src={polygonWhite} alt="polygon-white" />
                            <img src={safeWhite} alt="polygon-white" />
                            <img src={ipfsWhite} alt="polygon-white" />
                        </>
                        :
                        <>
                            <img src={polygonGray} alt="polygon-gray" />
                            <img src={safeGray} alt="polygon-gray" />
                            <img src={ipfsGray} alt="polygon-gray" />
                        </>
                }
            </Box>
            <Box className="right-section">
                <p style={theme === 'light' ? { color: '#FFF' } : { color: '#76808D' }}>made with <span style={{ color: 'red' }}>❤️</span> by</p>
                {
                    theme === 'light'
                        ?
                        <img src={logoWhite} alt="lomads-logo-white" />
                        :
                        <img src={logo} alt="lomads-logo-dark" />
                }
            </Box>
        </Box>
    )
}

export default Footer;