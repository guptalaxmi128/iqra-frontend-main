import { combineReducers } from 'redux';

import menu from './menu/menu';
import article from './article/article';
import editorial from './editorial/editorial';
import auth from './auth/auth';

import category from './master/category';
import subject from './master/subject';
import medium from './master/medium';
import level from './master/level';
import language from './master/language';

import course from './course/course';
import liveclass from './course/liveClass';
import content from './course/uploadContent';

import teacher from './teacher/teacher';


import student from './student/student';
import banner from './banner/banner';

export const reducers = combineReducers({
    menu,
    article,
    editorial,
    auth,
    category,
    subject,
    medium,
    level,
    language,
    course,
    liveclass,
    content,
    teacher,
    student,
    banner,
});
