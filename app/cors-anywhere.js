import cors_proxy from 'cors-anywhere';

// Imposta l'host e la porta
const host = 'localhost';
const port = 8080;

// Avvia il server CORS Anywhere
cors_proxy.createServer({
    originWhitelist: [], // Lascia vuoto per permettere tutte le origini
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, () => {
    console.log(`CORS Anywhere server is running on ${host}:${port}`);
});
