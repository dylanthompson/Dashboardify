import { of } from 'rxjs';

let cache: {[key:string]: {promise: Promise<any>, result: any, timestamp: Date}} = {};

export var makeRequest = (url: string): Promise<any> => {
    if (cache[url]) {
        if (cache[url].promise) {
            return cache[url].promise;
        } else if (cache[url].result) {
            let diff = Math.abs(new Date() - cache[url].timestamp);
            if (Math.floor((diff/1000)/60) < 2) {
                return of(cache[url].result).toPromise();
            }
            delete cache[url];
        }
    } else {
        cache[url] = <any>{};
    }
    let promise = fetch(url).then((result) => {
        return result.json();
    });
    
    cache[url].promise = promise;
    
    promise.then((result) => {
        cache[url].result = result;
        cache[url].promise = null;
        cache[url].timestamp = new Date();
    }, (error) => {
        delete cache[url];
    })

    return promise;
}
