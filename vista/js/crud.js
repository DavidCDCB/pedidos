
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
		this.getPass();

	},
	data: {
		datos: [],
		datosVisibles: [],
		busqueda: "",
		nombre: "",
		valor: "",
		categoria: "",
		phone: "",
		id:0,
		oldId:0,
		actualizando:false,
		session: false,
		pass:"",
		UpPass:""
	},
	methods:{
		checkPass(){
			if(this.pass == this.UpPass){
				var starCountRef = firebase.database().ref('productos');
				starCountRef.on('value', (snapshot) => {
					if(snapshot.val()!=null){
						this.datos = snapshot.val();
					}
					this.session = true;
				});
			}
		},
		async getPass(){
			await axios.get('https://pruebabd-7538a-default-rtdb.firebaseio.com/key.json').then(r => {
				this.UpPass = r.data.password;
			});
		},
		guerdarRegistro(){
			if(!this.actualizando){
				if(this.datos.length > 0){
					this.prepararId();
				}
				let nuevo = {
					'Id': this.id,
					'nombre':this.nombre,
					'valor':this.valor,
					'categoria':this.categoria.toLowerCase(),
				};
				this.datos.push(nuevo);
				this.id++;
			}else{
				this.buscarPorId(this.oldId).nombre = this.nombre;
				this.buscarPorId(this.oldId).valor = this.valor;
				this.buscarPorId(this.oldId).categoria = this.categoria;
				this.actualizando=false;
			}
			
			this.subirRegistros();
			this.limpiarCampos();
			console.log(this.id);
		},
		setNumber(){
			this.phone = prompt("Ingrese número de la persona encargada de preparar pedidos");
			if(this.phone!=null){
				axios.put('https://pruebabd-7538a-default-rtdb.firebaseio.com/encargado.json',
				{
					"numero": this.phone
				},{
				headers:{
					'Content-Type': 'application/json'
				}}
				).then(response => {
					console.log(response);
				});
			}
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
			this.valor = "";
			this.categoria = "";
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
			this.nombre = this.datos.filter(item => item.Id == id)[0].nombre;
			this.valor = this.datos.filter(item => item.Id == id)[0].valor;
			this.categoria = this.datos.filter(item => item.Id == id)[0].categoria;
			this.oldId = this.datos.filter(item => item.Id == id)[0].Id;
			this.actualizando=true;
		},
		ordenar(criterio){
			this.datos = this.datos.sort((a,b) =>{
				if (a[criterio] > b[criterio]) return 1;
				if (a[criterio] < b[criterio]) return -1;
				return 0;
			});
		},
		redireccionar(){
			//window.location.href="../receptor.html";
			this.nMesas = prompt("Ingrese la cantidad actual de mesas");
			if(this.nMesas!=null){
				axios.put('https://pruebabd-7538a-default-rtdb.firebaseio.com/mesas.json',
				{
					"cantidadMesas": parseInt(this.nMesas)
				},{
				headers:{
					'Content-Type': 'application/json'
				}}
				).then(response => {
					console.log(response);
				});
			}
		}
		
	}
});
