import { ref } from "vue"
import type { TUseCursorReturn } from "../interfaces"

export function useCursor(cursorValue: string='auto'): TUseCursorReturn{
    const cursor = ref<string>(cursorValue)
    function changeCursor(cursorValue: string){
        cursor.value = cursorValue
        if(cursorValue !== 'grab') document.body.style.cursor = cursorValue
        else document.body.style.cursor = ''
    }

    return [ cursor, changeCursor ]
}