const baseURL = 'http://localhost:3500';
const cars = '/cars';
const cities = '/cities';
const currency_course = './currency-course';
const urls = {
    carsAPI: {
        cars: cars
    },
    cityAPI: {
        city: `${cars}${cities}`,
    },
    currency_courseAPI: {
        currency_course: `${currency_course}`,
    }
};

export {
    baseURL,
    urls
};
