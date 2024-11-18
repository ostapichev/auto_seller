import Joi from 'joi';

export const loginValidator = Joi.object({
    email: Joi.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,30}$/)
        .messages({
            'string.pattern.base': 'email must start with letter' +
                'length min 2 max 30 characters',
        }).required(),
    password: Joi.string().required(),
});
