import { useState, useRef } from 'react';
import React from 'react';
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
import { Cancel } from '@mui/icons-material';
import JoditEditor from 'jodit-react';
// project import
import MainCard from 'components/MainCard';

import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from 'actions/course/course';
// ==============================|| SAMPLE PAGE ||============================== //
const copyStringToClipboard = function (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const facilityMergeFields = [
    'FacilityNumber',
    'FacilityName',
    'Address',
    'MapCategory',
    'Latitude',
    'Longitude',
    'ReceivingPlant',
    'TrunkLine',
    'SiteElevation'
];
const inspectionMergeFields = ['InspectionCompleteDate', 'InspectionEventType'];
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
    let optionGroupElement = document.createElement('optgroup');
    optionGroupElement.setAttribute('label', optionGrouplabel);
    for (let index = 0; index < mergeFields.length; index++) {
        let optionElement = document.createElement('option');
        optionElement.setAttribute('class', 'merge-field-select-option');
        optionElement.setAttribute('value', mergeFields[index]);
        optionElement.text = mergeFields[index];
        optionGroupElement.appendChild(optionElement);
    }
    return optionGroupElement;
};
const buttons = [
    'undo',
    'redo',
    '|',
    'bold',
    'strikethrough',
    'underline',
    'italic',
    '|',
    'superscript',
    'subscript',
    '|',
    'align',
    '|',
    'ul',
    'ol',
    'outdent',
    'indent',
    '|',
    'font',
    'fontsize',
    'brush',
    'paragraph',
    '|',
    'image',
    'link',
    'table',
    '|',
    'hr',
    'eraser',
    'copyformat',
    '|',
    'fullsize',
    'selectall',
    'print',
    '|',
    'source',
    '|',
    {
        name: 'insertMergeField',
        tooltip: 'Insert Merge Field',
        iconURL: 'images/merge.png',
        popup: (editor, current, self, close) => {
            function onSelected(e) {
                let mergeField = e.target.value;
                if (mergeField) {
                    console.log(mergeField);
                    editor.selection.insertNode(editor.create.inside.fromHTML('{{' + mergeField + '}}'));
                }
            }
            let divElement = editor.create.div('merge-field-popup');

            let labelElement = document.createElement('label');
            labelElement.setAttribute('class', 'merge-field-label');
            labelElement.text = 'Merge field: ';
            divElement.appendChild(labelElement);

            let selectElement = document.createElement('select');
            selectElement.setAttribute('class', 'merge-field-select');
            selectElement.appendChild(createOptionGroupElement(facilityMergeFields, 'Facility'));
            selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, 'Inspection'));
            selectElement.onchange = onSelected;
            divElement.appendChild(selectElement);

            console.log(divElement);
            return divElement;
        }
    },
    {
        name: 'copyContent',
        tooltip: 'Copy HTML to Clipboard',
        iconURL: 'images/copy.png',
        exec: function (editor) {
            let html = editor.value;
            copyStringToClipboard(html);
        }
    }
];

const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: 'en',
    toolbarButtonSize: 'medium',
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true
    },
    width: '100%',
    height: 400
};

const Tags = ({ data, handleDelete }) => {
    return (
        <Box
            sx={{
                background: '#1890FF',
                borderRadius: '0.5rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                padding: '0.4rem',
                margin: '0 0.5rem 0 0',
                justifyContent: 'center',
                alignContent: 'center',
                color: '#ffffff'
            }}
        >
            <Stack direction="row" gap={1}>
                <Typography>{data}</Typography>
                <Cancel
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        handleDelete(data);
                    }}
                />
            </Stack>
        </Box>
    );
};

const AddCourse = (props) => {
    const { categories, levels, languages } = props;
    // console.log("addcourse",props)

    const subjectArray = useSelector((state) => state.subject.subjects);

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

    const [course, setCourse] = useState({
        category: '',
        courseName: '',
        price: '',
        heading: '',
        description: '',
        lesson: '',
        level: '',
        duration: '',
        language: '',
        subjects: ''
    });

    const [image, setImage] = useState();

    const handleChange = (event) => {
        setCourse({ ...course, [event.target.name]: event.target.value });
    };

    const [subjects, setSubjects] = useState([]);
    const tagRef = useRef();

    const handleCategoryChange = (event) => {
        setCourse({ ...course, category: event.target.value });
    };

    const handleImageFile = (event) => {
        setImage(event.target.files[0]);
    };

    const handleLevelChange = (event) => {
        setCourse({ ...course, level: event.target.value });
    };

    const handleLanguageChange = (event) => {
        setCourse({ ...course, language: event.target.value });
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
            console.log(course)
            const formData = new FormData();
            formData.append('category', course.category);
            formData.append('courseName', course.courseName);
            formData.append('price', course.price);
            formData.append('heading', course.heading);
            formData.append('description', course.description);
            formData.append('lesson', course.lesson);
            formData.append('level', course.level);
            formData.append('duration', course.duration);
            formData.append('language', course.language);
            formData.append('subjects', subjects);
            formData.append('image', image);
            console.log(formData);
            dispatch(addCourse(formData));
            setCourse({
                category: '',
                courseName: '',
                price: '',
                heading: '',
                description: '',
                lesson: '',
                level: '',
                duration: '',
                language: '',
                subjects: ''
            });
            setImage();
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(image)

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2 }}>
                <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course.category}
                        label="Topic"
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <MenuItem value={category.category}>{category.category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Course Name"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="courseName"
                    value={course.courseName}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Course Price"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                />
                <Box sx={{ width: '100%', ml: { xs: 0, sm: 1 }, mt: { xs: 2, sm: 0 } }}>
                    <Button
                        variant="outlined"
                        fullWidth
                        component="label"
                        style={{ height: '37px' }}
                        value={image}
                        onChange={(e) => handleImageFile(e)}
                    >
                        Course Image
                        <input hidden accept="image/*" type="file" />
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Heading"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { xs: 0, sm: 1 } }}
                    type="text"
                    name="heading"
                    value={course.heading}
                    onChange={handleChange}
                />
                <Box sx={{ width: '100%', ml: { xs: 0, sm: 1 } }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Lesson"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { xs: 0, sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="lesson"
                    value={course.lesson}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                    <InputLabel id="demo-simple-select-label">Level</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course.level}
                        label="Topic"
                        onChange={handleLevelChange}
                    >
                        {levels.map((level) => (
                            <MenuItem value={level.level}>{level.level}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Duration"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course.language}
                        label="Language"
                        onChange={handleLanguageChange}
                    >
                        {languages.map((language) => (
                            <MenuItem value={language.language}>{language.language}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
            </Box>
            <Box>
                <Button variant="contained" color="primary" type="submit" onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default AddCourse;
