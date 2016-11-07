// counter code
var button= document.getElementById('counter');

button.onclick=function()
{
    //create a request
    
    var request=new XMLHttpRequest();
    
    
    //capture response and store in a variable
    
    request.onreadystatechange=function() {
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status ===200){
                 var names=request.responseText;
                 name=JSON.parse(names);
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list+='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
               
            }
        }
    }; 
    //make a request
    request.open('GET','http://anithashivahari.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    // render the variable in the coorect 
   
};
//submit name
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //make a request to server and send name
    //capture list of name and renders list
   
};

    
