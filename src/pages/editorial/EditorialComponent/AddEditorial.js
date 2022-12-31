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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useDispatch, useSelector } from 'react-redux';
import { addEditorial } from '../../../actions/editorial/editorial';

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

const AddEditorial = (props) => {
    const { editorials } = props;
    const [editorialsTable, setEditorialsTable] = useState(editorials);

    const topicsArray = useSelector((state) => state.subject.subjects) || [];
    const importantIssues = useSelector((state) => state.importantIssue.importantIssues) || [];
      console.log("important",importantIssues)
      console.log('addeditorial',editorialsTable)


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

    const tagsArray = [
        'History',
        'Political Science',
        'Geography',
        'Economics',
        'Mathematics',
        'Public Administration',
        'Ethics',
        'Chemistry',
        'Sociology'
    ];

    // const topicsArray = [
    //     'History',
    //     'Political Science',
    //     'Geography',
    //     'Economics',
    //     'Mathematics',
    //     'Public Administration',
    //     'Ethics',
    //     'Chemistry',
    //     'Sociology'
    // ];

    const [optionsData, setOptionsData] = useState({
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: ''
    });

   

    const [editorial, setEditorial] = useState({
        iICategory: '',
        timeStamp: null,
        heading: '',
        tags: '',
        prelims: '',
        mains: '',
        source: '',
        editor: '',
        questionHeading: '',
        question: '',
        options: '',
        answer: '',
        topic: ''
    });

    const handleChange = (event) => {
        setEditorial({ ...editorial, [event.target.name]: event.target.value });
    };

    const handleOptionChange = (event) => {
        setOptionsData({ ...optionsData, [event.target.name]: event.target.value });
    };

    const [tags, setTags] = useState([]);
    const [editor, setEditor] = useState();
    const tagRef = useRef();

    const handleTopicChange = (event) => {
        setEditorial({ ...editorial, topic: event.target.value });
    };

    const handleDelete = (value) => {
        const newtags = tags.filter((val) => val !== value);
        setTags(newtags);
    };

    const handleAddTags = (e) => {
        e.preventDefault();
        setTags([...tags, tagRef.current.value]);
        tagRef.current.value = '';

    };

    const handleImportantIssueChange = (event) => {
        setEditorial({ ...editorial, iICategory: event.target.value });
    };

    const dispatch = useDispatch();

    const handleSubmit = () => {
        try {
         
            const formData = new FormData();
            formData.append('iTCategory',editorial.iICategory)
            formData.append('timeStamp',editorial.timeStamp);
            formData.append('heading', editorial.heading);
            formData.append('rating', 0);
            formData.append('tags', tags);
            formData.append('prelims', editorial.prelims);
            formData.append('mains', editorial.mains);
            formData.append('dataFromEditor', editor);
            formData.append('questionHeading', editorial.questionHeading);
            formData.append('question', editorial.question);
            formData.append('options', optionsData);
            formData.append('answer', editorial.answer);
            formData.append('topic', editorial.topic);
            formData.append('source',editorial.source)
            console.log(formData);
            dispatch(addEditorial(formData));
            setEditorialsTable([...editorialsTable, formData]);
            setEditorial({
                iICategory: '',
                timeStamp: null,
                heading: '',
                tags: '',
                prelims: '',
                mains: '',
                editor: '',
                questionHeading: '',
                question: '',
                options: '',
                answer: '',
                topic: ''
            });
            setTags([]);
            setEditor('');
            setOptionsData({
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: ''
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mr: { sm: 1 } }}>
                    <InputLabel id="demo-simple-select-helper-label">Important Issue </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={editorial.iICategory}
                        label="Important Issue"
                        onChange={handleImportantIssueChange}
                    >
                        {importantIssues.map((iICategory) => (
                            <MenuItem value={iICategory.id}>{iICategory.iICategory}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ width: '100%', ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxWidth: '100%', width: '100%' }}>
                        <DatePicker
                            fullWidth
                            label="Date"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={editorial.timeStamp}
                            onChange={(newValue) => {
                                setEditorial({
                                    ...editorial,
                                    timeStamp: newValue
                                });
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Heading"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="heading"
                    value={editorial.heading}
                    onChange={handleChange}
                />
                <FormControl fullWidth sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}>
                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={editorial.topic}
                        label="Topic"
                        onChange={handleTopicChange}
                    >
                        {topicsArray.map((topic) => (
                            <MenuItem value={topic.subject}>{topic.subject}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Prelims"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 }, backgroundColor: 'primary.lighter', borderRadius: '5px' }}
                    type="text"
                    name="prelims"
                    value={editorial.prelims}
                    onChange={handleChange}
                />
                <TextField
                    label="Mains"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 }, backgroundColor: 'primary.lighter', borderRadius: '5px' }}
                    type="text"
                    name="mains"
                    value={editorial.mains}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
            <Box sx={{ width: '100%', mr: {sm:1} }}>
                    <form onSubmit={handleAddTags}>
                        <TextField
                            inputRef={tagRef}
                            label="Tags"
                            variant="outlined"
                            placeholder={tags.length < 5 ? 'Enter tags' : ''}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex', flexDirection: 'row' }}>
                                        {tags.map((data, index) => {
                                            return <Tags data={data} handleDelete={handleDelete} key={index} />;
                                        })}
                                    </Box>
                                )
                            }}
                        />
                    </form>
                </Box>
                <TextField
                    label="Source"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="source"
                    value={editorial.source}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <Box sx={{ maxWidth: editorConfig.width, width: '100%', m: 0 }}>
                    <JoditEditor value={editor} config={editorConfig} onChange={(newContent) => setEditor(newContent)} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Question Heading"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="questionHeading"
                    value={editorial.questionHeading}
                    onChange={handleChange}
                />
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="question"
                    value={editorial.question}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Option A"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="optionA"
                    value={optionsData.optionA}
                    onChange={handleOptionChange}
                />
                <TextField
                    label="Option B"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="optionB"
                    value={optionsData.optionB}
                    onChange={handleOptionChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Option C"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="optionC"
                    value={optionsData.optionC}
                    onChange={handleOptionChange}
                />
                <TextField
                    label="Option D"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="optionD"
                    value={optionsData.optionD}
                    onChange={handleOptionChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Correct Answer"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="answer"
                    value={editorial.answer}
                    onChange={handleChange}
                />
                <Box sx={{ width: '100%', ml: { sm: 1 } }} />
            </Box>
            <Box>
                <Button variant="contained" color="primary" type="submit" onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Box>
        </>
    );
};

export default AddEditorial;
