import { defaultWidgets } from "./defaultWidgets";

export function mergePreferences(data: any) { //layouts: any, widgets?: any[]) {
    if (typeof localStorage !== 'undefined') {
        let appDataString = localStorage.getItem("appData");
        if (appDataString) {
            let appData = JSON.parse(appDataString);
            appData = { ...appData, ...data };
            localStorage.setItem(
                "appData",
                JSON.stringify(appData)
            );
        } else {
            localStorage.setItem(
                "appData",
                JSON.stringify(data)
            );
        }
    }
}

export function loadPreferences() {
    let ls: any = {};
    if (typeof localStorage !== 'undefined') {
        try {
            let appData = JSON.parse(localStorage.getItem("appData"));
            if (!appData) {
                mergePreferences(defaultWidgets);
                return defaultWidgets;
            }
            return appData;
        } catch (e) {
            mergePreferences(defaultWidgets);
            return defaultWidgets;
        }
    }
    return null;
}