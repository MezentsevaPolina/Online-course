
import AdminPanel from "./pages/AdminPanel";
import {
    ADMIN_ROUTE, CERTIFICATE_ROUTE, CONTACT_ROUTE,
    COURSE_ROUTE, CREATING_ROUTE, CREATING_WRITE_ROUTE,
    FAVOURITES_ROUTE,
    LOGIN_ROUTE, MASTER_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    USER_ROUTE
} from "./utils/consts";
import Favourites from "./pages/FavouritesPage";
import Shop from "./pages/Shop";
import CoursePage from "./pages/CoursePage";
import Auth from "./pages/Auth";
import User from "./pages/User";
import ContactPage from "./pages/ContactPage";
import CertificatesPage from "./pages/CertificatesPage";
import MasterPanel from "./pages/MasterPanel";
import CreatingCourse from "./components/CreatingCourse";
import CreatingWrite from "./pages/CreatingWrite";

export const authRoutes = [ //страницы только для авторизированного пользователя
    {
        path: USER_ROUTE + '/:id',
        Component: User
    },
    {
        path: FAVOURITES_ROUTE,
        Component: Favourites
    },
    {
        path: CONTACT_ROUTE,
        Component: ContactPage
    },
    {
        path: MASTER_ROUTE,
        Component: MasterPanel
    },
    {
        path: CREATING_ROUTE,
        Component: CreatingCourse
    },
    {
        path: CREATING_WRITE_ROUTE,
        Component: CreatingWrite
    },
    {
        path: CERTIFICATE_ROUTE,
        Component: CertificatesPage
    },
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    }
]
export const adminRoutes = [ //страницы только для админа
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: COURSE_ROUTE + '/:id',
        Component: CoursePage
    },
    {
        path: USER_ROUTE + '/:id',
        Component: User
    }
]

export const publicRoutes = [ //страницы для всех
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: COURSE_ROUTE + '/:id',
        Component: CoursePage
    },
    {
        path: CONTACT_ROUTE,
        Component: ContactPage
    }
]
