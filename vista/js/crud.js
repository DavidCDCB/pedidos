
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


var app = new Vue({
	el: '#app',
	mounted(){
		var starCountRef = firebase.database().ref('productos');
		starCountRef.on('value', (snapshot) => {
			if(snapshot.val()!=null){
				this.datos = snapshot.val();
			}
			
		});
	},
	data: {
		datos: [],
		datosVisibles: [],
		busqueda: "",
		nombre: "",
		precio: 0,
		id:0,
		oldId:0,
		actualizando:false
	},
	methods:{
		guerdarRegistro(){
			if(!this.actualizando){
				this.prepararId();
				let nuevo = {
					'Id': this.id,
					'Nombre':this.nombre,
					'Precio':this.precio
				};
				this.datos.push(nuevo);
				this.id++;
			}else{
				this.buscarPorId(this.oldId).Nombre = this.nombre;
				this.buscarPorId(this.oldId).Precio = this.precio;
				this.actualizando=false;
			}
			
			this.subirRegistros();
			this.limpiarCampos();
			console.log(this.id);
		},
		prepararId(){
			let ordenados = this.datos.sort((a,b) =>{
				if (a.Id > b.Id) return 1;
				if (a.Id < b.Id) return -1;
				return 0;
			});
			console.log(ordenados[ordenados.length-1].Id);
			this.id = 1+ordenados[ordenados.length-1].Id;
		},
		limpiarCampos(){
			this.nombre = "";
			this.precio = 0;
			this.$refs.rNombre.focus();
		},
		subirRegistros(){
			firebase.database().ref('productos').set(this.datos);
		},
		buscarPorId(id){
			return this.datos.filter(item => item.Id == id)[0];
		},
		eliminar(id){
			this.datos = this.datos.filter(item => item.Id != id);
			//this.id--;
			this.subirRegistros();
		},
		actualizar(id){
			this.nombre = this.datos.filter(item => item.Id == id)[0].Nombre;
			this.precio = this.datos.filter(item => item.Id == id)[0].Precio;
			this.oldId = this.datos.filter(item => item.Id == id)[0].Id;
			this.actualizando=true;
		},
		ordenar(criterio){
			this.datos = this.datos.sort((a,b) =>{
				if (a[criterio] > b[criterio]) return 1;
				if (a[criterio] < b[criterio]) return -1;
				return 0;
			});
		}
		
	}
});
