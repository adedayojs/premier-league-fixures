import Joi from 'joi';

function validateTeam(team: Express.Request): Joi.ValidationResult<Express.Request> {
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
  return Joi.validate(team, schema);
}
function validateFixture(fixture: Express.Request): Joi.ValidationResult<Express.Request> {
  const schema = Joi.object().keys({
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    homeScore: Joi.string().required(),
    awayScore: Joi.string().required(),
    date: Joi.date().required(),
    stadium: Joi.string().required(),
    referee: Joi.string().required(),
    isPending: Joi.string().required()
  });
  return Joi.validate(fixture, schema);
}
export { validateTeam, validateFixture };
