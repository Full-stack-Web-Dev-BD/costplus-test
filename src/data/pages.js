import NewsImg1 from '../assets/img/new/new1.png'
import NewsImg2 from '../assets/img/new/new2.png'
import NewsImg3 from '../assets/img/new/new3.png'

import { Routes } from "../routes";

export default [
    {
        "id": 1,
        "name": "Subscription service",
        "content": "Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam sed faucib turpis eu gravida mi. Pellentesque et velit aliquam sed mi.",
        "image": NewsImg1,
        "link": Routes.DashboardOverview.path
    },
    {
        "id": 2,
        "name": "24/7 Support",
        "content": "Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam sed faucib turpis eu gravida mi. Pellentesque et velit aliquam sed mi. ",
        "image": NewsImg2,
        "link": Routes.Transactions.path
    },
    {
        "id": 3,
        "name": "Quick Delivery",
        "content": "Euismod faucibus turpis eu gravida mi. Pellentesque et velit aliquam sed faucib turpis eu gravida mi. Pellentesque et velit aliquam sed mi. ",
        "image": NewsImg3,
        "link": Routes.Settings.path
    }
];