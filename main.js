const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const waitOn = require('wait-on');

// Crear la ventana nueva
let mainWindow;
let nextServer;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            //preload: path.join(__dirname, '')
        }
    });
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('close', () => {
        //stopNextServer();
    });
};

// Crea el servidor de next
async function startNextServer() {
    nextServer = exec("npm run start", (error, stdout, stderr) => {
        if( error ){
            console.log(error);
            return;
        };
        console.log('Salida:',stdout);
    });
    
    try{
        await waitOn({
            resources: ['http://localhost:3000'],
            timeout: 10000
        });
    }
    catch(error){
        console.log(error.message);
    };
};


// Detener el servidor
function stopNextServer(){
    exec("npm run stop", (error, stdout, stderr) => {
        if( error ){
            console.log('Error al detener el servidor', error);
            return;
        };
        console.log(stdout);
        console.log('Hace algo de exec'); 
    });
}

// Iniciar la aplicacion
app.on('ready', async () => {
    await startNextServer();
    createWindow();
});

// Cerrar la aplicacion
app.on('window-all-closed', () => {
    if( process.platform !== 'darwin' ){
        app.quit()
        nextServer.kill();
        stopNextServer();
    };
});