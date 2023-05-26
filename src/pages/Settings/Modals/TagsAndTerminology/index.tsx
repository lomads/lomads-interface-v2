import { Box } from "@mui/material"
import IconButton from "components/IconButton"
import CloseSVG from 'assets/svg/close-new.svg'
import React, { useState } from "react"
import { makeStyles } from '@mui/styles';
import { useDAO } from "context/dao"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme: any) => ({
    textTypeOd: {
		fontFamily: 'Inter, sans-serif',
		fontWeight: '700',
		fontSize: '16px',
		lineHeight: '18px',
		letterSpacing: '-0.011em',
		color: '#76808D',
		marginBottom: '10px',
	},
	textType: {
		fontFamily: 'Inter, sans-serif',
		fontWeight: '700',
		fontSize: '16px',
		lineHeight: '18px',
		letterSpacing: '-0.011em',
		color: '#76808D',
		marginBottom: '10px',
	},
	imagePickerWrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center'
	},
	imagePickerWrapperText: {
		fontStyle: 'normal',
		fontWeight: 400,
		fontSize: 6,
		lineHeight: 6,
		color: 'gba(118, 128, 141, 0.5)',
		marginLeft: '3px',
	},
	imagePickerContainer: {
		width: '200px',
		height: '200px',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#F5F5F5',
		boxShadow: 'inset 1px 0px 4px rgba(27, 43, 65, 0.1)',
		margin: '1rem 0',
		cursor: 'pointer',
		position: 'relative'
	},
	errorMsg: {
		marginBottom: '',
		fontSize: '3px',
		color: '#C94B32',
	},
	deleteButton: {
		backgroundColor: '#76808D',
		padding: '5px',
		borderRadius: '5px',
		color: '#FFFFFF',
		cursor: 'pointer'
	},
	maxText: {
		color: '#1B2D41',
		opacity: 0.2,
		letterSpacing: '-0.011em',
		fontFamily: 'Inter, sans-serif',
		fontWeight: 400,
		fontSize: 14,
	},
	chooseText: {
		color: "#C94B32",
		alignSelf: 'center',
		letterSpacing: '-0.011em',
		fontFamily: 'Inter, sans-serif',
		fontWeight: 400,
		fontSize: 16
	},
	text: {
		fontFamily: 'Inter, sans-serif',
		fontStyle: 'normal',
		fontWeight: 400,
		fontSize: 14,
		letterSpacing: '-0.011em',
		color: '#76808d',
		opacity: 0.5,
		marginLeft: 13,
	},
	uploadIcon: {
		margin: 10
	},
	addButton: {
		padding: '0px 10px 0px 10px',
		borderRadius: '5px',
		borderWidth: '0px',
		borderColor: '#FFFFFF',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#FFFFFF'
	}
  }));

const TagsAndTerminologyModal = ({ onClose }: { onClose: any }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { DAO } = useDAO();
    const [active, setActive] = useState<any>(null)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <Box style={{ position: 'relative' }}>
            <IconButton sx={{ position: 'fixed', right: 32, top: 32 }} onClick={onClose}>
                <img src={CloseSVG} />
            </IconButton>
        </Box>
    )
}

export default TagsAndTerminologyModal;