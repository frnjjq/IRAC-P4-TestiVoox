var ivoox = require('node-ivoox'),
    request = require('request'),
    fs = require('fs');

console.log("Running - irac-p4-test-ivoox");
var toBeSearched, fileDir, help;

process.argv.forEach(function (val, index, array) {
  if(val === "-i" || val === "--input" ) {
    toBeSearched = array[index+1];
  } else if(val === "-o" || val === "--output") {
    fileDir = array[index+1];
  } else if(val === "-h" || val === "--help") {
    help = true
  }
});

if (help) {
  console.log("irac-p4-test-ivoox Help \n",
              "Parameters are:\n",
              "");
  process.exit();
}

if (!toBeSearched || !fileDir) {
  console.log("Input arguments are not right or missing");
  process.exit();
}

ivoox.podcasts().then(function(data) {
  saveFiles(data, fileDir)
}).catch(function(e) {
  console.error(e);
})

function saveFiles (data, fileDir) {
  data.forEach(function (val, index, array) {
    request(val.imgMain)
      .pipe(fs.createWriteStream(fileDir+val.imgMain.slice(-15)))
      .on('close', function () {
        console.log('Downloaded:', val.imgMain);

      });
  });
}
