const ivoox = require('node-ivoox');
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Running - irac-p4-test-ivoox');
var toBeSearched, fileDir;

process.argv.forEach((val, index, array) => {
  if(val === '-i' || val === '--input' ) {
    toBeSearched = array[index+1];
  } else if(val === '-o' || val === '--output') {
    fileDir = array[index+1];
  }
});

if (!toBeSearched || !fileDir) {
  console.log('Input arguments are not right or missing');
  process.exit();
}

ivoox.search(toBeSearched).then((data) => {
  var answer;
  if(data.length > 1) {
    console.log('Your search produced the results:');
    data.forEach((val, index, array) =>{
      console.log('Episode Number :', index, ' ---- ', val.title.slice(13,-17));
    });
    rl.question('Type the episode you want to download ', (answer) => {
      saveAudio(data[answer], fileDir);
      rl.close();
    });
  } else {
    console.log('Only one Podcast matched: ', data[0].title.slice(13,-17));
    saveAudio(data[0], fileDir);
  }
}).catch(function(e) {
  console.error(e);
});

function saveAudio (data, fileDir) {
  console.log('Downloading ->', data.title.slice(13,-17));
    request(data.file)
    .pipe(fs.createWriteStream(fileDir + data.title.slice(13,-17) + '.mp3'))
    .on('close', () =>{
      console.log('Finished downloading');
      console.log('Finished - irac-p4-test-ivoox');
      process.exit();
    });
};
