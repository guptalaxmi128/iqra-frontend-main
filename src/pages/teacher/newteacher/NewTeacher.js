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
        teachername: '',
        emailid: '',
        phone: '',
        subjects: ''
    });

    const [image, setImage] = useState();

    const handleImageFile = (e) => {
      setImage(e.target.files[0], '$$$$');
      console.log(image);
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
            const formData = new FormData();
            formData.append('teachername', teacher.teachername);
            formData.append('emailid', teacher.emailid);
            formData.append('phone', teacher.phone);
            formData.append('subjects', subjects);
            formData.append('image', image);
            console.log(formData);
            dispatch(addTeacher(formData));
            setTeachersTable([...teachersTable, formData]);
            setTeacher({
                teachername: '',
                emailid: '',
                phone: '',
                subjects: ''
            });
            setImage();
            alert('teacher submitted successfully');
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
                    name="teachername"
                    value={teacher.teachername}
                    onChange={handleChange}
                />
                {/* <Box sx={{ width: '100%', ml: {sm:1} }} /> */}
                <TextField
                    label="EmailId"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="email"
                    name="emailid"
                    value={teacher.emailid}
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
                    value={teacher.phone}
                    onChange={handleChange}
                />
                  <Button
                        variant="outlined"
                        fullWidth
                        component="label"
                        style={{ height: '37px' }}
                        value={image}
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
