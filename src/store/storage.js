import {AsyncStorage} from 'react-native';

export const setItem = (key, string) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, string, (err, result) => {
            err ? reject(err) : resolve(result)
        });
    });
};

export const getItem = key => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key, (err, result) => {
            err ? reject(err) : resolve(result)
        });
    });
};

export const removeItem = key => {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem(key, (err, result) => {
            err ? reject(err) : resolve(result)
        });
    });
};