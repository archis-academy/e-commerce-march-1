function changeColor(browse) {
    let hompageBrowseBox = browse;
    let hompageBrowseBoxActive = document.querySelector('.browse.active');

    if (hompageBrowseBoxActive && hompageBrowseBoxActive !== hompageBrowseBox) {
        hompageBrowseBoxActive.classList.remove('active');
        hompageBrowseBoxActive.style.backgroundColor = '#FFFFFF';
        hompageBrowseBoxActive.style.color = '#000000';
    }

    if (!hompageBrowseBox.classList.contains('active')) {
        hompageBrowseBox.classList.add('active');
        hompageBrowseBox.style.backgroundColor = '#db4444';
        hompageBrowseBox.style.color = '#FFFFFF';
    } else {
        hompageBrowseBox.classList.remove('active');
        hompageBrowseBox.style.backgroundColor = '#FFFFFF';
        hompageBrowseBox.style.color = '#000000';
    }
}

