import { IFuncString } from "../types";

const getDeviceId: IFuncString = () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device-' + Math.random().toString(16);
        localStorage.setItem('deviceID', deviceId);
    }
    return deviceId;
};

export {
    getDeviceId
};
