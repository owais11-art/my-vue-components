import { ref } from "vue"
import type { TUseCursorReturn } from "../interfaces"

export function useCursor(cursorValue: string='auto'): TUseCursorReturn{
    const _cursor = ref<string>(cursorValue)
    function fnChangeCursor(cursorValue: string){
        _cursor.value = cursorValue
        if(cursorValue !== 'grab') document.body.style.cursor = cursorValue
        else document.body.style.cursor = ''
    }

    return [ _cursor, fnChangeCursor ]
}