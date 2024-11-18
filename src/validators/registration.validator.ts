import Joi from 'joi';

export const registrationValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z]\w{1,19}$/)
        .messages({
            'string.pattern.base': 'Username must start with letter, and consists with letters, numbers or _. ' +
                'length min 2 max 20 characters',
        }).required(),
    phone: Joi.string().regex(/^\d{12}$/)
        .messages({
            'string.pattern.base': 'phone must start with number' +
                'length 12 digits',
        }).required(),
    email: Joi.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,30}$/)
        .messages({
            'string.pattern.base': 'email must start with letter' +
                'length min 2 max 30 characters',
        }).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
        .messages({
            'string.pattern.base': 'Password must consists from 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric characters. ' +
                'length min 8 max 20 characters',
        }).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords mismatch!',
    }),
    gender: Joi.string().required(),
    avatar: Joi.any(),
});
