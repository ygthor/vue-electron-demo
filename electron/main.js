const { app, BrowserWindow } = require('electron');
const path = require('path');

// Only reload in development
if (!app.isPackaged) {
  require('electron-reload')(__dirname, {
    electron: require(path.join(__dirname, '../node_modules/electron'))
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (!app.isPackaged) {
    // Development: load Vue CLI dev server
    win.loadURL('http://localhost:8080');
  } else {
    // Production: load the built Vue app
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
