// counter code
var button= document.getElementById('counter');

button.onclick=function()
{
    //create a request
    
    var request=new XMLHttpRequest();
    
    
    //capture response and store in a variable
    
    reuest.onreadystatechange=function() {
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status ===200){
               var counter= request.responseText;
                var span= document.getElementById('count');
    span.InnerHTML = counter.toString();
            }
        }
    }; 
    //make a request
    request.open('GET','http://anithashivahari.imad.hasura-app.io/counter',true);
    request.send(null);
    // render the variable in the coorect 
   
}