const calculateHeight =(pixels)=>{
    const h = window.screen.availHeight + pixels
    const height = h + 'px'
    return height
}

const calculateWeight =()=>{
    const width = window.screen.availWidth
    return width
}

export {calculateHeight, calculateWeight}