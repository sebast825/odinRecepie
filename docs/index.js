const contenedor = document.querySelector('.container');
const btnLimpiar = document.querySelector('.btn__color')
const opcionColor = document.querySelector('.opcionColor');
const numCasillasLabel = document.querySelector('.numCasillasLabel');
const btnColor =document.querySelectorAll('.elegirColor')
//para seleccionar el tipo de color
const colorTradicional = document.getElementById('colorTradicional');
const colorRandom = document.getElementById('colorRandom');
const colorWhite = document.getElementById('colorWhite');
const colorElegir = document.getElementById('colorInput');


//variable para cambiarColor
let elColor;
let elegirColor=[]
let click;

function aplicarCasillas(e=16){	
	console.log(e)
	//cantidad de casillas totales
	let casillas = e*e		
	//medidas grid
	contenedor.style.gridTemplateColumns = `repeat(${e},1fr)`;
	numCasillasLabel.innerHTML = `${e} * ${e}`
	// contenedor.style.gridTemplateRows = `repeat(${e},1fr)`;	
	// console.style['grid-auto-rows']= 
	const infoContenedor = contenedor.getBoundingClientRect()
	let coords = {
		width: infoContenedor.width,
		height:infoContenedor.height
	}
	//genera las caillas
	for(let i=0;i<casillas;i++){
		let a = document.createElement('div');
		a.classList.add('item');
		//le da medidas
		let altura = a.style.width=coords.width/e+'px';
		let width= a.style.height=altura;
		// console.log(asd,abs);
		//llama al imte
		let b = document.querySelectorAll('.item');
		
		
		//tiene que estar adentro o no anda el evento
		sinColorFondo(b)
		a.addEventListener('mouseover',cambiarColor)
		contenedor.appendChild(a)	
	}		
}



//saca el color de fondo
function sinColorFondo(){
	console.log('asd')
	contenedor.childNodes.forEach(element=>{
		element.style['background-color']='transparent';
	})
}
//borra todos los elementos para crear los nuevos
function borrarElementos(){	
	while(contenedor.firstChild){
		contenedor.removeChild(contenedor.firstChild);
	}
}


function casillass(e){
	e.preventDefault()	
	console.log('casillas')		
	let numCasillas=(this.numCasillas.value)	
	// boorra las casillas anteriores
	borrarElementos()
	//crea las caillas
	aplicarCasillas(numCasillas)
}

//le da color de fondo
function cambiarColor(){
	if(click==false)return;
	// console.log('asd')
	console.log('cambiarcolor')
	if(elColor==undefined){
		this.style['background-color']='#1ae';
	}
	else if(elColor==0){
		if(this.style['background-color']=='transparent'){		
			let color = 55;
			this.style['background-color']=`rgb(${color},${color},${color})`
		}else {
			//separa el rgb hasta tomar los valores		
			a = this.style['background-color'].split("(")[1].split(")")[0];
			a = a.split(",");
			let color = parseFloat(a)+30
			//para que siempre se quede en gris
			if(color>=240){
				color=220				 
			}	
			this.style['background-color']=`rgb(${color},${color},${color})`
		}		
	}else if(elColor==1){
		let color1 = Math.floor(Math.random()*256)+0;
		let color2 = Math.floor(Math.random()*256)+0;
		let color3 = Math.floor(Math.random()*256)+0;
		this.style['background-color']=`rgb(${color1},${color2},${color3})`		
	}else if(elColor==2){		
		this.style['background-color']='transparent'		
	}else if(elColor==3){
		this.style['background-color']=`${elegirColor}`
	}	
}

function btnActivo(){
	btnColor.forEach(elem=>{
		elem.classList.remove('atr')
	})
	this.classList.add('atr')
}

// console.log(opcionColor.childNodes)
document.formulario.addEventListener('change',casillass)
btnLimpiar.addEventListener('click',sinColorFondo);

//elige el color
colorTradicional.addEventListener('click',()=>elColor=0);
colorRandom.addEventListener('click',()=>elColor=1);
colorWhite.addEventListener('click',()=>elColor=2);
colorElegir.addEventListener('change',function(){
	elColor=3;
	elegirColor=this.value;
	console.log(this.value);
})
btnColor.forEach(elem=>elem.addEventListener('click',btnActivo));
document.addEventListener('mousedown',()=>click=false);
document.addEventListener('mouseup',()=>click=true);