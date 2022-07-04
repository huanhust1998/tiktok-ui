//Layout
import { HeaderOnly } from "~/component/Layout";

//Page
import Following from "~/page/Following";
import Home from "~/page/Home";
import Profile from "~/page/Profile";
import Upload from "~/page/Upload";
import Search from "~/page/Search";

// Public routes
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/following", component: Following },
    { path: "/profile", component: Profile },
    { path: "/upload", component: Upload, layout: HeaderOnly },
    { path: "/search", component: Search, layout: null },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
