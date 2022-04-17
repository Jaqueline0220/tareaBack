const boxen = require('boxen');

const { app } = require('./app');
const { connectDB, env } = require('./config');

const main = async () => {
  const { dBstatus } = await connectDB();
  app.listen(env.port);
  console.log('\n');
  console.log(
    boxen(`PORT: ${env.port}\nNODE_ENV: ${env.env}\nDATA BASE: ${dBstatus}`, {
      title: 'STARTING FAVS 🚀',
      titleAlignment: 'center',
      padding: 1,
      borderStyle: 'bold',
      borderColor: 'green',
    }),
  );
};

main();
