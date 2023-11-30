const calculateHeight =(pixels)=>{
    const h = window.screen.availHeight - pixels
    const height = h + 'px'
    return height
}

const calculateWeight =(pixels)=>{
    const w = window.screen.availWidth - pixels
    const width = w + 'px'
    return width
}

export {calculateHeight, calculateWeight}