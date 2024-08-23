export function removeAllSpaces(str: string): string{
    if(!str.includes(" ")) return str
    let newStr = ''
    for(let s of str){
        if(s !== " ") newStr += s
    }
    return newStr
}