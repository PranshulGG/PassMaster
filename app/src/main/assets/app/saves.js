const openAddLoginBtn = document.getElementById('openAddLoginDialog');  
const addLoginDialog = document.getElementById('addLoginDialog');
const LoginTitleInput = document.getElementById('AddLoginTitle');
const LoginUserName = document.getElementById('AddUserName');
const LoginPassword = document.getElementById('AddPassword');
const LockLoginToggle = document.getElementById('lock_login_btn');
const SavedLoginWrapper = document.getElementById('saved_logins');
const LoginSaveBtn = document.getElementById('LoginSaveBtn');
const IconValues = document.querySelectorAll('input[name="ChooseIconDialog"]');
const IsShowConfirm = localStorage.getItem('ShowDeleteConfirm');
const getHideSubtitle = localStorage.getItem('HideSubtitle');

openAddLoginBtn.addEventListener('click', () => {
    addLoginDialog.show();
    checkValidLoginInfo()
    dialogcolor();


});

addLoginDialog.addEventListener('close', () => {
    checkTHEME();


});

function clearLoginAdd() {

    if(localStorage.getItem('IsEditing') === 'true'){
        createLoginSave()
        setTimeout(() =>{
            localStorage.setItem('IsEditing', 'false')
            LoginTitleInput.value = '';
            LoginPassword.value = '';
            LoginUserName.value = '';   
            setTimeout(() =>{
                if (LockLoginToggle.selected) {
                    LockLoginToggle.selected = false;
                }  
            }, 500);
        
            document.getElementById('LoginSaveBtnEDITING').hidden = true;
            LoginSaveBtn.hidden = false;

            document.getElementById('img_holder_icon').style.display = '';
            openIconDialog.style.backgroundImage = ``;
        },200 );
    } else{
        LoginTitleInput.value = '';
        LoginPassword.value = '';
        LoginUserName.value = '';   
        setTimeout(() =>{
            if (LockLoginToggle.selected) {
                LockLoginToggle.selected = false;
            }  
        }, 500);
    
        document.getElementById('img_holder_icon').style.display = '';
        openIconDialog.style.backgroundImage = ``;
        document.getElementById('LoginSaveBtnEDITING').hidden = true;
        LoginSaveBtn.hidden = false;
        localStorage.setItem('IsEditing', 'false')
    }





};


addLoginDialog.addEventListener('cancel', () => {

    clearLoginAdd()
});


function checkValidLoginInfo() {
    if (LoginTitleInput.value.trim() === "" || LoginUserName.value.trim() === "" || LoginPassword.value.trim() === ""){
        LoginSaveBtn.disabled = true;
    } else {
        LoginSaveBtn.disabled = false;
    }
}

LoginUserName.addEventListener('input', checkValidLoginInfo);
LoginTitleInput.addEventListener('input', checkValidLoginInfo);
LoginPassword.addEventListener('input', checkValidLoginInfo);



function createLoginSave() {
    const loginId = 'lOGIN-' + Date.now();


    const selectedIcon = document.querySelector('input[name="ChooseIconDialog"]:checked');


     if(!selectedIcon) {
     ShowSnack('Please select an icon before proceeding', 2000, 3)

        return;
    }

    const uniqueId = 'LoginRipple' + loginId;


    const LoginSaveWrap = document.createElement('div');
    LoginSaveWrap.classList.add('LoginSaveWrap');
    const LoginIconWrapRipple = document.createElement('md-ripple');
    const LoginIconWrapRippleControl = document.createElement('control');
    const LoginSaveTitleP = document.createElement('p');
    const loginUserNameLabel = document.createElement('span');
    const loginIcon = document.createElement('img');
    loginIcon.src = "" + openIconDialog.getAttribute('ImageValue');
    const LoginIconWrap = document.createElement('divimg');
    const infoWrapLogin = document.createElement('wrap');

    LoginIconWrapRippleControl.id = uniqueId;
    LoginIconWrapRipple.setAttribute('for', uniqueId);
    LoginIconWrapRipple.style = '--md-ripple-pressed-opacity: 0.13;';



    LoginSaveTitleP.innerHTML = LoginTitleInput.value;
    loginUserNameLabel.innerHTML = LoginUserName.value;

    const loginDetails = {
        id: loginId,
        title: LoginTitleInput.value,
        username: LoginUserName.value,
        MainPASSVAL: LoginPassword.value,
        imgValue: openIconDialog.getAttribute('ImageValue'),
        // lockedValue: 'locked' + loginId
        
    };


    IconValues.forEach(radio => {
        radio.checked = false;

    });



            // menu
            const menuWrapper = document.createElement('WrapMenu');
            const anchorIDUnique = 'AnchorId' + loginId;
            const anchorIDUniqueMenu = 'AnchorIdMenu' + loginId;

            const menuToggleLogin = document.createElement('md-icon-button');
            menuToggleLogin.innerHTML = `<md-icon icon-outlined>more_vert</md-icon>`;
            const menuMainOptions = document.createElement('md-menu');
            menuMainOptions.setAttribute('positioning', 'popover');
            menuMainOptions.id = anchorIDUniqueMenu;
            menuMainOptions.setAttribute('anchor', anchorIDUnique);
            menuMainOptions.setAttribute('anchor-corner', 'start-start');
            menuToggleLogin.id = anchorIDUnique;
    
            // menu-btns
            const deleteMenuBtn = document.createElement('md-menu-item')
            deleteMenuBtn.setAttribute('menu-type', '')
            deleteMenuBtn.innerHTML = `<div slot="headline">Delete</div>`
            deleteMenuBtn.addEventListener('click', () => {
                if (IsShowConfirm === 'false') {
                    deleteLogin(loginId, LoginSaveWrap)
                ShowSnack('Login deleted', 3000, 3, 'fixed', 'tab-content-2')

                } else {
                    let DeleteResult = confirm("The login will be deleted permanently. This action cannot be undone!")
                    if (DeleteResult) {
                        deleteLogin(loginId, LoginSaveWrap)
                ShowSnack('Login deleted', 3000, 3, 'fixed', 'tab-content-2')

                    } else {
                        return;
                    }
                }
            });
    
            const editMenuBtn = document.createElement('md-menu-item')
            editMenuBtn.setAttribute('menu-type', '')
            editMenuBtn.innerHTML = `<div slot="headline">Edit</div>`;


            if (LockLoginToggle.selected) {
                LoginIconWrapRippleControl.classList.add('locked' + loginId)
                loginDetails.lockedValue = 'locked' + loginId;
                LoginSaveWrap.setAttribute('locked', 'true')
            } else{
            LoginSaveWrap.setAttribute('locked', 'false')

            }


            if(getHideSubtitle === 'true'){
                loginUserNameLabel.hidden = true;
                infoWrapLogin.classList.add('no-sub');
            } else{
                loginUserNameLabel.hidden = false;
                infoWrapLogin.classList.remove('no-sub');
    
            }
        

            editMenuBtn.addEventListener('click', () =>{

                if(LoginSaveWrap.getAttribute('locked') === 'true'){
                    let userInput = prompt('');

                    if(userInput !== localStorage.getItem('MainPass')){
                        return
                    } else{
                        setTimeout(() =>{      
                            addLoginDialog.show()
                            LoginTitleInput.value = loginDetails.title
                            LoginUserName.value = loginDetails.username
                            LoginPassword.value = loginDetails.MainPASSVAL;
            
            
                            openIconDialog.style.backgroundImage = `url(${loginDetails.imgValue})`;
                            openIconDialog.setAttribute('ImageValue', loginDetails.imgValue)
                            document.querySelector(`[value="${loginDetails.imgValue}"]`).checked = true;
                
                            document.getElementById('img_holder_icon').style.display = 'none';
                
                            if (openIconDialog.getAttribute('imagevalue') === 'brand-icons/apple.svg') {
                                openIconDialog.style.backgroundSize = '30px'
                            } else {
                                openIconDialog.style.backgroundSize = ''
                        
                            }
                            document.getElementById('LoginSaveBtnEDITING').hidden = false;
                            LoginSaveBtn.hidden = true;
                
                
                            deleteLogin(loginId, LoginSaveWrap)
                
                            localStorage.setItem('IsEditing', 'true');
                            dialogcolor();
            
                            if(LoginSaveWrap.getAttribute('locked') === 'true'){
                                LockLoginToggle.selected = true;
                            } else{
                                LockLoginToggle.selected = false;
                            }
                          }, 200);
                        }
                }else{
                addLoginDialog.show()
                LoginTitleInput.value = loginDetails.title
                LoginUserName.value = loginDetails.username
                LoginPassword.value = loginDetails.MainPASSVAL;


                openIconDialog.style.backgroundImage = `url(${loginDetails.imgValue})`;
                openIconDialog.setAttribute('ImageValue', loginDetails.imgValue)
                document.querySelector(`[value="${loginDetails.imgValue}"]`).checked = true;
    
                document.getElementById('img_holder_icon').style.display = 'none';
    
                if (openIconDialog.getAttribute('imagevalue') === 'brand-icons/apple.svg') {
                    openIconDialog.style.backgroundSize = '30px'
                } else {
                    openIconDialog.style.backgroundSize = ''
            
                }
                document.getElementById('LoginSaveBtnEDITING').hidden = false;
                LoginSaveBtn.hidden = true;
    
    
                deleteLogin(loginId, LoginSaveWrap)
    
                localStorage.setItem('IsEditing', 'true');
                dialogcolor();

                if(LoginSaveWrap.getAttribute('locked') === 'true'){
                    LockLoginToggle.selected = true;
                } else{
                    LockLoginToggle.selected = false;
                }
            }
            });



    

    setLoginToLocalStorage(loginDetails);

    addLoginDialog.close();
    LoginSaveWrap.appendChild(LoginIconWrap);
    SavedLoginWrapper.appendChild(LoginSaveWrap);
    infoWrapLogin.appendChild(LoginSaveTitleP);
    infoWrapLogin.appendChild(loginUserNameLabel);
    LoginIconWrap.appendChild(loginIcon)
    LoginSaveWrap.appendChild(infoWrapLogin)
    LoginIconWrap.appendChild(LoginIconWrapRipple)
    LoginIconWrap.appendChild(LoginIconWrapRippleControl)

    LoginSaveWrap.appendChild(menuWrapper);
    menuWrapper.appendChild(menuToggleLogin);
    menuWrapper.appendChild(menuMainOptions);
    menuMainOptions.appendChild(deleteMenuBtn)
    menuMainOptions.appendChild(editMenuBtn)


    const anchorEl = document.getElementById(anchorIDUnique);
    const menuEl = document.getElementById(anchorIDUniqueMenu);

    anchorEl.addEventListener('click', () => { menuEl.open = !menuEl.open; });


    LoginIconWrapRippleControl.addEventListener('click', () =>{
        if(loginDetails.lockedValue){
            EnterVerifyPasswordDialog.show();
            const name = loginDetails.username;
            const pass = loginDetails.MainPASSVAL;
            const title = loginDetails.title;
            const img = loginDetails.imgValue;
            VerifyPassBtn.setAttribute('PageValue', `pages/viewLogin.html?name=${encodeURIComponent(name)}&pass=${encodeURIComponent(pass)}&title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}`)
        } else{
       const name = loginDetails.username;
        const pass = loginDetails.MainPASSVAL;
        const title = loginDetails.title;
        const img = loginDetails.imgValue;


        transitionToPage(`pages/viewLogin.html?name=${encodeURIComponent(name)}&pass=${encodeURIComponent(pass)}&title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}`)
    checkSearchScroll();

        }
    });

    VerifyPassBtn.addEventListener('click', () =>{
        if(enterPasswordVerify.value !== localStorage.getItem('MainPass')){
            enterPasswordVerify.error = true;
        } else{
            transitionToPage(VerifyPassBtn.getAttribute('PageValue'))
            EnterVerifyPasswordDialog.close()
    checkSearchScroll();

        }
    })


    setTimeout(() => {
        clearLoginAdd()
    }, 500);
}



const openIconDialog = document.getElementById('openIconDialog');
const IconSelectDialog = document.getElementById('IconDialogSelection');


openIconDialog.addEventListener('click', () => {
    IconSelectDialog.show();
    addLoginDialog.close();

    setTimeout(() => {
        dialogcolor();
    }, 100);
});



IconSelectDialog.addEventListener('close', () => {
    addLoginDialog.show();

});




function SetSelectedIconLogin() {
    const selectedIcon = document.querySelector('input[name="ChooseIconDialog"]:checked');


    const IconValue = selectedIcon.value;




        openIconDialog.style.backgroundImage = `url(${IconValue})`;

    openIconDialog.setAttribute('ImageValue', IconValue)
    
    IconSelectDialog.close();

    document.getElementById('img_holder_icon').style.display = 'none';

    if (openIconDialog.getAttribute('imagevalue') === 'brand-icons/apple.svg') {
        openIconDialog.style.backgroundSize = '30px'
    } else {
        openIconDialog.style.backgroundSize = ''

    }
}


function setLoginToLocalStorage(loginDetails) {
    let logins = JSON.parse(localStorage.getItem('LoginSaves')) || [];

    logins.push(loginDetails);

    localStorage.setItem('LoginSaves', JSON.stringify(logins));
    document.getElementById('mark_1').hidden = true;

}

function deleteLogin(loginId, element) {
    let logins = JSON.parse(localStorage.getItem('LoginSaves')) || [];

    logins = logins.filter(login => login.id !== loginId);

    localStorage.setItem('LoginSaves', JSON.stringify(logins));

    element.remove();




    if (logins.length === 0) {
        document.getElementById('mark_1').hidden = false;
        return;
    } else{
        console.error('Error deleting login')
    }
}




function loadLoginSavedInfo() {
    const savedLogins = JSON.parse(localStorage.getItem('LoginSaves')) || [];
    if (savedLogins.length === 0) {
        document.getElementById('mark_1').hidden = false;
        return;
    }
    savedLogins.forEach(login => {
        const uniqueId = 'LoginRipple' + login.id;


        const LoginSaveWrap = document.createElement('div');
        LoginSaveWrap.classList.add('LoginSaveWrap');
        const LoginIconWrapRipple = document.createElement('md-ripple');
        const LoginIconWrapRippleControl = document.createElement('control');
        const LoginSaveTitleP = document.createElement('p');
        const loginUserNameLabel = document.createElement('span');
        const loginIcon = document.createElement('img');
        loginIcon.src = "" + login.imgValue;
        const LoginIconWrap = document.createElement('divimg');
        const infoWrapLogin = document.createElement('wrap');



        LoginIconWrapRippleControl.id = uniqueId;
        LoginIconWrapRipple.setAttribute('for', uniqueId);

        LoginIconWrapRipple.style = '--md-ripple-pressed-opacity: 0.13;';

        LoginSaveTitleP.innerHTML = login.title;
        loginUserNameLabel.innerHTML = login.username;

        if(login.lockedValue){
            LoginIconWrapRippleControl.classList.add('locked' + login.lockedValue)
            LoginSaveWrap.setAttribute('locked', 'true')


        } else{
            LoginSaveWrap.setAttribute('locked', 'false')

        }
        // menu
        const menuWrapper = document.createElement('WrapMenu');
        const anchorIDUnique = 'AnchorId' + login.id;
        const anchorIDUniqueMenu = 'AnchorIdMenu' + login.id;

        const menuToggleLogin = document.createElement('md-icon-button');
        menuToggleLogin.innerHTML = `<md-icon icon-outlined>more_vert</md-icon>`;
        const menuMainOptions = document.createElement('md-menu');
        menuMainOptions.setAttribute('positioning', 'popover');
        menuMainOptions.id = anchorIDUniqueMenu;
        menuMainOptions.setAttribute('anchor', anchorIDUnique);
        menuMainOptions.setAttribute('anchor-corner', 'start-start');
        menuToggleLogin.id = anchorIDUnique;

        // menu-btns
        const deleteMenuBtn = document.createElement('md-menu-item')
        deleteMenuBtn.setAttribute('menu-type', '')
        deleteMenuBtn.innerHTML = `<div slot="headline">Delete</div>`
        deleteMenuBtn.addEventListener('click', () => {
            if (IsShowConfirm === 'false') {
                deleteLogin(login.id, LoginSaveWrap)
                ShowSnack('Login deleted', 3000, 3, 'fixed', 'tab-content-2')
            } else {
                let DeleteResult = confirm("The login will be deleted permanently. This action cannot be undone!")
                if (DeleteResult) {
                    deleteLogin(login.id, LoginSaveWrap)
                ShowSnack('Login deleted', 3000, 3, 'fixed', 'tab-content-2')

                } else {
                    return;
                }
            }
        });

        const editMenuBtn = document.createElement('md-menu-item')
        editMenuBtn.setAttribute('menu-type', '')
        editMenuBtn.innerHTML = `<div slot="headline">Edit</div>`;


        if(getHideSubtitle === 'true'){
            loginUserNameLabel.hidden = true;
            infoWrapLogin.classList.add('no-sub');
        } else{
            loginUserNameLabel.hidden = false;
            infoWrapLogin.classList.remove('no-sub');

        }





        editMenuBtn.addEventListener('click', () =>{

            if(LoginSaveWrap.getAttribute('locked') === 'true'){
                let userInput = prompt('');

                if(userInput !== localStorage.getItem('MainPass')){
                    ShowSnack('Wrong password', 2000, 3, 'fixed', 'tab-content-2')
                    return
                } else{
                    setTimeout(() =>{

                    addLoginDialog.show()
            LoginTitleInput.value = login.title
            LoginUserName.value = login.username
            LoginPassword.value = login.MainPASSVAL;



                    openIconDialog.style.backgroundImage = `url(${login.imgValue})`;
            openIconDialog.setAttribute('ImageValue', login.imgValue)
            document.querySelector(`[value="${login.imgValue}"]`).checked = true;

            document.getElementById('img_holder_icon').style.display = 'none';

            if (openIconDialog.getAttribute('imagevalue') === 'brand-icons/apple.svg') {
                openIconDialog.style.backgroundSize = '30px'
            } else {
                openIconDialog.style.backgroundSize = ''
        
            }

            dialogcolor();

            deleteLogin(login.id, LoginSaveWrap)

            document.getElementById('LoginSaveBtnEDITING').hidden = false;
            LoginSaveBtn.hidden = true;

            localStorage.setItem('IsEditing', 'true');

            if(LoginSaveWrap.getAttribute('locked') === 'true'){
                LockLoginToggle.selected = true;
            } else{
                LockLoginToggle.selected = false;
            }
        }, 200);
        
                }

            }else{
            addLoginDialog.show()
            LoginTitleInput.value = login.title
            LoginUserName.value = login.username
            LoginPassword.value = login.MainPASSVAL;



                    openIconDialog.style.backgroundImage = `url(${login.imgValue})`;
            openIconDialog.setAttribute('ImageValue', login.imgValue)
            document.querySelector(`[value="${login.imgValue}"]`).checked = true;

            document.getElementById('img_holder_icon').style.display = 'none';

            if (openIconDialog.getAttribute('imagevalue') === 'brand-icons/apple.svg') {
                openIconDialog.style.backgroundSize = '30px'
            } else {
                openIconDialog.style.backgroundSize = ''
        
            }

            dialogcolor();

            deleteLogin(login.id, LoginSaveWrap)

            document.getElementById('LoginSaveBtnEDITING').hidden = false;
            LoginSaveBtn.hidden = true;

            localStorage.setItem('IsEditing', 'true');

            if(LoginSaveWrap.getAttribute('locked') === 'true'){
                LockLoginToggle.selected = true;
            } else{
                LockLoginToggle.selected = false;
            }
        }
        });




        LoginSaveWrap.appendChild(LoginIconWrap);
        SavedLoginWrapper.appendChild(LoginSaveWrap);
        infoWrapLogin.appendChild(LoginSaveTitleP);
        infoWrapLogin.appendChild(loginUserNameLabel);
        LoginIconWrap.appendChild(loginIcon)
        LoginSaveWrap.appendChild(infoWrapLogin)
        LoginIconWrap.appendChild(LoginIconWrapRipple)
        LoginIconWrap.appendChild(LoginIconWrapRippleControl)

        
        LoginSaveWrap.appendChild(menuWrapper);
        menuWrapper.appendChild(menuToggleLogin);
        menuWrapper.appendChild(menuMainOptions);
        menuMainOptions.appendChild(deleteMenuBtn)
        menuMainOptions.appendChild(editMenuBtn)


        LoginIconWrapRippleControl.addEventListener('click', () =>{
            if(login.lockedValue){
                EnterVerifyPasswordDialog.show();
                const name = login.username;
                const pass = login.MainPASSVAL;
                const title = login.title;
                const img = login.imgValue;
                VerifyPassBtn.setAttribute('PageValue', `pages/viewLogin.html?name=${encodeURIComponent(name)}&pass=${encodeURIComponent(pass)}&title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}`)
            } else{
           const name = login.username;
            const pass = login.MainPASSVAL;
            const title = login.title;
            const img = login.imgValue;
    
            transitionToPage(`pages/viewLogin.html?name=${encodeURIComponent(name)}&pass=${encodeURIComponent(pass)}&title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}`)


            }
        });

        VerifyPassBtn.addEventListener('click', () =>{
            if(enterPasswordVerify.value !== localStorage.getItem('MainPass')){
                enterPasswordVerify.error = true;
            } else{
                transitionToPage(VerifyPassBtn.getAttribute('PageValue'))
                EnterVerifyPasswordDialog.close()

            }
        })


        const anchorEl = document.getElementById(anchorIDUnique);
        const menuEl = document.getElementById(anchorIDUniqueMenu);

        anchorEl.addEventListener('click', () => { menuEl.open = !menuEl.open; });

        



    });
}

loadLoginSavedInfo()




