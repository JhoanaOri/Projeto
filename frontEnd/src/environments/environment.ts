var protocolo = window.location.protocol == 'http:' ? 'http://' : 'https://';

export const environment = {
    production: true,
    urlAPI: protocolo + window.location.hostname + ':8080/',
    logLevel: 'Error',
    dateFormat: 'DD/MM/YYYY'
};