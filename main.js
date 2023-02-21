const { app, BrowserWindow } = require('electron');
const path = require('path');
const sound = require("sound-play");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });

    sound.play(path.join(__dirname, "storage/syst/audio/startup.mp3"));

    mainWindow.setFullScreen(true);
    mainWindow.loadFile(path.join(__dirname,
        'storage/syst/natives/Booter.app/src/views/Index.html'));
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});