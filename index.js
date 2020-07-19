const fs = require('fs');

function log() {
    console.info.apply(null, ['[BIT REVERSER]', ...arguments]);
}

function printUsage() {
    log('Usage: ./simple-bit-reverser [file]');
}


if (process.argv.length !== 3) {
    printUsage();
    process.exit(1);
}

log('Starting to reverse bits in `', process.argv[2], '` outputting to', process.argv[2] + '.out');
let newInfo = [];

try {
    let info = fs.readFileSync(process.argv[2]);
    info = new Uint8Array(info);

    info.forEach((item, i) => {
        const bits = [
            item & 0b00000001,
            item & 0b00000010,
            item & 0b00000100,
            item & 0b00001000,
            item & 0b00010000,
            item & 0b00100000,
            item & 0b01000000,
            item & 0b10000000
        ];

        const reversedBits = [
            bits[0] << 7,
            bits[1] << 5,
            bits[2] << 3,
            bits[3] << 1,
            bits[4] >> 1,
            bits[5] >> 3,
            bits[6] >> 5,
            bits[7] >> 7
        ];
        newInfo.push(reversedBits.reduce((prev, curr) => prev + curr));
        // console.info(info[i].toString(2).padStart(8, '0'), newInfo[i].toString(2).padStart(8, '0'));
    });

    
    // console.info('input', info.map(item => item.toString(2)));
    // console.info('output', newInfo.map(item => item.toString(2)));

    fs.writeFileSync(process.argv[2] + '.out', Buffer.from(newInfo));

    log('Done! See ' + process.argv[2] + '.out');

} catch(e) {
    log('FAILED OPENING FILE', e);
}

