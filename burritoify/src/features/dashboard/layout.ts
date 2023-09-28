import { Layout } from "react-grid-layout";

// breakpoints={{ lg: 1200, sm: 768, xs: 480 }}
// columns={{ lg: 12, sm: 6, xs: 2 }}

const DEFAULT_BREAKPOINTS: any = {
    lg: {
        breakpoint: 1750,
        columns: 12
    },
    sm: {
        breakpoint: 1050,
        columns: 6
    },
    xs: {
        breakpoint: 0,
        columns: 4
    }
}

export function getDefaultBreakpoints() {
    let result:any = {};
    for (let key of Object.keys(DEFAULT_BREAKPOINTS)) {
        result[key] = DEFAULT_BREAKPOINTS[key].breakpoint;
    }
    return result;
}

export function getDefaultColumns() {
    let result:any = {};
    for (let key of Object.keys(DEFAULT_BREAKPOINTS)) {
        result[key] = DEFAULT_BREAKPOINTS[key].columns;
    }
    return result;
}

type ResponsiveLayouts = { [key:string]: Layout[]};

const defaultWidgets = [
  { i: 'Map|a', location: 'MYLOCATION' },
  { i: 'Weather|b', location: 'MYLOCATION' },
  { i: 'Clock|c', location: 'MYLOCATION', showSeconds: false }
];

export function getDefaultWidgets(): any[] {
    return Array.from(defaultWidgets, (w) => { return { ...w }});
}
  
export function getDefaultResponsiveLayouts(): ResponsiveLayouts {
    let resultingObject:ResponsiveLayouts = {};
    for (let key of Object.keys(DEFAULT_BREAKPOINTS)) {
        resultingObject[key] = Array.from(defaultWidgets, (w) => { return <Layout>{x: 0, y: 0, w: 2, h: 2 , i: w.i}})
    }
    return resultingObject;
}
  
  