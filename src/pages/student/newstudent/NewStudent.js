import React, { useState } from 'react';
// import { Box, TextField, Button } from '@mui/material';
// material-ui
import {
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Button,
    Stack
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from 'actions/student/student';

const NewStudent = (props) => {
    const { students } = props;
    const [studentsTable, setStudentsTable] = useState(students);
    console.log("studentTable",studentsTable)
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
    // const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (newValue) => {
        setValue(newValue);
    };

    const [image, setImage] = useState();

    const [student, setStudent] = useState({
        studentName: '',
        emailId:'',
        phone:'',
        medium:'',
        totalAttempt:'',
        optionalSubjects:'',

    });

    const handleChange = (event) => {
        setStudent({ ...student, [event.target.name]: event.target.value });
    };

    const handleTotalAttemptChange = (event) => {
        setStudent({ ...student, totalAttempt: event.target.value });
    };


    const handleOptionalSubjectsChange = (event) => {
        setStudent({ ...student, optionalSubjects: event.target.value });
    };
    // const handleChange = ({ currentTarget: input }) => {
    //     setNewStudent({
    //         ...newStudent,
    //         [input.name]: input.value
    //     });
    //     console.log(newStudent);
    // };

    const dispatch = useDispatch();

  

    const handleSubmit = () => {
        try {
            const formData = new FormData();
            formData.append('studentname', student.studentName);
            formData.append('emailid', student.emailId);
            formData.append('phone', student.phone);
            formData.append('medium',student.medium);
            formData.append('totalattempt',student.totalAttempt)
            formData.append('optionalsubjects', student.optionalSubjects);
            formData.append('date',value)
            formData.append('image', image);
            console.log(formData);
            dispatch(addStudent(formData));
            setStudentsTable([...studentsTable, formData]);
            setStudent({
                teacherName: '',
                emailId: '',
                phone: '',
                medium:'',
                totalAttempt:'',
                optionalSubjects: ''
            });
            setValue();
            setImage();
            alert('student submitted successfully');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="text"
                        name="studentname"
                        value={student.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="EmailId"
                        variant="outlined"
                        fullWidth
                        sx={{mt:{xs:2,sm:0}}}
                        type="email"
                        name="emailid"
                        value={student.emailId}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        sx={{ mr: { sm: 1 } }}
                        type="number"
                        name="phone"
                        value={student.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Medium"
                        variant="outlined"
                        fullWidth
                        sx={{mt:{xs:2,sm:0}}}
                        type="text"
                        name="medium"
                        value={student.medium}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                    <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                        <InputLabel id="demo-simple-select-label">Total Attempt</InputLabel>
                        <Select
                            variant="outlined"
                            name="totalattempt"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={student.totalattempt}
                            onChange={handleTotalAttemptChange}
                        >
                            <MenuItem selected>Select No</MenuItem>
                            <MenuItem value="1">0</MenuItem>
                            <MenuItem value="2">1</MenuItem>
                            <MenuItem value="3">2</MenuItem>
                            <MenuItem value="4">3</MenuItem>
                            <MenuItem value="5">4</MenuItem>
                            <MenuItem value="6">5</MenuItem>
                            <MenuItem value="7">6</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Optional Subjects</InputLabel>
                        <Select
                            fullWidth
                            sx={{mt:{xs:2,sm:0}}}
                            variant="outlined"
                            name="optionalsubjects"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={student.optionalsubjects}
                            onChange={handleOptionalSubjectsChange}
                        >
                            <MenuItem selected>Select Subject</MenuItem>
                            <MenuItem value="1">Hindi</MenuItem>
                            <MenuItem value="2">English</MenuItem>
                            <MenuItem value="3">Maths</MenuItem>
                            <MenuItem value="4">General Studies</MenuItem>
                           
                        </Select>
                    </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2  }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxWidth: '100%', width: '100%' }}>
                        <DesktopDatePicker
                            fullWidth
                            label="Calendar"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </Box>
                    <Box>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default NewStudent;
