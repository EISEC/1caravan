import {v4 as uuid} from "uuid";
import {
    FcInTransit,
    FcHeadset,
    FcReadingEbook,
    FcSupport,
    FcShop,
    FcPortraitMode,
    FcRefresh,
    FcAddImage
} from "react-icons/fc";

export const dataPreim = [
    {
        id: uuid(),
        icon: <FcSupport/>,
        title: 'Техническая подготовка',
        desc: 'Предпродажная подготовка и ТО каждого каравана',
    },
    {
        id: uuid(),
        icon: <FcShop/>,
        title: 'Шоурум',
        desc: 'Караваны расположены в теплом шоуруме',
    },
    {
        id: uuid(),
        icon: <FcPortraitMode/>,
        title: 'Помощь при выборе',
        desc: 'Персональный подбор по характеристикам и возможность осмотра по видеосвязи',
    },
    {
        id: uuid(),
        icon: <FcAddImage/>,
        title: 'Демонстрация оборудования',
        desc: 'Обучение по эксплуатации и демонстрация работоспособности оборудования',
    },
    {
        id: uuid(),
        icon: <FcReadingEbook/>,
        title: 'Сервис',
        desc: 'Сервисное обслуживание для своих клиентов, установка доп.оборудования',
    },
    {
        id: uuid(),
        icon: <FcInTransit/>,
        title: 'Доставка по РФ',
        desc: 'Автомобилем, лафетом, жд сообщением в Любые регионы страны',
    },
    {
        id: uuid(),
        icon: <FcHeadset/>,
        title: 'Горячая линия',
        desc: 'Горячая линия по техническим вопросам после покупки',
    },
    {
        id: uuid(),
        icon: <FcRefresh/>,
        title: 'Trade-in',
        desc: 'Система Trade-in и прием на комиссию',
    },
]