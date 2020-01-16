# SART (San Andreas Reset Tool) DEPRECATED
Simple command line application to reset the Grand Theft Auto: San Andreas process.

## Getting Started
1. Download the latest release of this app and put it inside the root directory of Grand Theft Auto: San Andreas
2. Run `sart.exe`
3. Done, enjoy! :)

## How it works
This application monitors each key you press on your keyboard, if you press `]` then it will do the following:

- Get the currently running `gta-sa.exe` / `gta_sa.exe` process and kill it.
- Check the parent directory for an executable with the same name as the killed process and launch it.
