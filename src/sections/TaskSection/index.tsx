import React, { useState, useEffect, useMemo } from "react";
import { get as _get, find as _find, orderBy as _orderBy, uniqBy as _uniqBy } from 'lodash';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

import Button from "components/Button";
import IconButton from 'components/IconButton';
import AddIcon from '@mui/icons-material/Add';

import archiveIcon from 'assets/svg/archiveIcon.svg';
import expandIcon from 'assets/svg/expand.svg';
import CreateTaskModal from "modals/Tasks/CreateTaskModal";
import TaskCard from "components/TaskCard";
import { useDAO } from "context/dao";
import { useWeb3Auth } from "context/web3Auth";
import { useAppSelector } from "helpers/useAppSelector";
import { useAppDispatch } from "helpers/useAppDispatch";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import { getProjectAction } from "store/actions/project";
import useTasks from 'hooks/useTasks';
import useTerminology from "hooks/useTerminology";

const useStyles = makeStyles((theme: any) => ({
    addMemberBtn: {
        width: '125px',
        height: '40px',
        background: '#FFFFFF !important',
        boxShadow: '3px 5px 4px rgba(27, 43, 65, 0.05), - 3px - 3px 8px rgba(201, 75, 50, 0.1) !important',
        borderRadius: '5px !important',
        fontSize: '14px !important',
        color: '#C94B32 !important'
    },
    showAllCard: {
        width: '315px',
        height: '110px',
        display: 'flex !important',
        alignItems: 'center !important',
        background: 'linear-gradient(180deg, #fbf4f2, #eef1f5) !important',
        borderRadius: '5px !important',
        cursor: 'pointer !important',
        justifyContent: 'center !important',
        marginBottom: '15px !important',
        marginRight: '20px !important',
        position: 'relative'
    },
    iconContainer: {
        height: '40px',
        width: '50px',
        padding: '0 10px !important',
        background: '#B12F15 !important',
        boxShadow: '3px 5px 20px rgba(27, 43, 65, 0.12), 0px 0px 20px rgba(201, 75, 50, 0.18) !important',
        borderRadius: '20px !important',
        marginLeft: '10px !important'
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, style, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={style}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default ({ onlyProjects }: any) => {
    const classes = useStyles();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { DAO } = useDAO();
    const { account } = useWeb3Auth();
    //@ts-ignore
    const { user } = useAppSelector(store => store.session);
    const { transformTask } = useTerminology(_get(DAO, 'terminologies', null))
    // @ts-ignore
    const { Project } = useAppSelector(store => store.project);
    const { parsedTasks } = useTasks(onlyProjects ? _get(Project, 'tasks', []) : _get(DAO, 'tasks', []))
    const [value, setValue] = useState<number>(0);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);

    useEffect(() => {
        if (projectId && (!Project || (Project && Project._id !== projectId)))
            dispatch(getProjectAction(projectId));
    }, [projectId]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (initialLoad) {
            let activeTab: number = 0;
            if (parsedTasks) {
                if ((parsedTasks?.myTask || []).length == 0) {
                    activeTab = 1
                    if ((parsedTasks?.manage || []).length == 0)
                        activeTab = 3
                }
            }
            setValue(activeTab)
            setInitialLoad(false)
        }
    }, [parsedTasks, initialLoad]);

    const applicationCount = useMemo(() => {
        let sum = 0;
        if (parsedTasks['manage'].length > 0) {
            for (let index = 0; index < parsedTasks['manage'].length; index++) {
                const task = parsedTasks['manage'][index];
                if (task.taskStatus === 'open' && task.isSingleContributor) {
                    let applications = _get(task, 'members', []).filter((m: any) => (m.status !== 'rejected' && m.status !== 'submission_accepted' && m.status !== 'submission_rejected'))
                    if (applications)
                        sum = sum + applications.length
                }
            }
            return sum
        }
        return 0;
    }, [parsedTasks['manage']]);

    const submissionCount = useMemo(() => {
        let sum = 0;
        if (parsedTasks['manage'].length > 0) {
            for (let index = 0; index < parsedTasks['manage'].length; index++) {
                const task = parsedTasks['manage'][index];
                if ((task.contributionType === 'open' && !task.isSingleContributor) || task.contributionType === 'assign') {
                    let submissions = _get(task, 'members', [])?.filter((m: any) => m.submission && (m.status !== 'submission_accepted' && m.status !== 'submission_rejected'))
                    if (submissions)
                        sum = sum + submissions.length
                }
            }
            return sum
        }
        return 0;
    }, [parsedTasks['manage']]);


    return (
        <Box sx={{ width: '100%', marginBottom: '20px' }} display="flex" flexDirection={"column"}>
            <CreateTaskModal
                open={openCreateTask}
                closeModal={() => setOpenCreateTask(false)}
                selectedProject={onlyProjects ? Project : null}
            />
            <Box sx={{ width: '100%', background: '#FFF', height: '75px', padding: '0px 22px', borderRadius: '5px' }} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                        hidden: true
                    }}
                    sx={{
                        '& button': { color: 'rgba(118, 128, 141,0.5)', marginRight: '10px', textTransform: 'capitalize', fontSize: '22px', fontWeight: '400' },
                        '& button.Mui-selected': { color: 'rgba(118, 128, 141,1)' },
                    }}
                >
                    <Tab label={`My ${ transformTask().labelPlural}`} {...a11yProps(0)} />
                    <Tab
                        label="Manage"
                        {...a11yProps(1)}
                        iconPosition="end"
                        icon={
                            (applicationCount + submissionCount) > 0
                                ?
                                <Box
                                    sx={value === 1 ? { opacity: '1' } : { opacity: '0.5' }}
                                    className={classes.iconContainer}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <Typography sx={{ fontSize: 14, color: '#FFF' }}>{(applicationCount + submissionCount)}</Typography>
                                </Box>
                                :
                                <></>
                        }
                    />
                    <Tab
                        label="Drafts"
                        {...a11yProps(2)}
                        iconPosition="end"
                        icon={
                            parsedTasks['drafts'].length > 0
                                ?
                                <Box
                                    sx={value === 2 ? { opacity: '1' } : { opacity: '0.5' }}
                                    className={classes.iconContainer}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <Typography sx={{ fontSize: 14, color: '#FFF' }}>{parsedTasks['drafts'].length}</Typography>
                                </Box>
                                :
                                <></>
                        }
                    />
                    <Tab label={`All ${transformTask().labelPlural}`} {...a11yProps(3)} />
                </Tabs>

                <Box display={"flex"} alignItems={"center"}>
                    <IconButton onClick={() => navigate(`/${DAO.url}/tasks`, { state: { active: value } })} sx={{ marginRight: '20px' }}>
                        <img src={expandIcon} alt="archive-icon" />
                    </IconButton>
                    {/* <IconButton sx={{ marginRight: '20px' }}>
                        <img src={archiveIcon} alt="archiveIcon" />
                    </IconButton> */}
                    <Button size="small" variant="contained" color="secondary" className={classes.addMemberBtn} onClick={() => setOpenCreateTask(true)}>
                        <AddIcon sx={{ fontSize: 18 }} /> CREATE
                    </Button>
                </Box>
            </Box>

            {/* Tab panel for my tasks */}
            <TabPanel value={value} index={0} style={{ marginTop: '0.2rem' }}>
                <Box sx={{ width: '100%', background: '#FFF', padding: '26px 22px 7px 22px', borderRadius: '5px', maxHeight: '275px', overflow: 'hidden' }} display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
                    {
                        parsedTasks['myTask'] && parsedTasks['myTask'].filter((item, index) => index < 6).map((item, index) => {
                            if (index <= 4) {
                                return (
                                    <Box key={index}>
                                        <TaskCard
                                            task={item}
                                            daoUrl={DAO?.url}
                                        />
                                    </Box>
                                )
                            }
                            else {
                                return (
                                    <Box
                                        key={index}
                                        className={classes.showAllCard}
                                        onClick={() => { navigate(`/${DAO.url}/tasks`, { state: { active: value } }) }}
                                    >
                                        <Typography sx={{ color: '#b12f15' }}>SHOW ALL</Typography>
                                    </Box>
                                )
                            }
                        })
                    }
                </Box>
            </TabPanel>

            {/* Tab panel for manage tasks */}
            <TabPanel value={value} index={1} style={{ marginTop: '0.2rem' }}>
                <Box sx={{ width: '100%', background: '#FFF', padding: '26px 22px 7px 22px', borderRadius: '5px', maxHeight: '275px', overflow: 'hidden' }} display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
                    {
                        parsedTasks['manage'] && parsedTasks['manage'].filter((item, index) => index < 6).map((item, index) => {
                            if (index <= 4) {
                                return (
                                    <Box key={index}>
                                        <TaskCard
                                            task={item}
                                            daoUrl={DAO?.url}
                                        />
                                    </Box>
                                )
                            }
                            else {
                                return (
                                    <Box
                                        key={index}
                                        className={classes.showAllCard}
                                        onClick={() => { navigate(`/${DAO.url}/tasks`, { state: { active: value } }) }}
                                    >
                                        <Typography sx={{ color: '#b12f15' }}>SHOW ALL</Typography>
                                    </Box>
                                )
                            }
                        })
                    }
                </Box>
            </TabPanel>

            {/* Tab panel for drafts tasks */}
            <TabPanel value={value} index={2} style={{ marginTop: '0.2rem' }}>
                <Box sx={{ width: '100%', background: '#FFF', padding: '26px 22px 7px 22px', borderRadius: '5px', maxHeight: '275px', overflow: 'hidden' }} display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
                    {
                        parsedTasks['drafts'] && parsedTasks['drafts'].filter((item, index) => index < 6).map((item, index) => {
                            if (index <= 4) {
                                return (
                                    <Box key={index}>
                                        <TaskCard
                                            task={item}
                                            daoUrl={DAO?.url}
                                        />
                                    </Box>
                                )
                            }
                            else {
                                return (
                                    <Box
                                        key={index}
                                        className={classes.showAllCard}
                                        onClick={() => { navigate(`/${DAO.url}/tasks`, { state: { active: value } }) }}
                                    >
                                        <Typography sx={{ color: '#b12f15' }}>SHOW ALL</Typography>
                                    </Box>
                                )
                            }
                        })
                    }
                </Box>
            </TabPanel>

            {/* Tab panel for all tasks */}
            <TabPanel value={value} index={3} style={{ marginTop: '0.2rem' }}>
                <Box sx={{ width: '100%', background: '#FFF', padding: '26px 22px 7px 22px', borderRadius: '5px', maxHeight: '275px', overflow: 'hidden' }} display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
                    {
                        parsedTasks['allTasks'] && parsedTasks['allTasks'].filter((item, index) => index < 6).map((item, index) => {
                            if (index <= 4) {
                                return (
                                    <Box key={index}>
                                        <TaskCard
                                            task={item}
                                            daoUrl={DAO?.url}
                                        />
                                    </Box>
                                )
                            }
                            else {
                                return (
                                    <Box
                                        key={index}
                                        className={classes.showAllCard}
                                        onClick={() => { navigate(`/${DAO.url}/tasks`, { state: { active: value } }) }}
                                    >
                                        <Typography sx={{ color: '#b12f15' }}>SHOW ALL</Typography>
                                    </Box>
                                )
                            }
                        })
                    }
                </Box>
            </TabPanel>
        </Box>
    )
}