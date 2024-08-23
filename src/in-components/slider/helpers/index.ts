import { isStepCompleted, isStepBetweenRange } from "./isStepCompleted"
import { addEventListenersToDocument, removeEventListenersFromDocument } from "./documentEventListeners"
import { getSliderWrapperDimensions } from "./getSliderWrapperDimensions"
import { getStepPercentage } from "./getStepPercentage"
import { getTooltipCoordinateDistances } from "./getTooltipCoordinateDistances"
import { userSelect } from "./userSelect"
import { getCoordinates } from "./getCoordinates"
import { removeAllSpaces } from "./removeAllSpaces"
import { triggerEvent, triggerEvents } from "./triggerEvent"
import { getFillPercentage } from "./getFillPercentage"
import { getIndecesToCheckSpacesAt } from "./getIndecesToCheckSpacesAt"
import { formatRGBColor } from "./formatRGBColor"
import { convert_RGBA_to_RGB } from "./convert_RGBA_to_RGB"
import { getOpacity } from "./getOpacity"
import { calculateStepsCompleted } from "./calculateStepsCompleted"
import { getMinAndMax } from "./getMinAndMax"
import { getStepsCompleted } from "./getStepsCompleted"
import { getShadeArg } from "./getShadeArg"

export {
    isStepCompleted,
    isStepBetweenRange,
    addEventListenersToDocument,
    removeEventListenersFromDocument,
    getSliderWrapperDimensions,
    getStepPercentage,
    getTooltipCoordinateDistances,
    userSelect,
    getCoordinates,
    removeAllSpaces,
    triggerEvent,
    triggerEvents,
    getFillPercentage,
    getIndecesToCheckSpacesAt,
    formatRGBColor,
    convert_RGBA_to_RGB,
    getOpacity,
    calculateStepsCompleted,
    getMinAndMax,
    getStepsCompleted,
    getShadeArg
}