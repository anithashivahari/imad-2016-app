// counter code
var button=document.getElementById('counter');
var counter=0;
button.onclick=function()
{
    //make a request to counter endpoint
    
    
    
    //capture response and store in a variable
    
    
    // render the variable in the coorect span
    counter = counter+1;
    var span= document.getElementById('count');
    span.InnerHTML = counter.toString();
}