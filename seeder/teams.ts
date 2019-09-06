import Team from '../models/team';

const Teams = [
  new Team({
    _id: '5d4155cfcd68f4086d8df500',
    name: 'Manchester United',
    manager: 'Alex Ferguson',
    league: 'EPL',
    established: new Date(1966, 3, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df506', date: Date.now(), location: 'Home' }]
  }),
  new Team({
    _id: '5d4155cfcd68f4086d8df501',
    name: 'Manchester City',
    manager: 'Adesina',
    league: 'EPL',
    established: new Date(1966, 1, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df500', date: Date.now(), location: 'Home' }]
  }),
  new Team({
    _id: '5d4155cfcd68f4086d8df502',
    name: 'Arsenal Fc',
    manager: 'Habu',
    league: 'EPL',
    established: new Date(1966, 4, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df501', date: Date.now(), location: 'Away' }]
  }),
  new Team({
    _id: '5d4155cfcd68f4086d8df503',
    name: 'Liverpool Fc',
    manager: 'Olagunju',
    league: 'EPL',
    established: new Date(1966, 10, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df502', date: Date.now(), location: 'Home' }]
  }),
  new Team({
    _id: '5d4155cfcd68f4086d8df504',
    name: 'Westbrom Fc',
    manager: 'Alokwu',
    league: 'EPL',
    established: new Date(1966, 3, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df503', date: Date.now(), location: 'Home' }]
  }),
  new Team({
    _id: '5d4155cfcd68f4086d8df505',
    name: 'Crystal Palace Fc',
    manager: 'Mark',
    league: 'EPL',
    established: new Date(1966, 8, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df504', date: Date.now(), location: 'Away' }]
  }),
  new Team({
    _id: '5d4155cfcd68f4086d8df506',
    name: 'Leichester City',
    manager: 'Ogbuanya',
    league: 'EPL',
    established: new Date(1966, 3, 12),
    formation: '5 4 1',
    owner: 'Glacier Family',
    fixtures: [{ team: '5d4155cfcd68f4086d8df505', date: Date.now(), location: 'Away' }]
  })
];

export default Teams;
