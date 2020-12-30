import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api;

/**
 * Exemplos de configurações para a baseURL
 * 
 * iOS com Emulador: localhost
 * iOS com dispositivo físico: IP da máquina
 * Android com Emulador: localhost (comando "adb reverse" no cmd)
 * Android com Emulador: 10.0.2.2 (Somente no Android Studio)
 * Android com Emulador: 10.0.3.2 (Genymotion)
 * SAndroid com dispositivo físico: IP da máquina
 */