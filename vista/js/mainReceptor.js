//https://es.vuejs.org/v2/guide/index.html
//https://es.vuejs.org/v2/guide/forms.html
//https://www.youtube.com/watch?v=xqb02MxZqyM&list=PLkX2mGB_95MmJxV4Agv_m_gBlKhjBxqgx
//https://www.youtube.com/watch?v=iENgabVQSYY
//https://www.youtube.com/watch?v=GAQB7Y4X5fM&list=PLPl81lqbj-4J-gfAERGDCdOQtVgRhSvIT
//<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js" defer></script> 

//Almacenamiento local:
//https://es.vuejs.org/v2/cookbook/client-side-storage.html

//Json alojado
//https://jsonbin.io/
//https://www.npoint.io/docs/aaed1f27f53781275f31



//https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es
//https://www.youtube.com/watch?v=itNsRn1kjLU
//https://firebase.google.com/docs/database/web/start

var firebaseConfig = {
    apiKey: "AIzaSyAvlVJ9p2fBDhhqtJW4RdMmm-RtmRaFxgY",
    authDomain: "pruebabd-7538a.firebaseapp.com",
    projectId: "pruebabd-7538a",
    storageBucket: "pruebabd-7538a.appspot.com",
    messagingSenderId: "1005652515792",
    appId: "1:1005652515792:web:5f91ee7ea9062789ad77d5"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/*
var database = firebase.database();

firebase.database().ref('pedidos').set({
    'username': 'wewe',
    'email': 'wdssd'
});

var starCountRef = firebase.database().ref('pedidos');
starCountRef.on('value', (snapshot) => {
	const data = snapshot.val();
	console.log(data);
});



//Creando Tabla documendo vacio y id por defecto
//firebase.firestore().collection("usuarios").doc().set({});

async function setData(data = {}) {
	const db = firebase.firestore();
	const response = await db.collection('usuarios').add(data);
	return response;
}

async function getData() {
	const db = firebase.firestore();
	const querySnapshot = await db.collection('usuarios').get();
	querySnapshot.forEach(element => {
		console.log(element.id,element.data());
	});
}


setData({
	nombre:'david',
	apellido:'cruz'
}).then(data => {
	console.log(data); // JSON data parsed by `data.json()` call
});

getData();




//https://firebase.google.com/docs/database/rest/save-data#section-update
const data = [{
	'firstName': 'David',
	'lastName': 'Cruz'
},
{
	'firstName': 'dsds',
	'lastName': 'dsds'
}
];

axios.put('https://pruebabd-7538a-default-rtdb.firebaseio.com/usuarios.json',
	data,{
	headers:{
		'Content-Type': 'application/json'
	}}
).then(response => {
	console.log(response);
});

axios.get('https://pruebabd-7538a-default-rtdb.firebaseio.com/usuarios.json?print=pretty')
.then(response => {
	console.log(response.data);
}).catch(error => {
	console.log(error);
});


const options = {
	headers: {
		'X-Master-Key': '$2b$10$LhCbDpA5gOD3zUpsiCMNLOqpMALprhx4suc18LQUwiYgxYQPmJcgS',
		'Content-Type': 'application/json'
	}
};

axios.post('https://api.jsonbin.io/v3/b',
	{
		'firstName': 'Fred',
		'lastName': 'Flintstone'
  	},
	options
).then(response => {
	console.log(response);
});



 // Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		headers: 	{
		'X-Master-Key': '$2b$10$LhCbDpA5gOD3zUpsiCMNLOqpMALprhx4suc18LQUwiYgxYQPmJcgS',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}
  
postData('https://api.jsonbin.io/v3/b', {
	'firstName': 'Fred',
	'lastName': 'Flintstone'
}).then(data => {
	console.log(data); // JSON data parsed by `data.json()` call
}); */

var app = new Vue({
	el: '#app',
	mounted(){
		var starCountRef = firebase.database().ref('pedidos');
		starCountRef.on('value', (snapshot) => {
			const data = snapshot.val();
			if(data != null){
				this.upData = this.upData.concat(this.checkE(data));
			}
			this.generarInfo();
		});
	},
	data: {
		bd: null,
		phone:"3185153771",
		seleccionMesas: "1",
		cantidades: 1,
		seleccionCategoria: "",
		seleccionProducto: "",
		detalles: "",
		productos: [],
		productosFiltrados: [],
		asignaciones: [],
		nMesas: 7,
		mesas : [],
		categorias : [],
		info: "",
		message: false,
		texto: "",
		tiempo: 0,
		upData: []
	},
	computed: {
		filtrar() {
			return this.productos.filter(
				producto => producto.split("-")[2] == this.seleccionCategoria
			);
		},
		buscarElemento(){
			return this.db.filter(item => item.nombre.includes("Poker"));
		}
	},
	methods:{
		getString(element){
			return element.mesa+element.productos.toString();
		},

		checkE(data){
			let newE = [];
			let found = false;
			for(d of data){
				for(du of this.upData){
					console.log(this.getString(d),this.getString(du));
					if(this.getString(d) == this.getString(du)){
						console.log("---");
						found = true;
						break;
					}
				}
				if(found == false){
					newE.push(d);
					console.log(newE);
				}
				found = false;
			}
			return newE;
		},

		//https://tingle.robinparisi.com/
		modal(text){
			var modal = new tingle.modal({
				footer: false,
				stickyFooter: true,
				closeMethods: ['overlay', 'button', 'escape'],
				closeLabel: "",
				cssClass: ['custom-class-1', 'custom-class-2'],
				onOpen: function() {
					console.log('modal open');
				},
				onClose: function() {
					console.log('modal closed');
				}
			});

			modal.setContent(text);
			modal.open();
			// close modal
			//modal.close();		
		},
		uploadData(data){
			axios.put('https://pruebabd-7538a-default-rtdb.firebaseio.com/pedidos.json',
			data,{
			headers:{
				'Content-Type': 'application/json'
			}}
			).then(response => {
				console.log(response);
			});
		},
		inicio(){
			this.tiempo = 28-new Date().getDate();
			
			if(this.tiempo >= 0){
				
				//https://sweetalert.js.org/guides/
				swal({
					text: `Versión de prueba por ${this.tiempo} días.`,
					className: "",
					icon: "warning",
					button: "OK",
				});
				for (const producto of this.bd) {
					this.productos.push(producto["nombre"]+"-"+producto["valor"]+"-"+producto["categoria"]);
					this.enlistarCategoria(producto["categoria"]);
				}
				this.preparacionAsignaciones(this.asignaciones,this.nMesas);
			}else{
				swal({
					text: `Tiempo de prueba expirado. Por favor contactese con el desarrollador para obtener la versión ilimitada.`,
					icon: "error",
					button: "OK",
					dangerMode: true
				});
			}
		},
		enlistarCategoria(categoria){
			if(!this.categorias.includes(categoria) || this.categorias.length==0){
				this.categorias.push(categoria);
			}
		},
		preparacionAsignaciones(dic,nMesas){
			for (let index = 1; index <= nMesas; index++) {
				this.mesas.push(index.toString());
			}
			for (const iterator of this.mesas) {
				dic.push({
					"mesa":this.mesas.indexOf(iterator)+1,
					"productos":[],
					"total":0,
					"cantidad":0,
					"detalles":""
				});
			}
		},
		focoCantidad(){
			this.$refs.rCantidad.focus();
			this.$refs.rCantidad.select();
		},
		agregar(){
			this.asignar(
				this.seleccionMesas,
				this.seleccionProducto,
				this.cantidades,
				this.detalles
			);
			//console.log(this.asignaciones);
			this.message=true;
			this.texto = this.seleccionProducto+" agregado correctamente a mesa # "+this.seleccionMesas;
			this.generarInfo();
			this.seleccionProducto = "";
		},
		asignar(mesa,producto,cantidad,detalles){
			let total = 0;
			this.asignaciones[mesa-1].productos.push(
				"x"+cantidad+" "+producto.split("-")[0]+" $"+producto.split("-")[1]
			);
			this.asignaciones[mesa-1].detalles = detalles;
			this.asignaciones[mesa-1].cantidad += parseInt(cantidad);

			for (let index = 0; index < cantidad; index++) {
				this.asignaciones[mesa-1].total += parseInt(producto.split("-")[1]);
			}

			//this.uploadData(this.asignaciones);
			firebase.database().ref('pedidos').set(this.asignaciones);
		},
		generarInfo(){
			let tInfo = "";
			let mesas;
			if(this.upData != null){
				for (const i in this.upData) {
					mesas = this.upData[i];
					if(mesas["productos"] != undefined){
						if(mesas["productos"].length>0 ){
							
							tInfo += "🍱 MESA #"+mesas["mesa"]+"  \n💵 TOTAL $"+new Intl.NumberFormat().format(parseInt(mesas["total"]))+":\n";
							for (const producto of mesas["productos"]) {
								tInfo += "  👉 "+producto+"\n";
							}
							if(mesas["detalles"] != "")
								tInfo += "  ⚠️ ¡NOTA!\n    "+mesas["detalles"];
							tInfo += "\n------------------------------------------------\n";
						
						}
					}
				}
			}
			this.cantidades = 1;
			this.info = tInfo;
		},
		mensajePedido2(ind){
			let nMesa = this.asignaciones[ind].mesa;
			let nCantidad = this.asignaciones[ind].cantidad;
			let nTotal = Intl.NumberFormat().format(this.asignaciones[ind].total);
			return [nMesa,nCantidad,nTotal]
		},
		copiar(){
			this.$refs.rInfo.focus();
			this.$refs.rInfo.select();
			document.execCommand("copy");
			window.open("https://wa.me/+57"+this.phone+"/?text="+encodeURIComponent(this.info), '_blank');
		},
		eliminar(){
			this.upData = [];
			this.generarInfo();
			this.uploadData(this.upData);
		},
		verificarBotones(){
			return (this.seleccionCategoria=="" || this.seleccionProducto=="");
		}
		
	}
});
