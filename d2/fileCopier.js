const fs = require("fs");

console.log("Copy Started");

const readStream =
fs.createReadStream(
  "input.txt"
);

const writeStream =
fs.createWriteStream(
  "output.txt"
);

readStream.on(
  "data",
  () => {

    console.log(
      "Copying..."
    );

  }
);

readStream.on(
  "end",
  () => {

    console.log(
      "Copy Finished"
    );

  }
);

readStream.on(
  "error",
  (err) => {

    console.log(
      "Read Error:",
      err.message
    );

  }
);

writeStream.on(
  "error",
  (err) => {

    console.log(
      "Write Error:",
      err.message
    );

  }
);

readStream.pipe(
  writeStream
);