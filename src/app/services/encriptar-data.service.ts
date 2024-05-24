import { Injectable } from '@angular/core';
import AES256 from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root'
})
export class EncriptarDataService {
private tokenFromUI = '123456$#@$^@1ERF';
encrypted: any= '';
decrypted: string;
  constructor() { }

  encryptDataAES256(username:string, password:string ): any {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let userData = { username: username, password: password };
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(userData), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
   return this.encrypted = encrypted.toString();
  }
  //dezconosco cuando se necesita este metodo
  decryptDataAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    this.decrypted = CryptoJS.AES.decrypt(
      this.encrypted, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }
  //  derivacionDeClaveBasadaEnContraseña = async (contraseña, sal, iteraciones, longitud, hash, algoritmo = 'AES-CBC') => {
  //   const encoder = new TextEncoder();
  //   let keyMaterial = await window.crypto.subtle.importKey(
  //     'raw',
  //     encoder.encode(contraseña),
  //     { name: 'PBKDF2' },
  //     false,
  //     ['deriveKey']
  //   );
  //   return await window.crypto.subtle.deriveKey(
  //     {
  //       name: 'PBKDF2',
  //       salt: encoder.encode(sal),
  //       iterations: iteraciones,
  //       hash
  //     },
  //     keyMaterial,
  //     { name: algoritmo, length: longitud },
  //     false,
  //     ['encrypt', 'decrypt']
  //   );
  // }
}
