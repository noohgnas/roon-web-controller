# Change Log

## Version 1.2.0 (PENDING RELEASE)

## Pre-Release TODO
- Clear bugs
- Regression Testing (actual devices - browser, phone, Raspberry Pi touch screen)
- Pre-Tag/pre-release checklist

### New
- Library Browser
- Search (Library -> Search)
- Added theme button to "Now Playing" screen
- Split "Now Playing" and "Library" into a standalone pages to allow for custom layouts (example side-by-side layout provided, http://localhost:8080/side-by-side.html)

### Upgrade Notes
Due to the use of new Roon APIs, you must remove the old extension authorization and create a new one!

On the Node server:
1. Stop the extension

In an official Roon Client:
1. Go to Settings -> Extensions.
1. Click the "View" button.
1. Remove all previous instances of "Web Controller".

On the Node server:
1. Run `git pull`
1. Run `npm install`
1. Start the extension `node .`

In an official Roon Client:
1. Go to Settings -> Extensions.
1. Click the "Enable" button beside "Web Controller".

------------------
# Release History

## Version 1.1.1

### Fixed Bugs
- Addressed issue that caused icons to be very small on high DPI monitors and devices

## Version 1.1.0

### Install Notes
See the [README.md](README.md) for installation instructions

### Upgrade notes
Please run `npm install` after upgrading due to new dependencies.

### New
- Complete rewrite of UI - now supports both Portrait and Landscape view making it more suitable for phones
- Added new theme based on the dominant color of the cover art
- Added volume controls
- Added controls for Loop, Shuffle, and Auto Radio
- Added a check to see if the extension is enabled
- Added visual feedback when clicking overlay buttons
- Switching zones is now much more responsive
- Depreciated the "Light" and "Cover Light" themes

### Implemented Feature Requests
- Added config file for server settings (config/local.json).  The example file `config/local.conf.EXAMPLE` shows usage and is tracked by `git`.  The `config/local.conf` is not tracked by `git` so that local settings will not be clobbered by `git pull`.
- Added command line options for help and to set the server port (`node app.js -h` for usage).

### Fixed Bugs
- After switching a zone, the zone_id did not update for the controls. This could lead to controlling the previous zone with the new zone's controls.
- Tweaked jquery.simplemarquee.js to use "span" instead of "div". Caused problems with CSS layouts.
- Rewrote zone message parser to handle multiple events per message.  Caused problems with zone list improperly reflecting grouped and ungrouped zones. Likely root cause of previously reported problem with repeated listings in Zone Listings.

## Version 1.0.1
- Resolved bug that could result in repeated listings in Zone Listings
- Changed all icons to utilize SVGs from Material Design Icons (https://materialdesignicons.com/)
- Dramactically reduced the number of times the icons were being called and redrawn
- Changed default theme to "Cover Dark"
- Set default icon theme to "Circles"
- Added configuration option to select icons between icons with or without circles
- Miscellaneous aesthetic changes

## Version 1.0.0
- Initial Release
