

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");



let player = new GameObject("Player", canvas, ctx);
player.position = new Vector2(0, 5);
player.size = new Vector2(30, 50);
player.collider = new Vector2(30, 50);
player.velocity.x = 0;
player.velocity.y = 7;
player.isKinematic = false;

let platform = new GameObject("Platform", canvas, ctx);
platform.position = new Vector2(0, -150);
platform.color = new Color(0, 255, 0, 1);
platform.size = new Vector2(550, 20);
platform.collider = new Vector2(550, 20);
platform.isKinematic = true;

let box = new GameObject("box", canvas, ctx);
box.position = new Vector2(150, -115);
box.color = new Color(200, 0, 0, 1);
box.size = new Vector2(50, 50);
box.collider = new Vector2(50, 50);
box.isKinematic = true;

let box2 = new GameObject("box2", canvas, ctx);
box2.position = new Vector2(-100, -120);
box2.color = new Color(200, 200, 0, 1);
box2.size = new Vector2(30, 40);
box2.collider = new Vector2(30, 40);
box2.isKinematic = true;

let movingBox = new GameObject("MovingBox", canvas, ctx);
movingBox.position = new Vector2(50, 5);
movingBox.color = new Color(255, 125, 0, 1);
movingBox.size = new Vector2(30, 50);
movingBox.collider = new Vector2(30, 50);
movingBox.velocity.x = 0;
movingBox.velocity.y = 7;
movingBox.isKinematic = false;


let gameObjects = [];
gameObjects[0] = player;
gameObjects[1] = platform;
gameObjects[2] = box;
gameObjects[3] = box2;
gameObjects[4] = movingBox;


let left = false;
let right = false;
let isGrounded = true;

let colliderC = 0.5;



function Update () 
{
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gameObjects.length; i++) 
    {
        gameObjects[i].Update();
    }
    

    if (left) 
    {
        player.velocity.x = -player.speed;
    }
    else if (right) 
    {
        player.velocity.x = player.speed;
        console.log("Sou um bosta");
    }

    Collision();


    requestAnimationFrame(Update);
    
}
Update();



function Collision() {

    for (let i = 0; i < gameObjects.length; i++) 
    {
        
        for (let j = 0; j < gameObjects.length; j++) 
        {
            
            if (i != j) 
            {

                if (!gameObjects[i].isKinematic) 
                {
                    
                    let colliderDistanceX = (gameObjects[i].collider.x * 0.5 + gameObjects[j].collider.x * 0.5);
                    let colliderDistanceY = (gameObjects[i].collider.y * 0.5 + gameObjects[j].collider.y * 0.5);
                    let pivotDistanceX = Math.abs(gameObjects[i].position.x - gameObjects[j].position.x);
                    let pivotDistanceY = Math.abs(gameObjects[i].position.y - gameObjects[j].position.y);
                    let distanceX = pivotDistanceX - colliderDistanceX;
                    let distanceY = pivotDistanceY - colliderDistanceY;
                    let myPosition = new Vector2(gameObjects[i].position.x, gameObjects[i].position.y);
                    let myVelocity = new Vector2(gameObjects[i].velocity.x, gameObjects[i].velocity.y);
                    

                    let checkY = (Math.abs(gameObjects[i].velocity.y) + Math.abs(gameObjects[j].velocity.y)) / distanceY;
                    

                   //COLLISION
                   if (distanceY <= colliderC && distanceX <= colliderC)
                    {
                        if (distanceX > distanceY)
                        {
                            gameObjects[i].position.x -= gameObjects[i].velocity.x;
                            gameObjects[i].velocity.x = -gameObjects[i].velocity.x * 0;
                        }
                        else
                        {
                            gameObjects[i].position.y -= gameObjects[i].velocity.y;
                            gameObjects[i].velocity.y = -gameObjects[i].velocity.y * 0;
                            if (gameObjects[i].tag == "Player")
                            {
                                if (gameObjects[i].position.y > gameObjects[j].position.y) {
                                    isGrounded = true;
                                }
                            }
                        }
                    }

                }
            }
        
        }
        
    }

}


function keyUp(e) 
{
    if(e.key == "ArrowUp" && isGrounded) 
    {
        player.velocity.y += 5;
        isGrounded = false;
    }
}
function keyLeftDown(e) 
{
    if(e.key == "ArrowLeft") 
    {
        left = true;
    }
}
function keyRightDown(e) 
{
    if(e.key == "ArrowRight") 
    {
        right = true;
    }
}
function keyLeftUp(e) 
{
    if(e.key == "ArrowLeft") 
    {
        left = false;
    }
}
function keyRightUp(e) 
{
    if(e.key == "ArrowRight") 
    {
        right = false;
    }
}
document.addEventListener("keydown", keyUp, false);
document.addEventListener("keydown", keyLeftDown, false);
document.addEventListener("keydown", keyRightDown, false);
document.addEventListener("keyup", keyLeftUp, false);
document.addEventListener("keyup", keyRightUp, false);
//document.addEventListener("keyup", keyUpHandler, false);