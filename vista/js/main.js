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
/*
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
		this.getNumber();
		this.getMesas();
		axios.get(this.linkDb)
		.then(response => {
			this.bd=response.data;
			this.inicio();
		}).catch(error => {
			console.log(error);
		});

		/*
		axios.get('https://pruebabd-7538a-default-rtdb.firebaseio.com/pedidos.json')
		.then(response => {
			console.log(response.data);
			for (const iterator of response.data) {
				this.upData.push(iterator);
			}
			
		}).catch(error => {
			console.log(error);
		});*/

		//this.uploadData([]);
	},
	data: {
		//'https://pruebabd-7538a-default-rtdb.firebaseio.com/bdProductos.json'
		linkDb: "https://pruebabd-7538a-default-rtdb.firebaseio.com/productos.json",
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
		mesasAtendidas: [],
		adicionales: [],
		adicion: false,
		nMesas: 0,
		mesas : [],
		categorias : [],
		info: "",
		send: false,
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
		async getNumber(){
			await axios.get('https://pruebabd-7538a-default-rtdb.firebaseio.com/encargado.json').then(r => {
				this.phone = r.data.numero;
			});
		},
		async getMesas(){
			await axios.get('https://pruebabd-7538a-default-rtdb.firebaseio.com/mesas.json').then(r => {
				this.nMesas = r.data.cantidadMesas;
			});
		},
		async getInfoClient(){
			// https://ipapi.co/api/?javascript#introduction	
			let ubicacion = "";
			await axios.get('https://ipapi.co/json').then(r => {
				ubicacion += r.data.country_name+"/";
				ubicacion += r.data.region+"/";
				ubicacion += r.data.city+"/";
				ubicacion += r.data.ip;
				console.log(ubicacion);
			});

			let data = {
				"Ubicacion": ubicacion,
				"Fecha Hora":new Date().toString(),
				"Sistema Operativo":navigator.platform,
				"Detalles UserAgent":navigator.userAgent
			}
			axios.post('https://pruebabd-7538a-default-rtdb.firebaseio.com/access.json',
			data,{
			headers:{
				'Content-Type': 'application/json'
			}}
			).then(response => {
				console.log(response);
			});
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
			//this.tiempo = 28-new Date().getDate();
			if(this.tiempo == 0){
				console.log(new Date().getDate());
				//https://sweetalert.js.org/guides/
				swal({
					text: `Versión de prueba gratuita`,
					className: "",
					icon: "warning",
					button: "OK",
					dangerMode: true
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
				this.adicionales.push(0);
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
				this.seleccionCategoria,
				this.seleccionProducto,
				this.cantidades,
				this.detalles
			);
			console.log(this.asignaciones);
			this.message=true;
			this.texto = this.seleccionProducto+" agregado correctamente a mesa # "+this.seleccionMesas;
			this.generarInfo();
			this.seleccionProducto = "";
		},
		asignar(mesa,categoria,producto,cantidad,detalles){
			let total = 0;
			let add = "";

			if(detalles.length != 0){
				this.asignaciones[mesa-1].detalles = detalles;
			} 
			if(this.adicion){
				this.adicion = false;
				this.adicionales[mesa-1]++;
				add = "➕Adicionales #"+this.adicionales[mesa-1]+":\n";
			}

			this.asignaciones[mesa-1].productos.push(
				add+"📝x"+cantidad+" de "+categoria+"\n  👉🏻"+producto.split("-")[0]+" $"+producto.split("-")[1]
			);
			this.asignaciones[mesa-1].cantidad += parseInt(cantidad);

			for (let index = 0; index < cantidad; index++) {
				this.asignaciones[mesa-1].total += parseInt(producto.split("-")[1]);
			}
			if(this.upData.includes(this.asignaciones[mesa-1]) == false || this.upData.length == 0){
				this.upData.push(this.asignaciones[mesa-1]);
			}
			
			console.log(this.upData);
		},
		generarInfo(){
			let tInfo = "";
	
			for (const mesas of this.asignaciones) {
				if(mesas["productos"].length>0){
					console.log(mesas["mesa"]);
					tInfo += "🍻 MESA #"+mesas["mesa"]+"  \n💵 TOTAL $"+new Intl.NumberFormat().format(parseInt(mesas["total"]))+":\n";
					for (const producto of mesas["productos"]) {
						tInfo += "\n"+producto+"\n";
					}
					if(mesas["detalles"] != "")
						tInfo += "\n⚠️ ¡NOTA!\n "+mesas["detalles"]+"\n";
					tInfo += "------------------------------------------------\n";
				}
			}
			this.cantidades = 1;
			this.info = tInfo;
			this.send = false;
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
		subirDatos(){
			console.log(this.upData);
			this.uploadData(this.upData);
			this.send = true;
			swal({
				text: `¡Pedidos subidos a la nube correctamente!`,
				className: "",
				icon: "success",
				button: "OK",
			});
		},
		eliminar(item){
			this.asignaciones[item-1].productos=[];
			this.asignaciones[item-1].total=0;
			this.asignaciones[item-1].cantidad=0;
			this.asignaciones[item-1].detalles="";
			this.adicionales[item-1] = 0;
			this.generarInfo();
			//this.uploadData(this.asignaciones);
		},
		verificarBotones(){
			return (this.seleccionCategoria=="" || this.seleccionProducto=="");
		},
		
	}
});
