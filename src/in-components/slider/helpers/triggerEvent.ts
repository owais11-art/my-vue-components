export function triggerEvent(eventName: string, element: HTMLElement){
    const event = new Event(eventName)
    element.dispatchEvent(event)
}

export function triggerEvents<T>(...events: T[]){
    for(let event of events){
        if(!Array.isArray(event)) return
        const [ eventName, element ] = event
        triggerEvent(eventName, element)
    }
}