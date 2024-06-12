const user1 = document.getElementById('headUser-1')

function changeColorOnScroll1() {
    var container = document.getElementById('headUser-1');
    var scrollY = container.scrollTop;
  
    if (scrollY >= 50) {
      document.getElementById('head-1').style.backgroundColor = 'var(--Surface-Container)'; 
      document.getElementById('head-1').style.transition = ''; 

      document.getElementById('headUser-1').style.scrollSnapType = 'unset'; 
      container.removeEventListener('scroll', changeColorOnScroll1); 
      checkSearchScroll()

    } else {

    }
  }
  
  if(user1){
    document.getElementById('headUser-1').addEventListener('scroll', changeColorOnScroll1);
    }
  
  

  function changeColorOnScroll1A() {
    var container = document.getElementById('headUser-1');
    var scrollY = container.scrollTop;
  
    if (scrollY <= 1) {
      document.getElementById('head-1').style.backgroundColor = ''; 
      document.getElementById('head-1').style.transition = 'background-color 0.2s ease-in'; 

      ActivityColor();
      container.addEventListener('scroll', changeColorOnScroll1); 
      if(scrollY <= 20); {
        document.getElementById('headUser-1').style.scrollSnapType = ''; 

      }

    } else{
        
    }
  }
  
  if(user1){
  document.getElementById('headUser-1').addEventListener('scroll', changeColorOnScroll1A);
  }

