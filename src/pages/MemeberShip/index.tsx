import React, { useState } from 'react'
import { get as _get } from 'lodash'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { LeapFrog } from '@uiball/loaders'
import { makeStyles } from '@mui/styles'
import { Container, Grid, Typography, Box } from '@mui/material'
import { useAppSelector } from 'helpers/useAppSelector'
import { useDAO } from 'context/dao'
import Switch2 from 'components/Switch/index.v2'
import IconButton from "components/IconButton"
import Button from 'components/Button'
import axiosHttp from '../../api'
import LINK_SVG from 'assets/svg/ico-link.svg'
import lomadsfulllogo from '../../assets/svg/lomadsfulllogo.svg'

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: '100vh',
    maxHeight: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden !important',
  },
  headerText: {
    fontFamily: 'Insignia',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 35,
    paddingTop: 159,
    paddingBottom: 35,
    textAlign: 'center',
    color: '#C94B32',
  },
  description: {
    textAlign: 'center', 
    fontSize: '1rem !important'
  },
  subHeaderText: {
    textAlign: 'center', 
    fontSize: '20px !important', 
    color: '#C94B32', 
    fontWeight: 'bold !important', 
    marginTop: '80px !important'
  },
  switchBox: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: '20px'
  },
  orgTextLink: {
    textAlign: 'center', 
    width: '100%', 
    fontSize: '0.8rem', 
    fontWeight: 'bold', 
    marginBottom: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  createName: {
    margin: '25px 0px 15px 0px',
  },
  lomadsLogoParent: {
    backgroundColor: '#FFF',
    height: '100vh',
    zIndex: 99999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default () => {

  const classes = useStyles()
  const navigate = useNavigate()

  const { daoURL } = useParams()
  const { DAO } = useDAO()
  
  const [whitelisted, setWhitelisted] = useState<boolean>(DAO?.whitelisted)
  
  //@ts-ignore
  const { user } = useAppSelector((store) => store.session)
  const [createDAOLoading, setCreateDAOLoading] = useState<boolean>(false)
  const [DAOListLoading, setDAOListLoading] = useState<boolean>(false)

  const handleWhitelisted = (value: boolean) => {
    setWhitelisted(!value)
    axiosHttp
        .patch(`dao/${DAO?.url}/membership/whitelisted`, {id: DAO._id, whitelisted: !value})
        .then((result) => {
            navigate(`/${DAO?.url}/welcome`)
        })
  }

  return (
    <Container>
      <Grid className={classes.root}>
        {DAOListLoading ? (
          <Box className={classes.lomadsLogoParent}>
            <img
              src={lomadsfulllogo}
              alt=''
            />
            <LeapFrog
              size={50}
              color='#C94B32'
            />
          </Box>
        ) : null}
        <Grid
          item
          sm={12}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box className={classes.headerText}>3/3 Membership Policy</Box>
          <Box>
            <Typography className={ classes.description }>
                At Lomads, we offer a tiered system of roles: admins, core contributors,<br />
                active contributors, and contributors. Each comes with unique permissions<br />
                and access. for more details, review the roles in Settings.<br />
            </Typography>

            <Typography className={ classes.subHeaderText }>
                CHOOSE YOUR MEMBER ONBOARDING METHOD
            </Typography>

            <Typography align='center' py={3}>
                Onboarding settings can be altered anytime via Settings {'>'} Membership <br />
                Management. 
            </Typography>

            <Box className={ classes.switchBox }>
            <Typography
              sx={{
                fontSize: '17px',
                color: whitelisted ? '' : '#c94b32',
                marginRight: '15px',
              }}
            >
              OPEN FOR ALL
            </Typography>
            <Switch2
              onChange={() => handleWhitelisted(whitelisted)}
              checked={whitelisted}
            />
            <Typography
              sx={{
                fontSize: '17px',
                color: whitelisted ? '#c94b32' : '',
                marginLeft: '15px',
              }}
            >
              WHITELISTED
            </Typography>
          </Box>
          {
            !whitelisted? (
                <Typography className={ classes.orgTextLink }>
                Use this link to welcome new members: 
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#c94b32', marginLeft: '10px' }}> 
                    { DAO?.name } 
                    <IconButton onClick={(e:any) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(`${window.location.origin}/${daoURL}`)
                                toast.success('Copied to clipboard')
                        }}>
                            <img src={LINK_SVG} style={{ width: '14px' }} />
                    </IconButton></Typography> <br />
            </Typography>
            ) : ''
          }
          
            <Typography sx={{ textAlign: 'center', fontSize: '0.7rem' }}>This invitation is also accessible from your dashboard.</Typography>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                New members are automatically assigned the 'Contributors' role.
            </Typography>
          </Box>
          <Box className={classes.createName} sx={{ marginTop: '60px' }}>
            <Button
              loading={createDAOLoading}
              variant='contained'
              size='medium'
              onClick={() => {
                navigate(`${process.env.REACT_APP_URL}/${_get(DAO, 'url', '')}`)
            }}
            >
              GO TO DASHBOARD
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
