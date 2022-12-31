import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:5000/api//master',
    // baseURL: 'https://iqra-twfr.onrender.com/api//master'
    baseURL :'https://iqra-twfr.onrender.com/api'
});

api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});



export const addArticle = (articleInfo) => api.post(`/master/add-articles`, articleInfo);
export const getArticle = () => api.get(`/master/articles`);

export const addEditorial = (editorialInfo) => api.post(`/master/add-editorials`, editorialInfo);
export const getEditorial = () => api.get(`/master/editorials`);

export const signup = (userInfo) => api.post(`/master/signupAdmin`, userInfo);
export const signin = (userInfo) => api.post(`/master/signinAdmin`, userInfo);
export const signout = () => api.post(`/master/signoutAdmin`);
export const admin = () => api.get(`/master/admin`, {
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).accessToken}`
    }
});

export const addCategory = (categoryInfo) => api.post(`/master/add-categorys`, categoryInfo);
export const getCategory = () => api.get(`/master/categorys`);

export const addSubject = (subjectInfo) => api.post(`/master/add-subjects`, subjectInfo);
export const getSubject = () => api.get(`/master/subjects`);

export const addMedium = (mediumInfo) => api.post(`/master/add-mediums`, mediumInfo);
export const getMedium = () => api.get(`/master/mediums`);

export const addLevel = (levelInfo) => api.post(`/master/add-levels`, levelInfo);
export const getLevel = () => api.get(`/master/levels`);

export const addLanguage = (languageInfo) => api.post(`/master/add-languages`, languageInfo);
export const getLanguage = () => api.get(`/master/languages`);

export const addCourse = (courseInfo) => api.post(`/master/add-addCourses`, courseInfo);
export const getCourse = () => api.get(`/master/addCourses`);

export const addLiveclass = (liveclassInfo) => api.post(`/master/add-liveClasses`, liveclassInfo);
export const getLiveclass = () => api.get(`/master/liveClasses`);

export const addUploadcontent = (uploadcontentInfo) => api.post(`/master/add-contents`, uploadcontentInfo);
export const getUploadcontent = () => api.get(`/master/contents`);

export const addTeacher = (teacherInfo)=>api.post(`/student/register-teachers`,teacherInfo);
// export const getTeacher = () =>api.get(`/master/addTeacher`);

export const addStudent = (studentInfo)=>api.post(`/student/register-students`,studentInfo);
// export const getStudent = () =>api.get(`/master/addStudent`);

export const addBanner=(bannerInfo)=>api.post('/master/add-banners',bannerInfo);
export const getBanner=()=>api.get('/master/banners');

export const addImportantIssue = (importantIssueInfo) => api.post(`master/add-iICategories`, importantIssueInfo);
export const getImportantIssue = () => api.get(`master/iICategories`);

export const addWeeklyNews = (weeklyNewsInfo) => api.post(`master/add-wNCategories`, weeklyNewsInfo);
export const getWeeklyNews = () => api.get(`master/wNCategories`);