#!/usr/bin/env node

console.log('Lancement de la solution');
require('child_process').exec(
  'cd ./EnigmaClient && ng serve',
  function (error, stdout) {
    console.log(stdout && 'stdout: ' + stdout);
    if (error !== null) {
      console.log(error);
      process.abort(0);
    }
  }
);

require('child_process').exec(
  'cd ./EnigmaServer && npm run dev',
  function (error, stdout) {
    console.log(stdout && 'stdout: ' + stdout);
    if (error !== null) {
      console.log(error);
      process.abort(0);
    }
  }
);

require('child_process').exec(
  'cd ./EnigmaCertification && npm run dev',
  function (error, stdout) {
    console.log(stdout && 'stdout: ' + stdout);
    if (error !== null) {
      console.log(error);
      process.abort(0);
    }
  }
);