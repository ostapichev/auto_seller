const baseURL = 'http://localhost:3500';
const auth = '/auth';
const users = '/users';
const me = '/me';
const cars = '/cars';
const brands = '/brands';
const cities = '/cities';
const socket = '/socket';
const currency_course = './currency-course';

const urls = {
    authAPI: {
        signUp: `${auth}/sign-up`,
        signIn: `${auth}/sign-in`,
        signOut: `${auth}/sign-out`,
        refresh: `${auth}/refresh`,
    },
    usersAPI: {
        me: `${users}${me}`,
        avatar: `${users}/${me}/avatar`,
    },
    carsAPI: {
        cars: cars,
        brands: `${cars}${brands}`,
    },
    cityAPI: {
        city: `${cars}${cities}`,
    },
    currency_courseAPI: {
        currency_course: `${currency_course}`,
    },
    socketAPI: {
        socket: `${socket}`,
    }
};

export {
    baseURL,
    urls,
};
