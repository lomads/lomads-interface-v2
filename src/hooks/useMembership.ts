import _ from 'lodash';
import axiosHttp from '../api'
import { useDAO } from 'context/dao'
import { useAppSelector } from 'helpers/useAppSelector'

export default () => {

    const { DAO } = useDAO()
    const { user } = useAppSelector((store) => store.session)
    
    if (!_.isEmpty(DAO) && (Object.keys(DAO).filter((key) => key === 'members').length === 0 || DAO.members[0]['member'] !== user._id)) {

        let members = DAO.members ? DAO.members : []

        if (DAO.whitelisted) {
            if (members.filter((member: any) => member.member._id === user._id).length === 0) {
                window.location.href = `${process.env.REACT_APP_URL}/${DAO.url}/no-access`
            } else window.location.href = `${process.env.REACT_APP_URL}/${DAO.url}`

        } else {
            if (members.filter((member: any) => member.member._id === user._id).length === 0) { 
                axiosHttp
                    .patch(`/dao/${DAO.url}/membership/add-member`, { name: user.name, address: user.wallet })
            } else window.location.href = `${process.env.REACT_APP_URL}/${DAO.url}`
        }
    }
}