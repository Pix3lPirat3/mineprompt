const fs = require('fs');
let settings_file = `${__dirname}/../internal/settings.json`;

var settings = require(settings_file);

function saveSettings() {
    try {
        fs.writeFileSync(settings_file, JSON.stringify(settings), 'utf8');
    } catch(e) {
        console.log('Unable to save the settings file:', e)
    }
}