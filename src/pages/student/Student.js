import {useState} from 'react'
import PropTypes from 'prop-types';
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import AllStudent from './allstudent/AllStudent';
import NewStudent from './newstudent/NewStudent';

import { useSelector } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
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
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Student = () => {
   
    const students=useSelector(state=>state.student.students);
    const [value, setValue] = useState(0);
    // console.log("students",students)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  return (
    <Box sx={{ width:'100%', bgcolor: 'background.paper', 
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
    }}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="New Student" {...a11yProps(0)} />
        <Tab label="All Student" {...a11yProps(1)}/>
      </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NewStudent students={students} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllStudent students={students} />
      </TabPanel>
    </Box> 
  )
}

export default Student;