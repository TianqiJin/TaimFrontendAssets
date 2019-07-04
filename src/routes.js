// Icons
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
import PhotoIcon from '@material-ui/icons/Photo';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import NavigationIcon from '@material-ui/icons/Navigation';
import PagesIcon from '@material-ui/icons/Pages';
import FaceIcon from '@material-ui/icons/Face';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PersonIcon from '@material-ui/icons/Person';
import ShopIcon from '@material-ui/icons/Shop';

// Pages
import {
    Home,
    CustomerOverview,
    NewCustomerView,
    ProductOverview,
    NewProductView,
    QuotationDetailView,
    CustomerDetailView,
    VendorOverviewView,
    NewVendorView,
    QuotationOverviewView
} from './pages';



export default {
    items: [
        {
            path: '/',
            name: 'Home',
            type: 'link',
            icon: ExploreIcon,
            component: Home
        },
        {
            path: '/customers',
            name: 'Customer',
            type: 'route-group',
            icon: PersonIcon,
            component: CustomerOverview,
            children: [
                {
                    path: '/new',
                    name: 'New Customer',
                    component: NewCustomerView
                },
                {
                    path: '/:customerId',
                    name: 'Customer Detail',
                    component: CustomerDetailView
                }]
        },
        {
            path: '/products',
            name: 'Product',
            type: 'route-group',
            icon: ShopIcon,
            component: ProductOverview,
            children: [
                {
                    path: '/new',
                    name: 'New Product',
                    component: NewProductView
                }]
        },
        {
            path: '/transactions',
            name: 'Transaction',
            type: 'submenu',
            icon: ViewColumnIcon,
            children: [
                {
                    path: '/quotations/new',
                    name:  undefined,
                    component: QuotationDetailView
                },
                {
                    path: '/quotations/:quotationId',
                    name: undefined,
                    component: QuotationDetailView
                },
                {
                    path: '/quotations',
                    name: 'Quotation Overview',
                    component: QuotationOverviewView
                }]
        },
        {
            path: '/vendors',
            name: 'Vendor',
            type: 'route-group',
            icon: PersonIcon,
            component: VendorOverviewView,
            children: [
                {
                    path: '/new',
                    name: 'New Vendor',
                    component: NewVendorView
                }]
        },
  ]
};