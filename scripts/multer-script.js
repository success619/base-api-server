const fs = require("fs");

const analyseMulterStorageDestination = (path) => {
  let structuredPath = path.toString();
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  return structuredPath;
};

module.exports = {
  analyseMulterStorageDestination,
};
