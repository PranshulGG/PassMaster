// tabs-nav

const TabNameLabel = document.getElementById('tab_label')

let currentTab = 0;
        showTab(currentTab);
        function showTab(tabIndex) {
            

            
                document.getElementById(`tab-content-${currentTab}`).style.display = 'none';

     

            const previousTab = document.querySelector('.tab.active');
            const previousname = document.querySelector('.label.active-name');

            if (previousTab) {
                previousTab.classList.remove('active');
                previousname.classList.remove('active-name');
          
            }
           


                document.getElementById(`tab-content-${tabIndex}`).style.display = 'block';
     
            document.querySelectorAll('.tab')[tabIndex].classList.add('active');
            document.querySelectorAll('.label')[tabIndex].classList.add('active-name');        
            currentTab = tabIndex;

            if(tabIndex === 0){
                    TabNameLabel.innerHTML = 'Generate password';
                    document.getElementById('page_title_web').textContent = 'Generate password'

            } else if(tabIndex === 1){
                    TabNameLabel.innerHTML = 'History';
                    document.getElementById('page_title_web').textContent = 'History'


            } else if(tabIndex === 2){
                    TabNameLabel.innerHTML = 'Logins';
                    document.getElementById('page_title_web').textContent = 'Logins'


            }
        }
