//alert("Good");
$("h1");
var level=0;
var startedflag=false;
var userClickedPattern = [];
var SimonPatttern=[];
var delay=null;
var animdelay=null;


    $(document).keydown(function(){
        if(!startedflag)
        {
            $("#level-title").text("Level " + level);
            nextSequence();
            startedflag=true;
        }
    });

    $(".Start").click(function()
    {
        if(!startedflag)
        {
            $("#level-title").text("Level " + level);
            nextSequence();
            startedflag=true;
        }
    });


function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomcolor=Math.floor((Math.random()*4));
    var colorArray=["green","red","yellow","blue"];
    //console.log(colorArray[randomcolor]);

    SimonPatttern.push(colorArray[randomcolor]);   
    console.log(SimonPatttern); 
    $("#"+colorArray[randomcolor]).fadeOut(100).fadeIn(100);
    var SimonSound= new Audio("sounds/"+colorArray[randomcolor]+".mp3");
    SimonSound.play();
    
    return level;
    
      
}




$(".btn").click(function(event){
    
    var clickedAttribute=event.target.id;
    //console.log(clickedAttribute);
    animatePress(clickedAttribute);

    var userSound=new Audio("sounds/"+clickedAttribute+".mp3");
    userSound.play();
    userClickedPattern.push(clickedAttribute);
    console.log(userClickedPattern);
    checkSequence(userClickedPattern.length-1);
    
})


function animatePress(clickedAttribute)
{
    $("#"+clickedAttribute).addClass("pressed");
    clearTimeout(animdelay);
    animdelay=setTimeout(function() {
        $("#"+clickedAttribute).removeClass("pressed");
    }, 100);
}

function checkSequence(currentlevel){
    //comparing both array of same length 
    if(JSON.stringify(SimonPatttern[currentlevel])==JSON.stringify(userClickedPattern[currentlevel]) )
    {
        console.log("true");
        //once array is same we wait till all user inputs are taken example 
        //pattern red, yellow then once 2 button clicks are execute then new pattern should generate
       
        if(SimonPatttern.length===userClickedPattern.length){
            userClickedPattern=[];
            clearTimeout(delay);
            delay=setTimeout(function() {
                nextSequence(), 1000});
            
        }
    }
    else{
        console.log("false");
        var gameover=new Audio("sounds/wrong.mp3");
        gameover.play();
        $("body").addClass("game-over");
        clearTimeout(delay);
        delay=setTimeout(function(){
            $("body").removeClass("game-over"),1000});
       
        $("#level-title").text("GAME OVER, press any key to restart");
        Restart();
        
        }
    
}

function Restart()
{
    level=0;
        startedflag=false;  
        userClickedPattern=[];
        SimonPatttern=[];
}









    
