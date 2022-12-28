import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Article = Loadable(lazy(() => import('pages/article/Article')));
const Editorial = Loadable(lazy(() => import('pages/editorial/Editorial')));
const Master = Loadable(lazy(() => import('pages/master/Master')));
const Course = Loadable(lazy(() => import('pages/course/Course')));
const Teacher =Loadable(lazy(()=>import('pages/teacher/Teacher')));
const Student = Loadable(lazy(() => import('pages/student/Student')));
const Banner = Loadable(lazy(()=> import('pages/banner/Banner')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'article',
            element: <Article />
        },
        {
            path: 'editorial',
            element: <Editorial />
        },
        {
            path: 'master',
            element: <Master />
        },
        {
            path: 'course',
            element: <Course />
        },
        {
            path: 'teacher',
            element: <Teacher />
        },
        {
            path: 'student',
            element: <Student />
        },
        {
            path: 'banner',
            element: <Banner />
        },

    ]
};

export default MainRoutes;
