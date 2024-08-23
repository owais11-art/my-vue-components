export function getOpacity(opacity: number): string{
    return `${opacity}`.length === 1 ? `0${opacity}` : `${opacity}`.length > 2 ? '' : `${opacity}`
}