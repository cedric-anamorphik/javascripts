// set current active item from slug

// get the last segment of the current url (without the query string)
var url = window.location.href;
url = url.split('/').pop().split('?').shift();

// light'em up !
$('a[href^="'+url+'"]').addClass('is-current');
