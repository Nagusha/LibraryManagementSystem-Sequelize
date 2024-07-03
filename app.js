sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Unable to create table:', error);
  });
