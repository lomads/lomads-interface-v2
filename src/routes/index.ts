// eslint-disable-next-line no-unused-vars
import LandingLayout from 'layouts/LandingLayout';
import LoginPage from 'pages/Login';
import DashboardPage from 'pages/Dashboard';
import createDaoOrg from "pages/CreateDaoOrg"
import AddExistingSafe from "pages/AddExistingSafe";
import AddNewSafe from "pages/AddNewSafe";
import DAOsuccess from "pages/DAOSuccess";
import DAONoAccess from "pages/DAONoAccess";
import Settings from "pages/Settings";

export default [
	{
		path: '/login',
		exact: true,
		layout: LandingLayout,
		private: false,
		component: LoginPage
	},
	{
		path: '/',
		exact: true,
		layout: LandingLayout,
		private: true,
		component: DashboardPage
	},
	{
        path: '/createorg',
        component: createDaoOrg
    },
    {
        path: '/addsafe',
        component: AddExistingSafe
    },
    {
        path: '/newsafe',
        component: AddNewSafe
    },
    {
        path: '/:daoURL/addsafe',
        component: AddExistingSafe
    },
    {
        path: '/:daoURL/newsafe',
        component: AddNewSafe
    },
    {
        path: '/success',
        component: DAOsuccess
    },
    {
        path: '/noaccess',
        component: DAONoAccess
    },
	{
        path: '/:daoURL/settings',
        component: Settings
    },
    {
        path: '/:daoURL/settings/:openState',
        component: Settings
    }
];
