import { TableCell, Box, Typography } from "@mui/material";
import { find as _find } from 'lodash'
import { CHAIN_INFO } from "constants/chainInfo";
import LomadsAvatar from "components/Avatar"
import { makeStyles } from '@mui/styles';
import { useDAO } from "context/dao";
import useSafe from "hooks/useSafe";
import React, { useMemo } from "react";
import { beautifyHexToken } from "utils";

import SafeSentSvg from 'assets/svg/safe_sent.svg'
import SafeReceivedSvg from 'assets/svg/safe_received.svg'
import SafeMethodSvg from 'assets/svg/safe_method.svg'

const useStyles = makeStyles((theme: any) => ({
    root: {

    },
    ChainLogo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EEE',
		borderRadius: '50%',
		width: 32,
		height: 32
	},
  }));


export default ({ safeAddress, recipient, credit }: any) => {
    const classes = useStyles();
    const { DAO } = useDAO()
    const { loadSafe } = useSafe();
    
    const safe = useMemo(() => {
        if(DAO)
            return loadSafe(safeAddress)
        return null
    }, [safeAddress, DAO])

    const member = useMemo(() => {
        if(DAO)
            return _find(DAO?.members, (m:any) => m?.member?.wallet === recipient)?.member
        return null
    }, [safeAddress, DAO, recipient])

    return (
        <TableCell>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Box className={classes.ChainLogo}>
                        <img width={18} height={18} src={CHAIN_INFO[safe?.chainId]?.logoUrl} alt="seek-logo" />
                    </Box>
                    {/* <Avatar sx={{ width: 32, height: 32 }} src={CHAIN_INFO[safe?.chainId]?.logoUrl} /> */}
                    <Box sx={{ ml: 1 }}>
                        { safe?.name && <Typography style={{ color:"#1B2B41", fontWeight: 700, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{ safe?.name }</Typography> }
                        <Typography style={{ color:"#1B2B41", fontWeight: 400, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{ beautifyHexToken(safe?.address) }</Typography>
                    </Box>
                </Box>
                <Box sx={{ mx: 1 }}>
                    <img style={{ width: 20, height: 20 }} src={recipient === '0x' ? SafeMethodSvg : credit ? SafeReceivedSvg : SafeSentSvg} />
                </Box>
                { recipient !== '0x' ?
                    <Box key={`${safe?.address}-${recipient}`}>
                        <LomadsAvatar key={`${safe?.address}-${recipient}`} name={member ? member.name : ''} wallet={recipient}/>
                    </Box> : 
                    <Box display="flex" flexDirection="row" alignItems="center">
                    <Box className={classes.ChainLogo}>
                        <img width={18} height={18} src={CHAIN_INFO[safe?.chainId]?.logoUrl} alt="seek-logo" />
                    </Box>
                    {/* <Avatar sx={{ width: 32, height: 32 }} src={CHAIN_INFO[safe?.chainId]?.logoUrl} /> */}
                    <Box sx={{ ml: 1 }}>
                        { safe?.name && <Typography style={{ color:"#1B2B41", fontWeight: 700, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{ safe?.name }</Typography> }
                        <Typography style={{ color:"#1B2B41", fontWeight: 400, fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{ beautifyHexToken(safe?.address) }</Typography>
                    </Box>
                </Box>
                }
            </Box>
        </TableCell>
    )
}