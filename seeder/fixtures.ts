import { ITeam } from '../models/team';
import Fixture from '../models/fixture';

export interface IFixture extends Document {
  homeTeam: string | ITeam;
  awayTeam: string | ITeam;
  homeScore: number;
  awayScore: number;
  date: Date;
  stadium: string;
  referee: string;
  isPending: boolean;
}

const Fixtures = [
  new Fixture({
      _id:'5d7283618b1c6ea15c999ae7',
    homeTeam: '5d4155cfcd68f4086d8df500',
    awayTeam: '5d4155cfcd68f4086d8df501',
    homeScore: 5,
    awayScore: 6,
    date: Date.now(),
    stadium: 'Old Trafford',
    referee: 'Kazuki Ito',
    isPending: true
  }),
  new Fixture({
      _id:'5d7283618b1c6ea15c999ae8',
    homeTeam: '5d4155cfcd68f4086d8df502',
    awayTeam: '5d4155cfcd68f4086d8df503',
    homeScore: 3,
    awayScore: 2,
    date: Date.now(),
    stadium: 'Old Trafford',
    referee: 'Kazuki Ito',
    isPending: false
  }),
  new Fixture({
      _id:'5d7283618b1c6ea15c999ae9',
    homeTeam: '5d4155cfcd68f4086d8df504',
    awayTeam: '5d4155cfcd68f4086d8df505',
    homeScore: 2,
    awayScore: 1,
    date: Date.now(),
    stadium: 'Old Trafford',
    referee: 'Kazuki Ito',
    isPending: true
  }),
  new Fixture({
      _id:'5d7283618b1c6ea15c999ae4',
    homeTeam: '5d4155cfcd68f4086d8df503',
    awayTeam: '5d4155cfcd68f4086d8df501',
    homeScore: 5,
    awayScore: 6,
    date: Date.now(),
    stadium: 'Old Trafford',
    referee: 'Kazuki Ito',
    isPending: true
  })
];

export default Fixtures;
