import React , {useState} from 'react';

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


import { useDispatch, useSelector } from 'react-redux';
import { addTeacher } from 'actions/teacher/teacher'


const NewTeacher = (props) => {
    const { teachers } = props;
    const [teachersTable, setTeachersTable] = useState(teachers);
  

    const subjectArray = (useSelector((state) => state.subject.subjects));
    console.log(subjectArray);

    const [subjects, setSubjects] = useState([]);


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };




    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        contactNumber: '',
        subjects: '',
        password:'',
        confirmPassword:'',
    });

    const [teacherImage, setTeacherImage] = useState();

    const handleImageFile = (e) => {
      setTeacherImage(e.target.files[0], '$$$$');
      console.log(teacherImage);
    };


    const handleChange = (event) => {
        setTeacher({ ...teacher, [event.target.name]: event.target.value });
    };

    const handleSubjectsChange = (event) => {
        const {
            target: { value }
        } = event;
        setSubjects(typeof value === 'string' ? value.split(',') : value);
        console.log(subjects);
    };

    const dispatch = useDispatch();

  


    const handleSubmit = () => {
        try {
            console.log(teacher)
            const formData = new FormData();
            formData.append('name', teacher.name);
            formData.append('email', teacher.email);
            formData.append('contactNumber', teacher.contactNumber);
            formData.append('password',teacher.password);
            formData.append('confirmPassword',teacher.confirmPassword)
            formData.append('subjects', subjects);
            formData.append('image',  teacherImage);
            console.log(formData);
            dispatch(addTeacher(formData));
            setTeachersTable([...teachersTable, formData]);
            setTeacher({
                name: '',
                email: '',
                contactNumber: '',
                subjects: '',
                password:'',
                confirmPassword:'',
            });
            setTeacherImage();
            alert('teacher submitted successfully');
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(image);
    // console.log(teachersTable)
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
                    name="name"
                    value={teacher.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="email"
                    name="email"
                    value={teacher.email}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="password"
                    name="password"
                    value={teacher.password}
                    onChange={handleChange}
                />
 
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="password"
                    name="confirmPassword"
                    value={teacher.confirmPassword}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="number"
                    name="contactNumber"
                    value={teacher.contactNumber}
                    onChange={handleChange}
                />
                  <Button
                        variant="outlined"
                        fullWidth
                        component="label"
                        style={{ height: '37px' }}
                        value={teacherImage}
                        onChange={(e) => handleImageFile(e)}
                    >
                        Upload Image
                        <input hidden accept="image/*" type="file" />
                    </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }} ml={-1}>
            <FormControl
                    fullWidth
                    sx={{
                        ml: { sm: 1 },
                        mt: {
                            xs: 2,
                            sm: 0
                        }
                    }}
                >
                    <InputLabel id="demo-multiple-checkbox-label">Subjects</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={subjects}
                        onChange={handleSubjectsChange}
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {subjectArray.map((subject) => (
                            <MenuItem key={subject.id} value={subject.subject}>
                                <Checkbox checked={subjects.indexOf(subject.subject) > -1} />
                                <ListItemText primary={subject.subject} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ width: '100%', ml: {sm:1} }} />
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

export default NewTeacher;
