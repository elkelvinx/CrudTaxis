import { Injectable } from '@angular/core';
import AES256 from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
//    import _sodium from 'libsodium-wrappers';
@Injectable({
  providedIn: 'root'
})
export class EncriptarDataService {

private tokenFromUI = '123456$#@$^@1ERF';
encrypted: any= '';
decrypted: string;
  constructor() { }
  encriptarUser(user: string, password: string) {
    
    return AES256.encrypt(user, password).toString();
  }
async encriptarUser2(user: string, password: string) {
  // await _sodium.ready;
  // const sodium = _sodium;
  
  // // Genera una clave y un nonce (número que se usa una sola vez)
  // const key = sodium.crypto_secretbox_keygen();
  // const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

  // // Encripta los datos
  // const encrypted = sodium.crypto_secretbox_easy(`${user}${password}`, nonce, key);

  // // Convierte los datos encriptados y el nonce a Base64 para enviarlos como strings
  // const encryptedBase64 = sodium.to_base64(encrypted);
  // const nonceBase64 = sodium.to_base64(nonce);

  // // Retorna un objeto con los datos encriptados y el nonce
  // return {
  //   encrypted: encryptedBase64,
  //   nonce: nonceBase64
  // };
}


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
  getDecodedAccessToken(token: string): any {
  try {
    // Decodifica la parte del payload del JWT
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (Error) {
    return null;
  }
}
}
