const Joi=require("joi");

module.exports.listingSchema=new Joi.object({
        listing:Joi.object(
            {
                title:Joi.string().required(),
                description:Joi.string().required(),
                price:Joi.number().required().min(0),
                location:Joi.string().required(),
                image:Joi.string().allow("",null),
                country:Joi.string().required()
            }
        ).required()
});

module.exports.reviewSchema=new Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
})