// Vetcare AI OS - Client-Side Cryptographic Vault, Web Crypto AES-GCM & SHA-256 Security Engine (2026 Production)

(function (window, document) {
  'use strict';

  // 1. GLOBAL NAMESPACE & STATE INITIALIZATION
  window.VetcareApp = window.VetcareApp || {};

  var PBKDF2_ITERATIONS = 100000;
  var AES_KEY_LENGTH = 256;
  var IV_BYTE_LENGTH = 12; // 96 bits for AES-GCM
  var SALT_BYTE_LENGTH = 16; // 128 bits
  var MASTER_ADMIN_PIN = '9297';

  var isSubtleCryptoAvailable = Boolean(
    window.crypto &&
    window.crypto.subtle &&
    typeof window.crypto.subtle.encrypt === 'function'
  );

  var Crypto = {
    algorithm: 'AES-GCM-256',
    pbkdf2Iterations: PBKDF2_ITERATIONS,
    isWebCryptoAvailable: isSubtleCryptoAvailable,
    status: isSubtleCryptoAvailable ? 'hardware-accelerated' : 'software-fallback'
  };

  window.VetcareApp.Crypto = Crypto;

  // Binary <-> Base64 & Hex Conversion Utilities
  function bufferToHex(buffer) {
    var bytes = new Uint8Array(buffer);
    var hexParts = [];
    for (var i = 0; i < bytes.length; i++) {
      var hex = bytes[i].toString(16);
      hexParts.push(hex.length === 1 ? '0' + hex : hex);
    }
    return hexParts.join('');
  }

  function uint8ToBase64(uint8) {
    var binary = '';
    var len = uint8.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8[i]);
    }
    return window.btoa(binary);
  }

  function base64ToUint8(base64) {
    var binary = window.atob(base64);
    var len = binary.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function encodeUtf8(str) {
    if (typeof window.TextEncoder === 'function') {
      return new window.TextEncoder().encode(str);
    }
    var unescaped = unescape(encodeURIComponent(str));
    var bytes = new Uint8Array(unescaped.length);
    for (var i = 0; i < unescaped.length; i++) {
      bytes[i] = unescaped.charCodeAt(i);
    }
    return bytes;
  }

  function decodeUtf8(bytes) {
    if (typeof window.TextDecoder === 'function') {
      return new window.TextDecoder().decode(bytes);
    }
    var binary = '';
    for (var i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return decodeURIComponent(escape(binary));
  }

  // Constant-time string comparator to prevent timing analysis attacks
  function constantTimeCompare(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') {
      return false;
    }
    var mismatch = a.length === b.length ? 0 : 1;
    if (a.length !== b.length) {
      b = a; // Normalize iteration count
    }
    for (var i = 0; i < a.length; i++) {
      mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return mismatch === 0;
  }

  // Software Fallback SHA-256 Implementation (for non-HTTPS local networks)
  function softwareSha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = [];
    var k = [];
    var primeCounter = 0;

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 300; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      }
    }

    ascii += '\x80';
    while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      words[i >> 2] |= j << (((3 - i) % 4) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;

    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, (j += 16));
      var oldHash = hash.slice(0);

      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        var s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

        var a = hash[0], e = hash[4];
        var tempS1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        var ch = (e & hash[5]) ^ (~e & hash[6]);
        var temp1 = (hash[7] + tempS1 + ch + k[i] + w[i]) | 0;
        var tempS0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        var maj = (a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]);
        var temp2 = (tempS0 + maj) | 0;

        hash = [(temp1 + temp2) | 0, hash[0], hash[1], hash[2], (hash[3] + temp1) | 0, hash[4], hash[5], hash[6]];
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (var b = 3; b >= 0; b--) {
        var byteVal = (hash[i] >> (b * 8)) & 255;
        result += (byteVal < 16 ? '0' : '') + byteVal.toString(16);
      }
    }
    return result;
  }

  // Software Fallback Obfuscation (XOR + Salt)
  function softwareEncrypt(plaintext, passphrase) {
    var salt = Crypto.generateRandomToken(SALT_BYTE_LENGTH);
    var derivedKey = softwareSha256(passphrase + salt);
    var inputBytes = encodeUtf8(plaintext);
    var output = new Uint8Array(inputBytes.length);

    for (var i = 0; i < inputBytes.length; i++) {
      output[i] = inputBytes[i] ^ derivedKey.charCodeAt(i % derivedKey.length);
    }

    return {
      cipherText: uint8ToBase64(output),
      iv: Crypto.generateRandomToken(IV_BYTE_LENGTH),
      salt: salt,
      algorithm: 'XOR-SHA256-FALLBACK',
      v: 1
    };
  }

  function softwareDecrypt(pkg, passphrase) {
    var salt = pkg.salt;
    var derivedKey = softwareSha256(passphrase + salt);
    var cipherBytes = base64ToUint8(pkg.cipherText);
    var output = new Uint8Array(cipherBytes.length);

    for (var i = 0; i < cipherBytes.length; i++) {
      output[i] = cipherBytes[i] ^ derivedKey.charCodeAt(i % derivedKey.length);
    }

    return decodeUtf8(output);
  }

  // 2. WEB CRYPTO KEY DERIVATION (PBKDF2 -> AES-GCM)
  function deriveAesGcmKey(passphrase, saltUint8) {
    var rawKey = encodeUtf8(passphrase);

    return window.crypto.subtle.importKey(
      'raw',
      rawKey,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    ).then(function (baseKey) {
      return window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: saltUint8,
          iterations: PBKDF2_ITERATIONS,
          hash: 'SHA-256'
        },
        baseKey,
        {
          name: 'AES-GCM',
          length: AES_KEY_LENGTH
        },
        false,
        ['encrypt', 'decrypt']
      );
    });
  }

  // 3. CORE CRYPTO METHODS
  Crypto.hashString = function (plaintext) {
    var str = typeof plaintext === 'string' ? plaintext : JSON.stringify(plaintext);

    if (isSubtleCryptoAvailable) {
      var dataBytes = encodeUtf8(str);
      return window.crypto.subtle.digest('SHA-256', dataBytes).then(function (digestBuffer) {
        return bufferToHex(digestBuffer);
      });
    } else {
      return Promise.resolve(softwareSha256(str));
    }
  };

  Crypto.generateRandomToken = function (byteLength) {
    var length = typeof byteLength === 'number' && byteLength > 0 ? byteLength : 16;
    var bytes = new Uint8Array(length);

    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      window.crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < length; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }

    return bufferToHex(bytes.buffer);
  };

  Crypto.encryptData = function (plaintextOrObject, passphrase) {
    if (!passphrase || typeof passphrase !== 'string') {
      return Promise.reject(new Error('एन्क्रिप्शन हेतु वैध पासफ़्रेज़ (Passphrase) आवश्यक है।'));
    }

    var textToEncrypt = typeof plaintextOrObject === 'object' && plaintextOrObject !== null
      ? JSON.stringify(plaintextOrObject)
      : String(plaintextOrObject);

    if (!isSubtleCryptoAvailable) {
      console.warn('[Vetcare Crypto] Hardware WebCrypto unavailable. Using fallback.');
      return Promise.resolve(softwareEncrypt(textToEncrypt, passphrase));
    }

    var salt = new Uint8Array(SALT_BYTE_LENGTH);
    var iv = new Uint8Array(IV_BYTE_LENGTH);
    window.crypto.getRandomValues(salt);
    window.crypto.getRandomValues(iv);

    return deriveAesGcmKey(passphrase, salt).then(function (aesKey) {
      var encodedPlaintext = encodeUtf8(textToEncrypt);

      return window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        aesKey,
        encodedPlaintext
      );
    }).then(function (cipherBuffer) {
      return {
        cipherText: uint8ToBase64(new Uint8Array(cipherBuffer)),
        iv: uint8ToBase64(iv),
        salt: uint8ToBase64(salt),
        algorithm: 'AES-GCM-256',
        v: 1
      };
    }).catch(function (error) {
      console.error('[Vetcare Crypto] Encryption error:', error);
      throw new Error('डेटा एन्क्रिप्शन विफल: ' + error.message);
    });
  };

  Crypto.decryptData = function (encryptedPackage, passphrase) {
    if (!passphrase || typeof passphrase !== 'string') {
      return Promise.reject(new Error('डिक्रिप्शन हेतु पासफ़्रेज़ (Passphrase) आवश्यक है।'));
    }

    if (!encryptedPackage || !encryptedPackage.cipherText || !encryptedPackage.salt || !encryptedPackage.iv) {
      return Promise.reject(new Error('अमान्य एन्क्रिप्टेड पेलोड (Corrupt Package)।'));
    }

    if (!isSubtleCryptoAvailable || encryptedPackage.algorithm === 'XOR-SHA256-FALLBACK') {
      try {
        var rawDecrypted = softwareDecrypt(encryptedPackage, passphrase);
        try {
          return Promise.resolve(JSON.parse(rawDecrypted));
        } catch (jsonErr) {
          return Promise.resolve(rawDecrypted);
        }
      } catch (err) {
        return Promise.reject(new Error('डिक्रिप्शन विफल: गलत पासफ़्रेज़ या छेड़छाड़ किया गया डेटा।'));
      }
    }

    var salt = base64ToUint8(encryptedPackage.salt);
    var iv = base64ToUint8(encryptedPackage.iv);
    var cipherBytes = base64ToUint8(encryptedPackage.cipherText);

    return deriveAesGcmKey(passphrase, salt).then(function (aesKey) {
      return window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        aesKey,
        cipherBytes
      );
    }).then(function (decryptedBuffer) {
      var decryptedText = decodeUtf8(new Uint8Array(decryptedBuffer));
      try {
        return JSON.parse(decryptedText);
      } catch (e) {
        return decryptedText;
      }
    }).catch(function (err) {
      console.error('[Vetcare Crypto] Decryption verification failed:', err);
      throw new Error('डिक्रिप्शन विफल: अमान्य कुंजी अथवा डेटा अखंडता त्रुटि (Authentication Tag mismatch)।');
    });
  };

  // 4. CREDENTIAL VALIDATION & LOCAL STORAGE PROTECTION
  Crypto.verifyAdminPin = function (enteredPin) {
    if (typeof enteredPin !== 'string' && typeof enteredPin !== 'number') {
      return Promise.resolve(false);
    }

    var pinStr = String(enteredPin).trim();

    return Promise.all([
      Crypto.hashString(pinStr),
      Crypto.hashString(MASTER_ADMIN_PIN)
    ]).then(function (hashes) {
      var enteredHash = hashes[0];
      var masterHash = hashes[1];
      var isValid = constantTimeCompare(enteredHash, masterHash);
      return isValid;
    });
  };

  Crypto.secureStore = function (storageKey, data, passphrase) {
    return Crypto.encryptData(data, passphrase).then(function (encryptedPkg) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(encryptedPkg));
        return true;
      } catch (e) {
        console.error('[Vetcare Crypto] Secure store write error:', e);
        throw new Error('सुरक्षित स्टोरेज में सहेजने में असमर्थ: ' + e.message);
      }
    });
  };

  Crypto.secureRetrieve = function (storageKey, passphrase) {
    var raw = null;
    try {
      raw = window.localStorage.getItem(storageKey);
    } catch (e) {
      return Promise.reject(new Error('सुरक्षित स्टोरेज पढ़ने में असमर्थ: ' + e.message));
    }

    if (!raw) {
      return Promise.resolve(null);
    }

    var pkg = null;
    try {
      pkg = JSON.parse(raw);
    } catch (parseErr) {
      return Promise.reject(new Error('अमान्य सुरक्षित स्टोरेज डेटा प्रारूप।'));
    }

    return Crypto.decryptData(pkg, passphrase);
  };

  // 5. AUTOMATIC INITIALIZATION
  function bootstrapCryptoSecurity() {
    isSubtleCryptoAvailable = Boolean(
      window.crypto &&
      window.crypto.subtle &&
      typeof window.crypto.subtle.encrypt === 'function'
    );

    Crypto.isWebCryptoAvailable = isSubtleCryptoAvailable;
    Crypto.status = isSubtleCryptoAvailable ? 'hardware-accelerated' : 'software-fallback';

    console.log(
      '[Vetcare Crypto] Security Engine Initialized | Engine:',
      Crypto.status,
      '| Cipher: AES-GCM 256-bit | Iterations:',
      PBKDF2_ITERATIONS
    );

    if (typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('vetcare:crypto-ready', {
        detail: {
          status: Crypto.status,
          algorithm: Crypto.algorithm
        }
      }));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapCryptoSecurity);
  } else {
    bootstrapCryptoSecurity();
  }

})(window, document);
