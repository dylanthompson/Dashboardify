import { of } from 'rxjs';
import { get } from 'aws-amplify/api';

let cache: {[key:string]: {promise: Promise<any>, result: any, timestamp: Date}} = {};

var checkCache = (cacheKey: string) => {
    if (cache[cacheKey]) {
        if (cache[cacheKey].promise) {
            return cache[cacheKey].promise;
        } else if (cache[cacheKey].result) {
            let diff = Math.abs((new Date()).valueOf() - cache[cacheKey].timestamp.valueOf());
            if (Math.floor((diff/1000)/60) < 2) {
                return of(cache[cacheKey].result).toPromise();
            }
            delete cache[cacheKey];
        }
    } else {
        cache[cacheKey] = <any>{};
    }
}

var setCache = (cacheKey: string, promise: Promise<any>) => {
    promise.then((result) => {
        cache[cacheKey].result = result;
        cache[cacheKey].promise = null;
        cache[cacheKey].timestamp = new Date();
    }, (error) => {
        delete cache[cacheKey];
    })
}

export var makeHttpRequest = (url: string): Promise<any> => {
    let cacheKey = url;

    let cached = checkCache(cacheKey);
    if (cached) {
        return cached;
    }

    let promise = fetch(url).then((result) => {
        return result.json();
    });
    
    cache[cacheKey].promise = promise;
    
    setCache(cacheKey, promise);

    return promise;
}

export var makeAmplifyRequest = (apiName: string, path: string): Promise<any> => {
    let cacheKey = apiName + '_' + path;

    let cached = checkCache(cacheKey);
    if (cached) {
        return cached;
    }

    const promise = get({ 
        apiName: apiName,
        path: path ,
        options: {
            headers: {
              Authorization: null
            }
          }
      }).response.then((result) => {
        return result.body.json();
    });
    
    cache[cacheKey].promise = promise;
    
    setCache(cacheKey, promise);

    return promise;
}
