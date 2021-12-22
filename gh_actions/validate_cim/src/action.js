require('dotenv').config();
const core = require('@actions/core');
const fs = require('fs');

async function run() {
    // const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    // const TENOR_TOKEN = core.getInput('TENOR_TOKEN') || process.env.TENOR_TOKEN;
    // const message = core.getInput('message') || 'Thank you!';
    // const searchTerm = core.getInput('searchTerm') || 'thank you';

    // if ( typeof TENOR_TOKEN !== 'string' ) {
    //   throw new Error('Invalid TENOR_TOKEN: did you forget to set it in your action config?');
    // }

    // if ( typeof GITHUB_TOKEN !== 'string' ) {
    //   throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
    // }

    // const randomPos = Math.round(Math.random() * 1000);
    // const url = `https://api.tenor.com/v1/search?q=${encodeURIComponent(searchTerm)}&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high`

    // console.log(`Searching Tenor: ${url}`)

    // const response = await fetch(`${url}&key=${TENOR_TOKEN}`);
    // const { results } = await response.json();
    // const gifUrl = results[0].media[0].tinygif.url;

    // console.log(`Found gif from Tenor: ${gifUrl}`);

    // const { context = {} } = github;
    // const { pull_request } = context.payload;

    // if ( !pull_request ) {
    //   throw new Error('Could not find pull request!')
    // };

    // console.log(`Found pull request: ${pull_request.number}`);

    // const octokit = github.getOctokit(GITHUB_TOKEN)

    // await octokit.issues.createComment({
    //   ...context.repo,
    //   issue_number: pull_request.number,
    //   body: `${message}\n\n<img src="${gifUrl}" alt="${searchTerm}" />`
    // });
    console.log('Az3rinaaaaaaaaaaaaa33333333333333');
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