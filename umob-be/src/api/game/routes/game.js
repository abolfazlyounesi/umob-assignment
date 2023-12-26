module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/game',
     handler: 'game.handleGameData',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
