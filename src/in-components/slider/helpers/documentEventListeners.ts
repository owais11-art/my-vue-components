const isPassive = (event: string): boolean => !(event === 'touchmove')

export function addEventListenersToDocument<T>(...listeners: T[]){
    for(let listener of listeners){
        if(!Array.isArray(listener)) return
        const [event, eventHandler] = listener
        document.addEventListener(event, eventHandler, { passive: isPassive(event) })
    }
}

export function removeEventListenersFromDocument<T>(...listeners: T[]){
    for(let listener of listeners){
        if(!Array.isArray(listener)) return
        const [event, eventHandler] = listener
        document.removeEventListener(event, eventHandler)
    }
}