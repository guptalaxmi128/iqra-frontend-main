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
import { addArticle } from '../../actions/article/article';
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

const Article = () => {

    const subjectArray = (useSelector((state) => state.subject.subjects));
    console.log(subjectArray);

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

    // const subjectArray = [
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

    const [article, setArticle] = useState({
        heading: '',
        tags: '',
        prelims: '',
        mains: '',
        editor: '',
        questionHeading: '',
        question: '',
        options: '',
        answer: '',
        subject: ''
    });

    const handleChange = (event) => {
        setArticle({ ...article, [event.target.name]: event.target.value });
    };

    const handleOptionChange = (event) => {
        setOptionsData({ ...optionsData, [event.target.name]: event.target.value });
    };

    const [tags, setTags] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [editor, setEditor] = useState();
    const tagRef = useRef();

    const handleSubjectsChange = (event) => {
        const {
            target: { value }
        } = event;
        setSubjects(typeof value === 'string' ? value.split(',') : value);
        console.log(subjects);
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

    const dispatch = useDispatch();

    const handleSubmit = () => {
        try {
            const request = {
                heading: article.heading,
                rating: 0,
                tags: tags,
                prelims: article.prelims,
                mains: article.mains,
                dataFromEditor: editor,
                questionHeading: article.questionHeading,
                question: article.question,
                options: optionsData,
                answer: article.answer,
                subject: subjects
            };
            console.log(request);
            dispatch(addArticle(request));
            setArticle({
                heading: '',
                tags: '',
                prelims: '',
                mains: '',
                editor: '',
                questionHeading: '',
                question: '',
                options: '',
                answer: '',
                subject: ''
            });
            setTags([]);
            setSubjects([]);
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
        <MainCard title="Article">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Heading"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 } }}
                    type="text"
                    name="heading"
                    value={article.heading}
                    onChange={handleChange}
                />
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
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <TextField
                    label="Prelims"
                    variant="outlined"
                    fullWidth
                    sx={{ mr: { sm: 1 }, backgroundColor: 'primary.lighter', borderRadius: '5px' }}
                    type="text"
                    name="prelims"
                    value={article.prelims}
                    onChange={handleChange}
                />
                <TextField
                    label="Mains"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 }, backgroundColor: 'primary.lighter', borderRadius: '5px' }}
                    type="text"
                    name="mains"
                    value={article.mains}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, mb: 2 }}>
                <Box sx={{ width: '100%', maxWidth: '100%' }}>
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
                    value={article.questionHeading}
                    onChange={handleChange}
                />
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    sx={{ ml: { sm: 1 }, mt: { xs: 2, sm: 0 } }}
                    type="text"
                    name="question"
                    value={article.question}
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
                    value={article.answer}
                    onChange={handleChange}
                />
                <Box sx={{ width: '100%', ml: { sm: 1 } }} />
            </Box>
            <Box>
                <Button variant="contained" color="primary" type="submit" onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Box>
        </MainCard>
    );
};

export default Article;
