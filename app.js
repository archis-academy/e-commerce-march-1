  function changeColor(browse) {
     let hompageBrowseBox = browse;
     let hompageBrowseBoxActive = document.querySelector('.browse.active');

     if (hompageBrowseBoxActive) {
         hompageBrowseBoxActive.classList.remove('active');
       hompageBrowseBoxActive.style.backgroundColor = '#FFFFFF';
       hompageBrowseBoxActive.style.color = '#000000';
     }

     hompageBrowseBox.classList.add('active');
     hompageBrowseBox.style.backgroundColor = '#db4444';
     hompageBrowseBox.style.color = '#FFFFFF';

    

     if (hompageBrowseBox.style.backgroundColor === '#db4444') {
       hompageBrowseBox.style.backgroundColor = '#FFFFFF';
      hompageBrowseBox.style.color = '#000000';
     } else {
       hompageBrowseBox.style.backgroundColor = '#db4444';
       hompageBrowseBox.style.color = '#FFFFFF';
     }
    }

