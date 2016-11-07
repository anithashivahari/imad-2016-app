console.log('Loaded!');
//change the text of main text file
var element=document.getElementById('main-text');
element.innerHTML = 'New value';
//move the image
var img=document.getElementById('img');
img.onClick = function()
{
    img.style.marginleft='100px';
}