import Joi from 'joi';

function validateTeam(recordData: Express.Request): Joi.ValidationResult<Express.Request> {
  // Create a Joi Schema To validate incoming record data
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    fixtures: Joi.array().required(),
    league: Joi.string().required(),
    manager: Joi.string().required(),
    established: Joi.string(),
    owner: Joi.string(),
    formation: Joi.string()
  });
  return Joi.validate(recordData, schema);
}
export { validateTeam };
