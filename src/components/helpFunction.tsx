export const preObraz = (it: any) => {
    if (it === 'price') {
        return 'цена'
    }
    if (it === 'mass_pusto') {
        return 'масса_кг'
    }
    if (it === 'Max_mass') {
        return 'максимальная_масса_кг'
    }
    if (it === 'strana_proiz') {
        return 'страна_производитель'
    }
    if (it === "kol_sleep") {
        return 'Количество спальных мест'
    }
    if (it === "длина_каравана") {
        return 'длинна_см'
    }
    if (it === "ширина_каравана_копия") {
        return 'ширина_см'
    }
    if (it === "высота_каравана_копия2") {
        return 'высота_см'
    }
    if (it === "внутрення_дхшхв") {
        return "внутрення_ДхШхВ"
    }
    if (it === 'god_vipuska') {
        return 'год_выпуска'
    } else {
        return it
    }
}