import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import palette from 'theme/palette'
import { useDAO } from 'context/dao'
import Switch2 from 'components/Switch/index.v2'
import axiosHttp from '../../api'
import { toast } from 'react-hot-toast'

const useStyles = makeStyles((theme:any) => ({
    title: {
        color: palette.primary.main,
        fontSize: '30px!important',
        fontWeight: '400!important',
        margin: '32px 0!important'
    },
    subTitle: {
        padding: '0 16px',
        fontSize: '16px',
        textAlign: 'center',
        color: 'rgb(118, 128, 141)'
    },
    switchBox: {
        display: 'flex', 
        alignItems: 'center', 
        marginTop: '20px'
    }
}))

export default () => {

  const classes = useStyles()
  const { DAO } = useDAO()

  const [whitelisted, setWhitelisted] = useState<boolean>(DAO?.whitelisted)

  const handleWhitelisted = (value: boolean) => {
    setWhitelisted(!value)
    axiosHttp
      .patch(`dao/${DAO?.url}/membership/whitelisted`, {id: DAO._id, whitelisted: !value})
      .then((res) => {
        toast.success(res.data.message)
    })
  }

  return (
    <Box
          display='flex'
          flexDirection='column'
          my={6}
          alignItems='center'
        >
          <Typography className={ classes.title }>
            Membership Management
          </Typography>
          <Typography
            variant='subtitle2'
            className={ classes.subTitle }
          >
            {' '}
            <span style={{ fontWeight: '700' }}>Simplified Onboarding</span> <br />
            Select Open (no-hassle setup) or Whitelisted (added security) to
            match your organizational processes.
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
        </Box>
  )
}