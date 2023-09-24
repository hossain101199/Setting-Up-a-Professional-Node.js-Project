import app from './app';
import config from './config/index';

const main = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
