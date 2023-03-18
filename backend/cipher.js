

export default function encrypt(text1, n = 1, d = 1) {
    let newstr = '';
    let rvtext = text1.split('').reverse().join('');
  
    if (d == 1) {
      for (let i = 0; i < rvtext.length; i++) {
        let newletter = String.fromCharCode(rvtext.charCodeAt(i) + n);
        newstr += newletter;
      }
      return newstr;
    }
  
    if (d == -1) {
      for (let i = 0; i < rvtext.length; i++) {
        let newletter = String.fromCharCode(rvtext.charCodeAt(i) - n);
        newstr += newletter;
      }
      return newstr;
    }
  }
  
export default function decrypt(text1, n = 1, d = 1) {
    let ogtext = '';
    let rvtext = text1.split('').reverse().join('');
  
    if (d == 1) {
      for (let i = 0; i < rvtext.length; i++) {
        let newletter = String.fromCharCode(rvtext.charCodeAt(i) - n);
        ogtext += newletter;
      }
      return ogtext;
    }
  
    if (d == -1) {
      for (let i = 0; i < rvtext.length; i++) {
        let newletter = String.fromCharCode(rvtext.charCodeAt(i) + n);
        ogtext += newletter;
      }
      return ogtext;
    }
  }
  
