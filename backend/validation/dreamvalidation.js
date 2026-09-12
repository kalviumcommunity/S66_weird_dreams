const Joi = require("joi");

const dreamValidationSchema = Joi.object({
    userId: Joi.string().hex().length(24).optional(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().optional(),
    emotions: Joi.array().items(Joi.string().valid("happy", "scared", "excited", "confused", "calm","sad", "angry", "surprised", "frustrated", "nostalgic", "anxious")).optional(),
    lucid: Joi.boolean().optional(),
    nightmare: Joi.boolean().optional(),
    recurring: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string().max(30)).optional(),
    newTag: Joi.string().allow("").optional(),
});

module.exports = dreamValidationSchema;
