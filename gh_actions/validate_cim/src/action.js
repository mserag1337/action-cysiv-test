const core = require('@actions/core');
const fs = require('fs');

async function run() {
    console.log('Az3rinaaaaaaaaaaaaa33333333333333');
    console.log(__filename);
    let originalCIMRawdata = fs.readFileSync('file_1.json');
    let originalCIM = JSON.parse(originalCIMRawdata);

    let updatedCIMRawdata = fs.readFileSync('file_1.latest.json');
    let updatedCIM = JSON.parse(updatedCIMRawdata);

    var originalKeys = Object.keys(originalCIM);

    let hasErrors = false;
    let fieldNameErrors = []
    let supportArrayErrors = []
    for (let i = 0; i < originalKeys.length; i++) {
        const key = originalKeys[i];
        const originalCIMObject = originalCIM[key];
        const updatedCIMObject = updatedCIM[key];
        if (originalCIMObject['data_type'] != updatedCIMObject['data_type']) {
            hasErrors = true;
            fieldNameErrors.push(`field \'${key}\' changed from \'${originalCIMObject['data_type']}\' to \'${updatedCIMObject['data_type']}\'`);
        }
        if (originalCIMObject['supports_array'] != updatedCIMObject['supports_array']) {
            hasErrors = true;
            supportArrayErrors.push(`field \'${key}\' changed \'supports_array\' from \'${originalCIMObject['supports_array']}\' to \'${updatedCIMObject['supports_array']}\'`)
        }
    }

    if (hasErrors) {
        core.setFailed(`Action failed with these errors ${fieldNameErrors} / ${supportArrayErrors}`);
    }
}

run().catch(e => core.setFailed(e.message));