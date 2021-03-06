import Team, { ITeam } from '../models/team';
import mongoose from 'mongoose';

async function teamInDatabaseValidator(teams: mongoose.Types.ObjectId[]) {
  const resArray = teams.map(team =>
    Team.findById(team)
      .then(res => (res == null ? false : true))
      .catch(() => false)
  );
  const resolvedArray = await Promise.all(resArray);
  return resolvedArray.every(ans => ans === true);
}

export default teamInDatabaseValidator;
