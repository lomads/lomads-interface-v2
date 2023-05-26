import { Box, Typography } from "@mui/material"
import IconButton from "components/IconButton"
import CloseSVG from 'assets/svg/close-new.svg'
import TextInput from "components/TextInput";
import ReactS3Uploader from 'components/ReactS3Uploader';
import { LeapFrog } from "@uiball/loaders";
import React, { useState } from "react"
import { makeStyles } from '@mui/styles';
import Button from "components/Button"
import { useDAO } from "context/dao"
import { useNavigate } from "react-router-dom"
import orangeUploadIcon from "assets/svg/orangeUploadIcon.svg"

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

const OrganisationModal = ({ onClose }: { onClose: any }) => {
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
             <Box sx={{ padding: "0 50px 100px 50px"}}>
 						<TextInput placeholder="Fashion Fusion" sx={{ my: 2 }} fullWidth label="Name" />
						<TextInput disabled sx={{ my: 2 }} fullWidth label="Organisation’s URL" />
						<Box className={classes.textTypeOd}>Import thumbnail</Box>
						<Box className={classes.imagePickerWrapper}>
							<Box className={classes.imagePickerContainer}>
								{
									''
										?
										<Box style={{ position: 'relative', width: '100%', height: '100%' }}>
											<Box onClick={() => {}} style={{ cursor: 'pointer' }}>
												<img style={{ width: 18, height: 18, position: 'absolute', right: 8, top: 8, opacity: 0.7 }} src={require('../assets/images/close.png')} />
											</Box>
											<img src={''} alt="selected-token-icon" className="selected-img" />
										</Box>
										:
										<Box>
											<ReactS3Uploader />
											<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
												{false ?
													<LeapFrog size={24} color="#C94B32" /> :
													<>
														<img src={orangeUploadIcon} alt="upload-icon" className={classes.uploadIcon} />
														<Typography sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
															<span className={classes.chooseText}>Choose or </span>
															<span className={classes.chooseText}> drag an image</span>
															<span className={classes.maxText}>maximum size 2mb</span>
														</Typography>
													</>
												}
											</Box>

											<input />
										</Box>

								}
							</Box>
							<p className={classes.text}>Accepted formats:<br />jpg, svg or png</p>
						</Box>

						<hr
							style={{
								height: 2,
								width: 208,
								background: "#C94B32",
								margin: "36px auto 35px",
							}}
						/>
						<Box className={classes.textType}>Links</Box>

						<Box
							style={{
								display: "flex",
								flexDirection: "row",
								marginTop: 9,
								alignItems: 'center',
								justifyContent: "space-between",
							}}
						>
							<Box>
								<TextInput
									placeholder="Ex Portfolio"
									fullWidth
									sx={{ mr: 1 }}
									onChange={(evt: any) => {}}
								/>
							</Box>
							<Box>
								<TextInput
									placeholder="link"
									fullWidth
									sx={{ mr: 1 }}
									onChange={(evt: any) => {}}
								/>
							</Box>
						</Box>
						<Box className={classes.errorMsg} id="error-msg"></Box>
					</Box>
					<Box style={{ background: 'linear-gradient(0deg, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)', width: '567px', position: 'fixed', bottom: 0, borderRadius: '0px 0px 0px 20px', padding: "30px 0 20px" }}>
						<Box display="flex" mt={4} width={380} style={{ margin: '0 auto' }} flexDirection="row">
							<Button sx={{ mr: 1 }} fullWidth variant='outlined' size="small">Cancel</Button>
							<Button sx={{ ml: 1 }} fullWidth variant='contained' size="small">Save</Button>
						</Box>
					</Box>
        </Box>
    )
}

export default OrganisationModal;