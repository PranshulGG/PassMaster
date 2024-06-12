const copyPasswordBtn = document.getElementById('copy_password_btn');
const getClearBoardTime = localStorage.getItem('ClearClipboardTimeOut');
const getClearClipBoardOn = localStorage.getItem('isClearClipboardOn');

function copyPassword() {
    var copyText = document.getElementById("password_result_input").value;
    const password = document.getElementById('password_result_input').value;


    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);


        ShowSnack('Password copied', 3000, 3, 'fixed', 'tab-content-0', 'no-up')
        addPasswordToHistory(password);


        if(getClearClipBoardOn === 'true'){
            setTimeout(() =>{
                sendThemeToAndroid('clearClipboard')
            }, getClearBoardTime);
        }




    

        addPasswordToHistory(password);


}

if(copyPasswordBtn){
copyPasswordBtn.addEventListener('click', copyPassword);
}

const passlength = document.getElementById('pass_length_slider');
const lengthValueText = document.getElementById('value_pass_length');


if(passlength){
passlength.addEventListener('input', () =>{

    lengthValueText.innerHTML = passlength.value;;
})
}

function generatePassword() {
    const length = document.getElementById('pass_length_slider').value;
    const includeUppercase = document.getElementById('uppercase').selected;
    const includeLowercase = document.getElementById('lowercase').selected;
    const includeNumbers = document.getElementById('numbers').selected;
    const includeSpecial = document.getElementById('special').selected;
    
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}<>?';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSpecial) charPool += specialChars;

    if (charPool === '') {
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    document.getElementById('password_result_input').value = password;
    evaluateStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSpecial);

 
}

function evaluateStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSpecial) {
    let strength = 0;

    if (includeUppercase) strength += 0.25;
    if (includeLowercase) strength += 0.25;
    if (includeNumbers) strength += 0.25;
    if (includeSpecial) strength += 0.25;

    if (length >= 24) {
        strength = Math.min(strength + 0.25, 1);
    } else if (length >= 16) {
        strength = Math.min(strength + 0.15, 1);

    } else if (length >= 12) {
        strength = Math.min(strength + 0.10, 1);

    }

    const progressBar = document.getElementById('passwordStrength');
    progressBar.setAttribute('value', strength.toFixed(2));



    if (progressBar.value >= 0.75) {
        progressBar.style = '--md-linear-progress-active-indicator-color: var(--high);'
    } else if (progressBar.value >= 0.5) {
        progressBar.style = '--md-linear-progress-active-indicator-color: var(--mid);'
    } else {
        progressBar.style = '--md-linear-progress-active-indicator-color: var(--low);'
    }
    
 
}


function validateSwitches() {
    const swiches = document.querySelectorAll('md-switch[aria-label="controls"]');
    const checkedSwitches = Array.from(swiches).filter(switche => switche.selected);
    
    if (checkedSwitches.length === 1) {
        checkedSwitches[0].disabled = true;
    } else {
        swiches.forEach(switche => switche.disabled = false);
    }
}

validateSwitches()


function addPasswordToHistory(password) {
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    if (!history.includes(password)) {
        history.push(password);
        localStorage.setItem('passwordHistory', JSON.stringify(history));
        loadHistory();
    }
    document.getElementById('mark_2').hidden = true;
}



function loadHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];

    if (history.length === 0) {
        document.getElementById('mark_2').hidden = false;
        return;
    }

    history.forEach((password, index) => {
        const historyElement = document.createElement('div');
        historyElement.className = 'history-container';
        
        const passwordElement = document.createElement('div');
        passwordElement.className = 'password';
        passwordElement.textContent = password;
        
        const copyButton = document.createElement('md-icon-button');
        const copyBtnIcon = document.createElement('md-icon');
        copyBtnIcon.setAttribute('icon-outlined', '')
        copyBtnIcon.textContent = 'content_copy';
        copyButton.appendChild(copyBtnIcon)
        copyButton.onclick = () => copyToClipboard(password);

        const deleteButton = document.createElement('md-icon-button');
        const deleteBtnIcon = document.createElement('md-icon');
        deleteBtnIcon.setAttribute('icon-outlined', '')

        deleteBtnIcon.textContent = 'delete';
        deleteButton.appendChild(deleteBtnIcon)

        deleteButton.onclick = () => deletePassword(index);

        historyElement.appendChild(passwordElement);
        historyElement.appendChild(copyButton);
        historyElement.appendChild(deleteButton);
        
        historyContainer.appendChild(historyElement);
    });
}



function copyToClipboard(password) {
    const textArea = document.createElement("textarea");
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    ShowSnack('Password copied', 3000, 3, 'fixed', 'tab-content-1', 'no-up')
    console.log('Password copied to clipboard using fallback method');

    if(getClearClipBoardOn === 'true'){
        setTimeout(() =>{
            sendThemeToAndroid('clearClipboard')
        }, getClearBoardTime );
    }
}


function deletePassword(index) {
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('passwordHistory', JSON.stringify(history));
    loadHistory();
    ShowSnack('Password deleted', 3000, 3, 'fixed', 'tab-content-1', 'no-up')

    if (history.length === 0) {
        document.getElementById('mark_2').hidden = false;
        return;
    }

}


loadHistory();




const visibilityEnterPassInput = document.getElementById('visibility_enterPassInput');
const enterPasswordVerify = document.getElementById('enterPasswordVerify');
const VerifyPassCancelBtn = document.getElementById('VerifyPassCancelBtn');
const VerifyPassBtn = document.getElementById('VerifyPassBtn');
const EnterVerifyPasswordDialog = document.getElementById('enter_password_dialog');

visibilityEnterPassInput.addEventListener('click', () =>{
    if(visibilityEnterPassInput.selected){
        enterPasswordVerify.setAttribute('type', 'text')
        enterPasswordVerify.focus()
    } else{
        enterPasswordVerify.setAttribute('type', 'password')
        enterPasswordVerify.focus()

    }
});

enterPasswordVerify.addEventListener('input', () =>{
    enterPasswordVerify.error = false;

});

VerifyPassCancelBtn.addEventListener('click', () =>{
    EnterVerifyPasswordDialog.close();

  
});

EnterVerifyPasswordDialog.addEventListener('open', () =>{
    dialogcolor();;
});




EnterVerifyPasswordDialog.addEventListener('close', () =>{
    checkTHEME();
    enterPasswordVerify.value = ''

    if(visibilityEnterPassInput.selected){
        visibilityEnterPassInput.selected = false;
        enterPasswordVerify.setAttribute('type', 'password')
    }



});



function togglePasswordTypeChips(element) {
    if (element.selected) {
    var passChips = document.getElementsByName('PassWordType');
    passChips.forEach((passChip) => {
        if (passChip !== element) {
            passChip.selected = false;
        }
      
    });
    } else{
        element.selected = true;
    }

    if(document.querySelector('[value="4-digit"]').selected){
        localStorage.setItem('PasswordTypeLength', '4-digit-length')
    } else{
        localStorage.setItem('PasswordTypeLength', '8-digit-length')
    }
} 




const createPassInput_1 = document.getElementById('createPassInput_1');
const nextCreatePassBtn = document.getElementById('nextCreatePassBtn')
const confirmPassInput_2 = document.getElementById('confirmPassInput_2');
const confirmSetBtn = document.getElementById('confirmSetBtn');
const BackBTNPassword = document.getElementById('BackBTNPassword');
const createLoginPasswordDialog = document.getElementById('createLoginPasswordDialog');

function setPasswordType(value){
    if(value === '4-digits'){
        createPassInput_1.setAttribute('maxlength', '4')
        confirmPassInput_2.setAttribute('maxlength', '4')

        createPassInput_1.value = ''
        nextCreatePassBtn.disabled = true;
    } else{
        createPassInput_1.setAttribute('maxlength', '8')
        confirmPassInput_2.setAttribute('maxlength', '8')

        createPassInput_1.value = ''
        nextCreatePassBtn.disabled = true;

    }
}

function checkValidCreatePass_1() {
    if(document.querySelector('[value="4-digit"]').selected){
    if (createPassInput_1.value.trim().length < 4){
        nextCreatePassBtn.disabled = true;
    } else {
        nextCreatePassBtn.disabled = false;
    }
} else{
    if (createPassInput_1.value.trim().length < 8){
        nextCreatePassBtn.disabled = true;
    } else {
        nextCreatePassBtn.disabled = false;
    }
}
}


if(createPassInput_1){
createPassInput_1.addEventListener('input', checkValidCreatePass_1)}


if (!localStorage.getItem('PasswordTypeLength')) {
    localStorage.setItem('PasswordTypeLength', '4-digit-length')

} else if(localStorage.getItem('PasswordTypeLength') === '4-digit-length'){
    document.querySelector('[value="4-digit"]').selected = true;
} else{
    document.querySelector('[value="4-digit"]').selected = false;
    document.querySelector('[value="8-digit"]').selected = true;

    setPasswordType('8-digit')
}

nextCreatePassBtn.addEventListener('click', () =>{
    createPassInput_1.hidden = true;
    confirmPassInput_2.hidden = false;
    document.getElementById('password_type_chips').hidden = true;
    nextCreatePassBtn.hidden = true
    confirmSetBtn.hidden = false
    confirmSetBtn.disabled = true;
    BackBTNPassword.hidden = false;;
    localStorage.setItem('TempPass', createPassInput_1.value);

});

BackBTNPassword.addEventListener('click', () =>{
    createPassInput_1.hidden = false;
    confirmPassInput_2.hidden = true;
    document.getElementById('password_type_chips').hidden = false;
    nextCreatePassBtn.hidden = false
    confirmSetBtn.hidden = true
    BackBTNPassword.hidden = true;;
});

createLoginPasswordDialog.addEventListener('cancel', () =>{
    if(createLoginPasswordDialog.open){
        setTimeout(() => {
        createLoginPasswordDialog.show()
        }, 300);
    }
});

createLoginPasswordDialog.addEventListener('open', () =>{
    dialogcolor();
});






createLoginPasswordDialog.addEventListener('close', () =>{
    checkTHEME();
});


function checkValidConfirmPass_2() {
    if(document.querySelector('[value="4-digit"]').selected){
    if (confirmPassInput_2.value.trim().length < 4){
        confirmSetBtn.disabled = true;
    } else {
        confirmSetBtn.disabled = false;
    }
} else{
    if (confirmPassInput_2.value.trim().length < 8){
        confirmSetBtn.disabled = true;
    } else {
        confirmSetBtn.disabled = false;
    }
}
}



confirmPassInput_2.addEventListener('input', checkValidConfirmPass_2)


confirmSetBtn.addEventListener('click', () =>{
    var TempstoredValue = localStorage.getItem('TempPass');
    
    if (confirmPassInput_2.value !== TempstoredValue) {
        confirmPassInput_2.error = true;
    document.getElementById('error_icon_confirm_pass').hidden = false;

    } else {
        localStorage.setItem('MainPass', confirmPassInput_2.value);
        ShowSnack('Password saved', 3000, 3, 'fixed', 'tab-content-0', 'no-up')
        createLoginPasswordDialog.close()

        setTimeout(() =>{
            localStorage.removeItem('TempPass');
            confirmPassInput_2.value = ''
            createPassInput_1.value = ''
        }, 1000);
    }

});

confirmPassInput_2.addEventListener('input', () =>{
    confirmPassInput_2.error = false;
    document.getElementById('error_icon_confirm_pass').hidden = true;
});




const getPasswordLengthType = localStorage.getItem('PasswordTypeLength');

if(getPasswordLengthType === '4-digit-length'){
    enterPasswordVerify.setAttribute('maxlength', '4')
} else{
    enterPasswordVerify.setAttribute('maxlength', '8')

}

 
// function previewImage() {
//     var preview = document.getElementById('yourOwnIconImg');
//     var file    = document.getElementById('select_your_own').files[0];
//     var reader  = new FileReader();

//     reader.onloadend = function () {
//         preview.src = reader.result;
//         document.getElementById('yourOwnIconValue').value = reader.result;
//     }

//     if (file) {
//         reader.readAsDataURL(file);
//         document.getElementById('yourOwnIconValue').checked = true;

//     } else {
//         preview.src = "brand-icons/your_own_add.svg";
//     }
// }





function handleMediaQueryChange(event) {
    if (event.matches) {
        createLoginPasswordDialog.close()
        
    } else {
        if (!localStorage.getItem('MainPass')) {
            setTimeout(() =>{
                createLoginPasswordDialog.show()
               
            }, 500);
        
        }
    }
}

// Create a MediaQueryList object
const mediaQueryList = window.matchMedia('(min-width: 600px)');


mediaQueryList.addEventListener('change', handleMediaQueryChange);
handleMediaQueryChange(mediaQueryList);


if(copyPasswordBtn){
    generatePassword()
}