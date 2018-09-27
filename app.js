const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
ctx.strokeStyle = '#BADA55';
//permite que sea continuo,como un gusanito cuchi
ctx.lineJoin = 'round';
ctx.lineCap='round';
ctx.lineWidth=100;
// ctx.globalCompositeOperation='multiply'; para colocar la sombra

let isDrawing = false; //es como un bandera que me permitira saber si el boton del 
// mouse esta siendo presionado para ver si se sigue pintando o no
// nos permitira saber si hay alguien dibujando en el canvas o solo moviendo el mouse 
let lastX = 0; 
// coordenada x en el canvas, que me permitira inicializar desde donde me pare 
let lastY =0;
// coordenada y en el canvas, que me permitira inicializar 
let hue = 0;
let direction = true;

function draw(e){
    // como queremos que solo se efectue cuando el mouse esta presionado ponemos la siguiente condicion
    //que nos permitira usar la variable isDrawing como un flag para saber cuando esta siendo presionado y cuando no
    if(!isDrawing)return;// stop the function from running cuando no esta siendo presionado

    console.log(e);
    // el 100% es la saturacion y 50% el brillo
    //se pasa hue como variable, que fue inicializada, y para que cambie de color se realiza un ++ para que aumente su valor
    ctx.strokeStyle= `hsl(${hue}, 100%, 50%)`;
    // las siguientes 3 lineas son las que describen y dan inicio al pincel
    ctx.beginPath();
    ctx.moveTo(lastX, lastY) // coordenadas de donde comienza
    ctx.lineTo(e.offsetX, e.offsetY);//coordenadas a donde termina
    // pero no es hasta que se pone esta funcion que se logra ver algo en el SVGPathSegLinetoHorizontalAbs, canvas
    ctx.stroke();
    // ctx.lineWidth=hue; esta linea hace que el grosor aumete a medida que cambia el color
    //en este punto logramos colorear algo pero todo siempre comienza desde un mismo punto y no es lo que estamos buscando
    // es por esto que lo siguiente que haremos es actualizar los valores de las coordenadas X y Y
    lastX = e.offsetX;
    lastY = e.offsetY;

    //  |  la cosa mejora y se parece mas a lo que estamos buscando
    hue++;
    if(hue >= 360){
        hue=0;
    }
    if(ctx.lineWidth >= 100  || ctx.lineWidth <= 1){
        direction =!direction;
    }
    // se cambia el estado de true del direction
    if(direction){
        ctx.lineWidth++;
    }else{ ctx.lineWidth--;}
    // decrece o crece dependiendo si es true o false
}

canvas.addEventListener('mousemove',draw);

canvas.addEventListener('mousedown', (e) => 
{    
    isDrawing = true;
    // tenemos qe actualizar las coordenadas, antes de mover el mouse, porque justo antes de este, clikeamos
    lastX = e.offsetX;
    lastY = e.offsetY;

});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
