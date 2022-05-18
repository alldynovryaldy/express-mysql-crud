module.exports = (sequelize, Sequelize) => {
  // name table = posting
  return sequelize.define("posting", {
    title: Sequelize.STRING,
    content: {
      type: Sequelize.STRING
    },
  }, {
    // custom nama table
    freezeTableName: true
  });
};