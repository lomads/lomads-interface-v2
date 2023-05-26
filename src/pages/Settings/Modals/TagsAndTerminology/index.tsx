import { Box } from "@mui/material"
import IconButton from "components/IconButton"
import CloseSVG from 'assets/svg/close-new.svg'
import React from "react"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
	textType: {
		fontFamily: 'Inter, sans-serif',
		fontWeight: '700',
		fontSize: '16px',
		lineHeight: '18px',
		letterSpacing: '-0.011em',
		color: '#76808D',
		marginBottom: '10px',
	},
  }));

const TagsAndTerminologyModal = ({ onClose }: { onClose: any }) => {
    const classes = useStyles();

    return (
        <Box style={{ position: 'relative' }}>
            <IconButton sx={{ position: 'fixed', right: 32, top: 32 }} onClick={onClose}>
                <img src={CloseSVG} />
            </IconButton>
        </Box>
    )
}

export default TagsAndTerminologyModal;