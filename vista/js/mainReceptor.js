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
*/

var app = new Vue({
	el: '#app2',
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
						found = true;
						break;
					}
				}
				if(found == false){
					newE.push(d);
				}
				found = false;
			}
			return newE;
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
