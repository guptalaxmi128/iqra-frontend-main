import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import AddCourse from './NewCourse/AddCourse';
import LiveClasses from './LiveClasses/AddLiveClasses';
import UploadContent from './UploadContent/AddUploadContent';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Course = () => {
    const categories = useSelector((state) => state.category.categories);
    const subjects = useSelector((state) => state.subject.subjects);
    const mediums = useSelector((state) => state.medium.mediums);
    const levels = useSelector((state) => state.level.levels);
    const languages = useSelector((state) => state.language.languages);
    const courses = useSelector((state) => state.course.courses);
    // console.log(courses);
    // const courses = [
    //     {
    //         course: 'Maths',
    //     },
    //     {
    //         course: 'Science',
    //     },
    // ]

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderRadius: 2,
                borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                boxShadow: 'inherit',
                ':hover': {
                    boxShadow: 'inherit'
                },
                '& pre': {
                    m: 0,
                    p: '16px !important',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: '0.75rem'
                }
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="scrollable auto tabs example">
                    <Tab label="New Course" {...a11yProps(0)} />
                    <Tab label="Live Classes" {...a11yProps(1)} />
                    <Tab label="Upload Content" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AddCourse categories={categories} levels={levels} languages={languages} subjects={subjects} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LiveClasses courses={courses} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UploadContent courses={courses} subjects={subjects} />
            </TabPanel>
        </Box>
    );
};

export default Course;
