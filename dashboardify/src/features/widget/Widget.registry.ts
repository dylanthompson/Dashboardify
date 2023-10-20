import { FORM_FIELDS_ImageLink, ImageLink } from "../image-link/ImageLink"
import Weather, { FORM_FIELDS_Weather } from "../weather/Weather"
import { FORM_FIELDS_Map, Map } from "../map/Map"
import Clock, { FORM_FIELDS_Clock } from "../clock/Clock"
import { FormField } from "../form/Form"

export interface IWidgetRegistry {
    name: string,
    component: Function,
    formFields?: FormField[],
    icon: string
}

export const widgetRegistry: IWidgetRegistry[] = [
    {
        name: 'ImageLink',
        component: ImageLink,
        formFields: FORM_FIELDS_ImageLink,
        icon: '🔗'
    },
    {
        name: 'Map',
        component: Map,
        formFields: FORM_FIELDS_Map,
        icon: '🗺️'
    },
    {
        name: 'Weather',
        component: Weather,
        formFields: FORM_FIELDS_Weather,
        icon: '☁️'
    },
    {
        name: 'Clock',
        component: Clock,
        formFields: FORM_FIELDS_Clock,
        icon: '🕔'
    }
]