import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SalePage from "./pages/SalePage.jsx";
import VouncherPage from "./pages/VouncherPage.jsx";
import VouncherDetailPage from "./pages/VouncherDetailPage.jsx";
import ProductCreatePage from "./pages/ProductCreatePage.jsx";
import ProductEditPage from "./pages/ProductEditPage.jsx";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />
                },
                {
                    path: '/product',
                    element: <ProductPage />,
                },
                {
                    path: '/product/create',
                    element: <ProductCreatePage />,
                },
                {
                    path: '/product/edit/:id',
                    element: <ProductEditPage />,
                },
                {
                    path: '/sale',
                    element: <SalePage />,
                },
                {
                    path: '/vouncher',
                    element: <VouncherPage />,
                },
                {
                    path: '/voucher/detail/:id',
                    element: <VouncherDetailPage />,
                }
                
            ]
        },
        
    ]
)

export default router;