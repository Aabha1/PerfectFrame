// sets url to different frontend, this will load the pages correctly

export const apiurl = document.location.href.startsWith('http://localhost') ?
    'http://localhost:5000' :
    '';