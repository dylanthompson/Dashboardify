import { FORM_FIELDS_ImageLink, ImageLink } from "../image-link/ImageLink"
import Weather from "../weather/Weather"
import { FORM_FIELDS_Map, Map } from "../map/Map"
import Clock from "../clock/Clock"

export interface FormField {
    name: string;
    type: string;
}

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
        icon: '☁️'
    },
    {
        name: 'Clock',
        component: Clock,
        icon: '🕔'
    }
]