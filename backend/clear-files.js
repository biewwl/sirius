const fs = require('fs-extra');

const pathsToClear = [
  'src/db/files/images',
  'src/db/files/videos',
  'src/db/files/docs',
  'src/db/files/others',
];

pathsToClear.forEach((path) => {
  fs.emptyDirSync(path);
  console.log(`Files in ${path} has been removed.`);
});
