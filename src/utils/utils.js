const calculateHeight = (pixels) => {
    const h = window.screen.availHeight + pixels
    const height = h + 'px'
    return height
}

const calculateWeight = () => {
    const width = window.screen.availWidth
    return width
}

const MoneyFormat = (number) => {
    const numberToFormat = number;
    const formattedNumber = numberToFormat.toLocaleString();
    return formattedNumber
}
export { calculateHeight, calculateWeight, MoneyFormat }