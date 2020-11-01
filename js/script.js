toastr.options = {
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

function CopyOutputE() {
  copy(document.getElementById("EN-Output").value);
  
}

function CopyOutputD() {
  copy(document.getElementById("DE-Output").value);

}
function copy(text) {
  if(text.length < 1){
    toastr.error('There is nothing to copy ');
    return
  }
  var input = document.createElement('input');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  toastr.success('Copied successfully');
  return result;
}

function DPKEY() {
  if (document.getElementById('DE-PK').value.length == 120) {
    window.decryptPK();
  } else {
    toastr.error('Error : The Encrypted PrivateKey is not 120 length');
  }


}

function ENPKEY() {
  if (document.getElementById('EN-PK').value.length == 64) {
    window.encryptPK();
  } else {
    toastr.error('Error : PrivateKey is not 64 length');
  }
}










