import {v4 as uuid} from "uuid";
import {TAddCategoryList} from "@/pages/avtodom/types";

export const mockData: TAddCategoryList = [
    {
        categoryName: 'Электроприборы и электрика',
        catId: uuid(),
        categoryItems: [
            {
                itemListName: 'Инвертор',
                info: [
                    {
                        title: 'ИС стандарт',
                        price: 33,
                        descr: 'Стандартный инвертор на 1.5кВт',
                        id: uuid(),
                    },
                    {
                        title: 'СибВатт',
                        price: 36,
                        descr: 'Инвертор на 1.7кВт. Отлично подойдет для работы кофе машины',
                        id: uuid(),
                    },
                    {
                        title: 'СибВольт',
                        price: 39,
                        descr: 'Инвертор увеличенного размера, с кнопкой удаленного запуска/выключения. Отлично подойдет для постоянного',
                        id: uuid(),
                    }
                ]
            }
        ]

    },
    {
        categoryName: 'Газ',
        catId: uuid(),
        categoryItems: [
            {
                itemListName: 'Баллон',
                info: [
                    {
                        title: 'ИС стандарт',
                        price: 33,
                        descr: 'Стандартный инвертор на 1.5кВт',
                        id: uuid(),
                    },
                    {
                        title: 'СибВатт',
                        price: 36,
                        descr: 'Инвертор на 1.7кВт. Отлично подойдет для работы кофе машины',
                        id: uuid(),
                    },
                    {
                        title: 'СибВольт',
                        price: 39,
                        descr: 'Инвертор увеличенного размера, с кнопкой удаленного запуска/выключения. Отлично подойдет для постоянного',
                        id: uuid(),
                    }
                ]
            },
            {
                itemListName: 'Ct,fcnmzy',
                info: [
                    {
                        title: 'ИС стандарт',
                        price: 33,
                        descr: 'Стандартный инвертор на 1.5кВт',
                        id: uuid(),
                    },
                    {
                        title: 'СибВатт',
                        price: 36,
                        descr: 'Инвертор на 1.7кВт. Отлично подойдет для работы кофе машины',
                        id: uuid(),
                    },
                    {
                        title: 'СибВольт',
                        price: 39,
                        descr: 'Инвертор увеличенного размера, с кнопкой удаленного запуска/выключения. Отлично подойдет для постоянного',
                        id: uuid(),
                    }
                ]
            }
        ]

    }
]