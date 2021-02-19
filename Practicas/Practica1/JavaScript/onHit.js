const initGame = () => {
    const canvas = document.getElementById("mainScreen")
    const ctx = canvas.getContext('2d');

    let spaceShip = new Image();
    let enemy = new Image();
    let meteorito = new Image();
    let background = new Image()

    background.src = "./Assets/espacioPractica1_3.jpg"
    spaceShip.src = "./Assets/navePractica1.png"
    meteorito.src = "./Assets/meteoritoPractica1.png"
    enemy.src = "./Assets/naveEnemiga.png"
    

    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    const enemyTemplate = function (options){
        return {
            id:    options.id    || "",
            x:     options.x     || "",
            y:     options.y     || "",
            w:     options.w     || "",
            h:     options.h     || "",
            image: options.image || enemy,
        }
    }

    
    const meteoreTemplate = function(options){
        return {
            id:    options.id    || "",
            x:     options.x     || "",
            y:     options.y     || "",
            w:     options.w     || "",
            h:     options.h     || "",
            image: options.image || meteorito,
        }
    }

    const allMeteores = []
    const allEnemies = [
        new enemyTemplate({x:150,y:-810,w:100,h:100,image:enemy}),
        new enemyTemplate({x:350,y:-240,w:100,h:100,image:enemy }),
        new enemyTemplate({x:450,y:-609,w:100,h:100,image:enemy }),
        new enemyTemplate({x:550,y:-333,w:100,h:100,image:enemy }),

    ]

    const spawnEnemies = () => {
        const v = 0.7
        allEnemies.forEach((elem) => {
            const e = elem;
            ctx.drawImage(e.image, e.x, e.y+=v, enemy.w, enemy.h)
            draw.hitDetectLowerLevel(e);
        })
    }


    const createMeteores = () =>{
        const minx = 10;
        const maxx = 800;
        const xs = Math.floor(Math.random()*(maxx - minx)) + minx;
        const ys = 0;
        const ws = 150;
        const hs = 150;
        if(allMeteores.length < 5){
            allMeteores.push(new meteoreTemplate({image: meteorito ,x:xs, y:ys, w:ws, h:hs}))
        }
    }

    const spawnMeteores = () => {
        if(allMeteores.length !== 0){
            allMeteores.forEach((elem) => {
                const meteore = elem;
                if(meteore.y == 0){
                    ctx.drawImage(meteore.image, meteore.x, meteore.y, meteore.w, meteore.h)
                    const y = Math.floor(Math.random()*(5 - 0)) + 0;
                    meteore.y = y;
                }else{
                    if(meteore.y < 600){
                        const aux = meteore.y;
                        meteore.y = 1;
                        ctx.drawImage(meteore.image, meteore.x, (meteore.y) += aux, meteore.w, meteore.h)
                        console.log(meteore.y)
                    }else{
                        allMeteores.splice(allMeteores.indexOf(elem), 1)  
                    }
                }
            })
        }else{
            createMeteores();
        }
    }

    function drawShip() {
        this.x = 350;
        this.y = 500;
        this.w = 80;
        this.h = 42;
        this.direction;
        this.misile = [];
        this.bc = "chartreuse"

        this.gameStatus = {
            over: false,
            message: "",
            fillStyle: "red",
            font: 'italic bold 36px Arial, sans-serif'
        }

        this.render = function(){
            if(this.direction === "left"){
                this.x -= 2;
            }else if(this.direction === "right"){
                this.x += 2;
            }
                ctx.fillStyle = this.bc;
                ctx.drawImage(background, 0, 0, 800, 600)
                ctx.drawImage(spaceShip,this.x, this.y, 80, 42);

                this.misile.forEach((elem) => {
                    const m = elem;
                    ctx.fillRect(m.x, m.y-=5, m.w, m.h)
                    this.hitDetected(m, this.misile.indexOf(elem));
                    if(m.y <= 0){
                        this.misile.splice(this.misile.indexOf(elem), 1)
                    }
                })
                spawnMeteores();
        }

    
        this.hitDetected = function(m, mi){
            allEnemies.forEach((elem) => {
                const e = elem;
                if(m.x <= e.x + e.w && m.x + m.w >= e.x && m.y >= e.y && m.y <= e.y + e.h){
                    allEnemies.splice(allEnemies.indexOf(elem), 1)
                }
            })
            allMeteores.forEach((elem) => {
                const e = elem;
                if(m.x <= e.x + e.w && m.x + m.w >= e.x && m.y >= e.y && m.y <= e.y + e.h){
                    allMeteores.splice(allMeteores.indexOf(elem), 1)
                }
            })
        }


        this.hitDetectLowerLevel = function(enemy){
            if(enemy.y > 600){
                enemy.y = Math.random()*(-900-(-50))+(-50);
                enemy.x = Math.random()*(550-60)+60;
            }

            // Cuando los enemigos te tocan
            if((enemy.y < this.y + 50 && enemy.y > this.y - 50) && (enemy.x < this.x + 45 && enemy.x > this.x - 45)){
                this.gameStatus.over = true;
                this.gameStatus.message = "You died";
            }
            
            // Cuando los enemigos pasan
            if(this.gameStatus.over === true){
                clearInterval(animateInterval);
                ctx.fillStyle = this.gameStatus.fillStyle;
                ctx.font = this.gameStatus.font;
            
                ctx.fillText(this.gameStatus.message, canvasWidth*.5 -80, 50);
            }
        }
    }
    const draw = new drawShip();
    const animate = () => {
        ctx.clearRect(0, 0, canvasHeight, canvasHeight);
        draw.render();
        spawnEnemies()
    }

    
    const moveInterval = setInterval(animate, 6);

    // Cuando se presiona una tecla izquierda 37
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37){
            draw.direction = 'left';
            // Impedimos que se salga del canvas
            if(draw.x < canvasWidth *.2 -130){
                draw.x += 0;
                draw.direction = '';
            }
        }
    });

    // Cuando no se presiona la tecla izquierda 37
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37){
            draw.x += 0;
            draw.direction = '';
        }
    });
    // Cuando se presiona la tecla derecha 39
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39){
            draw.direction = 'right';
            // Impedimos que se salga del canvas
            if(draw.x > canvasWidth - 110){
                draw.x -= 0;
                draw.direction = '';
            }
        }
    });

    // Cuando no se presiona la tecla derecha 39
    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39){
            draw.x -= 0;
            draw.direction = '';
        }
    });

    // Cuando no se presiona la tecla P
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 80){
            location.reload();
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode == 32){
            draw.misile.push({
                x: draw.x + 39,
                y: draw.y,
                w: 3,
                h: 10,
            })
        }
    })
}

window.addEventListener('load', (e) => {
    initGame();
})
