
const createResetPassword = document.getElementById('createResetPassword');
const oldPasswordInput = document.getElementById('oldPasswordInput');
const NewPasswordInput = document.getElementById('NewPasswordInput');
const ConfirmNewPasswordInput = document.getElementById('ConfirmNewPasswordInput');
const getOldPassword = localStorage.getItem('MainPass')
const changePasswordDialog = document.getElementById('changePasswordDialog');
const cancelChangePassword = document.getElementById('cancelChangePassword');
const changePasswordDialogtoggle = document.getElementById('changePasswordDialogtoggle');

function togglePasswordTypeChipsReset(element) {
    if (element.selected) {
    var passChips = document.getElementsByName('PassWordTypeReset');
    passChips.forEach((passChip) => {
        if (passChip !== element) {
            passChip.selected = false;
        }
      
    });
    } else{
        element.selected = true;
    }

    if(document.querySelector('[value="4-digit-reset"]').selected){
        // localStorage.setItem('PasswordTypeLength', '4-digit-length')
        NewPasswordInput.setAttribute('maxlength', '4');
        ConfirmNewPasswordInput.setAttribute('maxlength', '4');
    } else{
        // localStorage.setItem('PasswordTypeLength', '8-digit-length')
        NewPasswordInput.setAttribute('maxlength', '8');
        ConfirmNewPasswordInput.setAttribute('maxlength', '8');
    }
} 




function ChangePassInputCheck(){
    if (oldPasswordInput.value.trim() === "" || NewPasswordInput.value.trim() === "" || ConfirmNewPasswordInput.value.trim() === ""){
        createResetPassword.disabled = true;
    } else{
        createResetPassword.disabled = false;
    }
}

oldPasswordInput.addEventListener('input', ChangePassInputCheck)
NewPasswordInput.addEventListener('input', ChangePassInputCheck)
ConfirmNewPasswordInput.addEventListener('input', ChangePassInputCheck)

oldPasswordInput.addEventListener('input', () =>{
    oldPasswordInput.error = false;
    document.querySelector('[hidden-icon-old-pass]').hidden = true;
})


NewPasswordInput.addEventListener('input', () =>{
    localStorage.setItem('TempNewPass', NewPasswordInput.value)
});


createResetPassword.addEventListener('click', () =>{
    if(oldPasswordInput.value !== getOldPassword){
        oldPasswordInput.error = true;
        oldPasswordInput.focus()
        document.querySelector('[hidden-icon-old-pass]').hidden = false;
    }   else{
        if(ConfirmNewPasswordInput.value !== localStorage.getItem('TempNewPass')){
            ConfirmNewPasswordInput.error = true
            ConfirmNewPasswordInput.focus()
            document.querySelector('[hidden-icon-new-confirm-pass]').hidden = false;
        } else{
            changePasswordDialog.close();
            setTimeout(() =>{
                localStorage.setItem('MainPass', ConfirmNewPasswordInput.value);
                ShowSnack('Password was changed', 3000, 3)
                clearAllChangePassInputs()
            }, 1000);
            if(document.querySelector('[value="4-digit-reset"]').selected){
                localStorage.setItem('PasswordTypeLength', '4-digit-length')
            } else{
                localStorage.setItem('PasswordTypeLength', '8-digit-length')

            }
        }
    }
    
});

ConfirmNewPasswordInput.addEventListener('input', () =>{
    ConfirmNewPasswordInput.error = false
    document.querySelector('[hidden-icon-new-confirm-pass]').hidden = true;

});


 if(localStorage.getItem('PasswordTypeLength') === '4-digit-length'){
    document.querySelector('[value="4-digit-reset"]').selected = true;
} else{
    document.querySelector('[value="4-digit-reset"]').selected = false;
    document.querySelector('[value="8-digit-reset"]').selected = true;

    togglePasswordTypeChipsReset('8-digit-reset');

}



// clear clipboard

const clearClipboardSwitch = document.getElementById('clearClipboardSwitch');

clearClipboardSwitch.addEventListener('change', () =>{
    localStorage.setItem('isClearClipboardOn', clearClipboardSwitch.selected);

    if(clearClipboardSwitch.selected){
    document.getElementById('clearClipboardAfter').style.height = '80px';
    } else{
    document.getElementById('clearClipboardAfter').style.height = '0';
    }
});

const getisClearClipboardOn = localStorage.getItem('isClearClipboardOn');



if(getisClearClipboardOn === 'true'){
    document.getElementById('clearClipboardAfter').style.height = '80px';
    clearClipboardSwitch.selected = true;
} else{
    document.getElementById('clearClipboardAfter').style.height = '0';
    clearClipboardSwitch.selected = false;

}

const selectClipboardClearTime = document.getElementById('selectClipboardClearTime');

selectClipboardClearTime.addEventListener('input', () =>{
    setTimeOutClearClipboard()
});

function setTimeOutClearClipboard(){
    localStorage.setItem('ClearClipboardTimeOut', selectClipboardClearTime.value);
}

if(!localStorage.getItem('ClearClipboardTimeOut')){
    localStorage.setItem('ClearClipboardTimeOut', '30000');

}

cancelChangePassword.addEventListener('click', () =>{
    changePasswordDialog.close();
    clearAllChangePassInputs()
});

changePasswordDialog.addEventListener('close', () =>{
    checkSearchScroll();
});

changePasswordDialog.addEventListener('open', () =>{
    dialogcolorInverted()    
});

changePasswordDialogtoggle.addEventListener('click', () =>{
    changePasswordDialog.show();
});

selectClipboardClearTime.addEventListener('opening', () =>{
    document.querySelector('.select_1_overlay').hidden = false;
});

selectClipboardClearTime.addEventListener('closing', () =>{
    document.querySelector('.select_1_overlay').hidden = true;
});


function clearAllChangePassInputs(){
    oldPasswordInput.value = '';
    NewPasswordInput.value = '';
    ConfirmNewPasswordInput.value = '';
}

const CancelDeleteData = document.getElementById('CancelDeleteData');
const DeleteConfirmDataBtn = document.getElementById('DeleteConfirmDataBtn');
const DeleteDataConfirmDialog = document.getElementById('DeleteDataConfirmDialog');
const DeleteAppData = document.getElementById('DeleteAppData');
const ConfirmPasswordDeleteData = document.getElementById('ConfirmPasswordDeleteData');

DeleteAppData.addEventListener('click', () =>{
    dialogcolorInverted();
    DeleteDataConfirmDialog.show();
});

DeleteDataConfirmDialog.addEventListener('close', () =>{
    checkSearchScroll()
    ConfirmPasswordDeleteData.value = '';
    if(ConfirmPasswordDeleteData.error){
        ConfirmPasswordDeleteData.error = false;
    }
    if(document.getElementById('visibleConfirmAppDataInput').selected){
        document.getElementById('visibleConfirmAppDataInput').selected = false;
    }
    document.getElementById('ConfirmPasswordDeleteData').setAttribute('type', 'password');
});


DeleteConfirmDataBtn.addEventListener('click', () =>{
const getOldPasswordDATADELETE = localStorage.getItem('MainPass')

    if(ConfirmPasswordDeleteData.value === ''){
        ConfirmPasswordDeleteData.error = true;
    } else if(ConfirmPasswordDeleteData.value !== getOldPasswordDATADELETE){
        ConfirmPasswordDeleteData.error = true;
    } else{
        DeleteConfirmDataBtn.innerHTML = `<md-circular-progress indeterminate style="--md-circular-progress-size: 33px;"></md-circular-progress>`
        DeleteConfirmDataBtn.style.pointerEvents = 'none';
        setTimeout(() =>{
            localStorage.clear();
            window.history.back();
            
        }, 1000);
    }
});

ConfirmPasswordDeleteData.addEventListener('input', () =>{
    ConfirmPasswordDeleteData.error = false;
});

CancelDeleteData.addEventListener('click', () =>{
    DeleteDataConfirmDialog.close();
    

});

