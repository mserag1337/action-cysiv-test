'use strict';

const fs = require('fs');

let originalCIMRawdata = fs.readFileSync('file_1.json');
let originalCIM = JSON.parse(originalCIMRawdata);

let updatedCIMRawdata = fs.readFileSync('file_1.latest.json');
let updatedCIM = JSON.parse(updatedCIMRawdata);

var originalKeys = Object.keys(originalCIM);

for (let i = 0; i < originalKeys.length; i++) {
    const key = originalKeys[i];
    const originalCIMObject = originalCIM[key];
    const updatedCIMObject = updatedCIM[key];
    if (originalCIMObject['data_type'] != updatedCIMObject['data_type']) {
        console.log(`field \'${key}\' changed from \'${originalCIMObject['data_type']}\' to \'${updatedCIMObject['data_type']}\'`)
    }
    if (originalCIMObject['supports_array'] != updatedCIMObject['supports_array']) {
        console.log(`field \'${key}\' changed \'supports_array\' from \'${originalCIMObject['supports_array']}\' to \'${updatedCIMObject['supports_array']}\'`)
    }
}
