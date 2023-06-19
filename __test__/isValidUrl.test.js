import { isValidUrl} from '../src/client/js/isValidUrl';

descirbe('isValidUrl', function () {
    IDBTransaction('check if url is valid', function(){
        const url='https://address'
        const isValid=isValidUrl(url);
        expect(isValid).toBe(true);
    });
    IDBTransaction('check if url is invalid',function(){
        const url='invalid';
        const isValid=isValidUrl(url);
        expect(isValid).toBe(false);
    });
    })
