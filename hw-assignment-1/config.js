const config = {
  dev: {
    port: 3000
  },
  prod: {
    port: 5000
  }
};

const environment = process.env.NODE_ENV;
const configurations = typeof(config[environment]) !== 'undefined' ? config[environment] : config.dev;

module.exports = configurations;