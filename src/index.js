import iohook from 'iohook';
import path from 'path';
import fs from 'fs';
import Game, {executables} from './game';
import pjson from '../package.json';

const hotkey = ']';
const hotkeyCode = hotkey.charCodeAt(0);

let output = () => {
    console.clear();
    console.log('SAN ANDREAS RESET TOOL' + pjson.version
            + '\n\nQuick reset tool for GTA San Andreas.'
            + '\n\ninfo:'
            + '\n\tGTA SA Install Path: ' + Game.getPath()
            + '\n\nControls:'
            + '\n\tReset Game: \'' + hotkey + '\''
            + '\n\tExit: \'Ctrl + C\' (focus this window)');
};

output();

// Check for executables
let found = false;
for(let exe in executables) {
    if(fs.existsSync(path.resolve(Game.getPath(), exe))) {
        found = true;
    }
}


let pressed = false;

if(!found) {
    pressed = true;
    console.log('\n\nERROR: Could not find ' + executables.join()
            + '\nPlease ensure this apps folder is placed in the root of the San Andreas directory.'
            + '\nThis app will now stop...');
    setTimeout(() => {
        process.exit();
    }, 5000);
}

iohook.on('keypress', async e => {
    if(pressed || e.keychar !== hotkeyCode) {
        return;
    }
    pressed = true;
    console.log('\nResetting...');
    let exe = await Game.stop();
    if(exe !== false) {
        Game.start(exe);
    }
    pressed = false;
    output();
});

iohook.start();