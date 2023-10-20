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
            return JSON.parse(localStorage.getItem("appData")) || null;
        } catch (e) {
            /*Ignore*/
        }
    }
    return null;
}