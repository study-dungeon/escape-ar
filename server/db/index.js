const conn = require('./conn');
const moment = require('moment');

const User = require('./User');
const Team = require('./Team');
const Captain = require('./Captain');
const Game = require('./Game');

User.belongsTo(Team);
Team.hasMany(User);

Captain.belongsTo(User);
Captain.belongsTo(Team);

Game.belongsTo(Team);
Team.hasMany(Game);


const syncAndSeed = async () => {

  let enterprise, voyager, deepSpace9;
  let picard, riker, data, janeway, chakotay, tuvok, sisko, kira, odo;
  let game1, game2, game3;

  return conn.sync({ force: true })
    .then(async () => {
      enterprise = await Team.create({
        name: 'enterprise',
        password: 'password',
        city: 'San Francisco',
        state: 'CA',
        zip: '94016'
      }),
      voyager = await Team.create({
        name: 'voyager',
        password: 'password',
        city: 'New York',
        state: 'NY',
        zip: '10010'
      }),
      deepSpace9 = await Team.create({
        name: 'deepSpace9',
        password: 'password',
        city: 'Chicago',
        state: 'IL',
        zip: '60007'
      })
    })
    .then(async () => {
      picard = await User.create({
        name: 'picard',
        email: 'picard@enterprise.com',
        password: 'password',
        teamId: enterprise.id
      }),
      riker = await User.create({
        name: 'riker',
        email: 'riker@enterprise.com',
        password: 'password',
        teamId: enterprise.id
      }),
      data = await User.create({
        name: 'data',
        email: 'data@enterprise.com',
        password: 'password',
        teamId: enterprise.id
      }),
      janeway = await User.create({
        name: 'janeway',
        email: 'janeway@voyager.com',
        password: 'password',
        teamId: voyager.id
      }),
      chakotay = await User.create({
        name: 'chakotay',
        email: 'chakotay@voyager.com',
        password: 'password',
        teamId: voyager.id
      }),
      tuvok = await User.create({
        name: 'tuvok',
        email: 'tuvok@voyager.com',
        password: 'password',
        teamId: voyager.id
      }),
      sisko = await User.create({
        name: 'sisko',
        email: 'sisko@deepspace9.com',
        password: 'password',
        teamId: deepSpace9.id
      }),
      kira = await User.create({
        name: 'kira',
        email: 'kira@deepspace9.com',
        password: 'password',
        teamId: deepSpace9.id
      }),
      odo = await User.create({
        name: 'odo',
        email: 'odo@deepspace9.com',
        password: 'password',
        teamId: deepSpace9.id
      })
    })
    .then(() => {
      return Promise.all([
        Captain.create({ userId: picard.id, teamId: enterprise.id }),
        Captain.create({ userId: janeway.id, teamId: voyager.id }),
        Captain.create({ userId: sisko.id, teamId: deepSpace9.id })
      ])
    })
    .then(async () => {
      game1 = await Game.create({
        weekNum: 1,
        startTime: moment(),
        endTime: moment().add(3, 'h'),
        teamId: enterprise.id
      }),
      game2 = await Game.create({
        weekNum: 1,
        startTime: moment().subtract(1, 'd'),
        endTime: moment().add(2, 'h'),
        teamId: voyager.id
      }),
      game3 = await Game.create({
        weekNum: 2,
        startTime: moment().subtract(2, 'd'),
        endTime: moment().add(5, 'h'),
        teamId: deepSpace9.id
      })
    })
    .catch(error => console.log(error))
  }





module.exports = {
  syncAndSeed,
  models: {
    User,
    Team,
    Captain,
    Game
  }
}
