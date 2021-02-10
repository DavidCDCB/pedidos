//https://es.vuejs.org/v2/guide/index.html
//https://es.vuejs.org/v2/guide/forms.html
//https://www.youtube.com/watch?v=xqb02MxZqyM&list=PLkX2mGB_95MmJxV4Agv_m_gBlKhjBxqgx
//https://www.youtube.com/watch?v=iENgabVQSYY
//<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js" defer></script> 

let peticion = async (url) => {
	const response = await fetch(url).then((response)=>{
		return response.json();
	});
	return response;
}


var app = new Vue({
	el: '#app',
	data: {
		url:"https://raw.githubusercontent.com/DavidCDCB/pedidos/modoVue/productos.json",
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
		categorias : [
			"Snack",
			"Cervezas",
			"Micheladas",
			"Media",
			"Botella",
			"Trago",
			"Cocteles",
			"Bebidas Frias",
			"Bebidas Calientes"
		],
		info: "",
		message: false,
		texto: ""
	},
	methods:{
		inicio(){
			peticion(this.url).then(
				result =>{
					for (const producto of result) {
						this.productos.push(producto["nombre"]+"-"+producto["valor"]+"-"+producto["categoria"]);
					}
				}
			);

			this.preparacionAsignaciones(this.asignaciones,this.nMesas);
		},
		enlistarProductos(){
			this.productosFiltrados = [];
			this.seleccionProducto = "";
			this.productosFiltrados=this.productos.filter(
				producto => producto.split("-")[2] == this.seleccionCategoria
			);
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
			console.log(this.asignaciones);
			this.message=true;
			this.texto = this.seleccionProducto+" agregado correctamente a mesa # "+this.seleccionMesas;
			this.generarInfo();
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
		},
		generarInfo(){
			let tInfo = "";
	
			for (const mesas of this.asignaciones) {
				if(mesas["productos"].length>0){
					console.log(mesas["mesa"]);
					tInfo += "🍱 MESA #"+mesas["mesa"]+"  \n💵 TOTAL $"+new Intl.NumberFormat().format(parseInt(mesas["total"]))+":\n";
					for (const producto of mesas["productos"]) {
						tInfo += "  👉 "+producto+"\n";
					}
					if(mesas["detalles"] != "")
						tInfo += "  ⚠️ ¡NOTA!\n    "+mesas["detalles"];
					tInfo += "\n------------------------------------------------\n";
				}
			}
			this.cantidades = 1;
			this.info = tInfo;
		},
		mensajePedido(ind){
			let nMesa = this.asignaciones[ind].mesa;
			let nCantidad = this.asignaciones[ind].cantidad;
			let nTotal = Intl.NumberFormat().format(this.asignaciones[ind].total);
			return "<b>Mesa #"+nMesa+"</b> a pedido "+nCantidad+" productos,con un total de $"+nTotal+"."
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
		eliminar(item){
			this.asignaciones[item-1].productos=[];
			this.asignaciones[item-1].total=0;
			this.asignaciones[item-1].cantidad=0;
			this.asignaciones[item-1].detalles="";
			this.generarInfo();
		}
		
	}
});


app.inicio();