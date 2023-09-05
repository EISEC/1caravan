
export type TAddItem = {
    title: string
    price: number
    descr: string
    id: string
}

export type TAddItemList = {
    itemListName: string,
    info: TAddItem[]
}

export type TAddCategory = {
    categoryName: string
    categoryItems: TAddItemList[]
    catId: string
}

export type TAddCategoryList = TAddCategory[]