console.log('Loaded!');
//change the text of main text file
var element=document.getElementById('main-text');
element.innerHTML = 'New value';
//move the image
var img=document.getElementById('modi');
img.onClick = function()
{
    modi.style.marginleft='100px';
};