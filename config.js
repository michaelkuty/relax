var rc = require('rc');

module.exports = rc('relax', {
  host: "10.10.10.122",
  port: 8080,
  devPort: 8181,
  db: {
    uri: 'mongodb://10.10.10.122/relax'
  }
});
