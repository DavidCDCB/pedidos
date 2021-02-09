//https://es.vuejs.org/v2/guide/index.html
//https://es.vuejs.org/v2/guide/forms.html
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
		mesas : ["1","2","3","4","5","6","7"],
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
		inicio(datos){
			/*
			for (const producto of datos) {
				this.productos.push(producto["nombre"]+"-"+producto["valor"]);
			}*/
			peticion(this.url).then(
				result =>{
					for (const producto of result) {
						this.productos.push(producto["nombre"]+"-"+producto["valor"]+"-"+producto["categoria"]);
					}
				}
			);

			this.preparacionAsignaciones(this.asignaciones,this.mesas);
			
		},
		enlistarProductos(){
			this.productosFiltrados = [];
			this.seleccionProducto = "";
			this.productosFiltrados=this.productos.filter(
				producto => producto.split("-")[2] == this.seleccionCategoria
			);
		},
		preparacionAsignaciones(dic,lista){
			for (const iterator of lista) {
				dic.push({
					"mesa":lista.indexOf(iterator)+1,
					"productos":[],
					"total":0,
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
			this.asignaciones[mesa-1]["productos"].push(
				"x"+cantidad+" "+producto.split("-")[0]+" $"+producto.split("-")[1]
			);
			this.asignaciones[mesa-1]["detalles"]=detalles;

			for (let index = 0; index < cantidad; index++) {
				this.asignaciones[mesa-1]["total"] += parseInt(producto.split("-")[1]);
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
						tInfo += "\n  ⚠️ ¡NOTA!\n    "+mesas["detalles"];
					tInfo += "------------------------------------------------\n";
				}
			}
			this.cantidades = 1;
			this.info = tInfo;
		},
		copiar(){
			this.$refs.rInfo.focus();
			this.$refs.rInfo.select();
			document.execCommand("copy");
			window.open("https://wa.me/+57"+this.phone+"/?text="+encodeURIComponent(this.info), '_blank');
		},
		eliminar(item){
			console.log(item-1);
			this.asignaciones[item-1].productos=[];
			this.asignaciones[item-1].total=0;
			console.log(this.asignaciones);
			this.generarInfo();
		}
		
	}
});

var bd = [
	{
		"nombre":"Sánd. pepe loco ETHOS",
		"valor":10000,
		"categoria":"Snack"
	},
	{
		"nombre":"Sánd. pollo salsa queso",
		"valor":8000,
		"categoria":"Snack"
	},
	{
		"nombre":"Chips de plátano",
		"valor":4000,
		"categoria":"Snack"
	},
	{
		"nombre":"Nachos",
		"valor":4000,
		"categoria":"Snack"
	},
	{
		"nombre":"Chips de Papa",
		"valor":4000,
		"categoria":"Snack"
	},
	{
		"nombre":"Nachos",
		"valor":4000,
		"categoria":"Snack"
	},
	{
		"nombre":"Club Colombia",
		"valor":4000,
		"categoria":"Cervezas"
	},
	{
		"nombre":"Pilsen",
		"valor":4000,
		"categoria":"Cervezas"
	},
	{
		"nombre":"Póker",
		"valor":4000,
		"categoria":"Cervezas"
	},
	{
		"nombre":"Corona",
		"valor":7000,
		"categoria":"Cervezas"
	},
	{
		"nombre":"Tres cordilleras",
		"valor":7000,
		"categoria":"Cervezas"
	},
	{
		"nombre":"Mi. Tradicional",
		"valor":5000,
		"categoria":"Micheladas"
	},
	{
		"nombre":"Mi. Mango",
		"valor":6000,
		"categoria":"Micheladas"
	},
	{
		"nombre":"Mi. Brava",
		"valor":7000,
		"categoria":"Micheladas"
	},
	{
		"nombre":"Mi. Soda",
		"valor":4000,
		"categoria":"Micheladas"
	},
	{
		"nombre":"Mi. Ethos mango",
		"valor":4000,
		"categoria":"Micheladas"
	},
	{
		"nombre":"Med. Cristal",
		"valor":35000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Antioqueño",
		"valor":33000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Ron viejo de Caldas",
		"valor":40000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Ron 5 años de Caldas",
		"valor":45000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Tequila Jose Cuervo",
		"valor":60000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Brandy Domec",
		"valor":36000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Buchanas",
		"valor":100000,
		"categoria":"Media"
	},
	{
		"nombre":"Med. Old Par",
		"valor":120000,
		"categoria":"Media"
	},
	{
		"nombre":"Bot. Cristal",
		"valor":60000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. antioqueño",
		"valor":58000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. Ron viejo Caldas",
		"valor":70000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. Ron 5 años de Caldas",
		"valor":80000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. Tequila Jose Cuervo",
		"valor":110000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. Brandy Domec",
		"valor":65000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. Buchanas",
		"valor":180000,
		"categoria":"Botella"
	},
	{
		"nombre":"Bot. Old par",
		"valor":160000,
		"categoria":"Botella"
	},
	{
		"nombre":"Tra. Aguardiente",
		"valor":4000,
		"categoria":"Trago"
	},
	{
		"nombre":"Tra. Tequila",
		"valor":9000,
		"categoria":"Trago"
	},
	{
		"nombre":"Tra. Ron",
		"valor":5000,
		"categoria":"Trago"
	},
	{
		"nombre":"Tra. Brandy",
		"valor":5000,
		"categoria":"Trago"
	},
	{
		"nombre":"Tra. Crema cafe Whiskey",
		"valor":9000,
		"categoria":"Trago"
	},
	{
		"nombre":"Tra. Crema natural Whiskey",
		"valor":9000,
		"categoria":"Trago"
	},
	{
		"nombre":"Coc. Mojito",
		"valor":12000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Mojito de F,L,M",
		"valor":15000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Hawái",
		"valor":14000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Caiparinha",
		"valor":16000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Mojito Coco",
		"valor":15000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Pantera rosa",
		"valor":16000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Vodka orange",
		"valor":12000,
		"categoria":"Cocteles"
	},

	{
		"nombre":"Coc. Daiquirí",
		"valor":12000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Maracuyá",
		"valor":16000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Vampiro",
		"valor":25000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Uva ETHOS",
		"valor":9000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Crema (Café)",
		"valor":9000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Coc. Crema (Natural)",
		"valor":9000,
		"categoria":"Cocteles"
	},
	{
		"nombre":"Lim. Coco",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Lim. Cereza",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Lim Natural",
		"valor":4000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Gran. Café",
		"valor":8000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Gran. Frutos rojos",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Gran. Oreo",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Gran. Milo",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Gran. Lulo Maraculla",
		"valor":7000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Gran. Ethos",
		"valor":7000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Milo Frio",
		"valor":4000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Malteada Chocolate",
		"valor":8000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Malteada Frutos",
		"valor":9000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Malteada Leches",
		"valor":8000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Soda ETHOS",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Soda cereza",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Soda fresa",
		"valor":6000,
		"categoria":"Bebidas Frias"
	},
	{
		"nombre":"Café americano",
		"valor":2000,
		"categoria":"Bebidas Calientes"
	},
	{
		"nombre":"Café Expresso",
		"valor":2000,
		"categoria":"Bebidas Caliente"
	},
	{
		"nombre":"Capuccino",
		"valor":3000,
		"categoria":"Bebidas Caliente"
	},
	{
		"nombre":"Capuccino Licor",
		"valor":6000,
		"categoria":"Bebidas Caliente"
	},
	{
		"nombre":"Mokaccino",
		"valor":4000,
		"categoria":"Bebidas Caliente"
	},
	{
		"nombre":"Milo",
		"valor":4000,
		"categoria":"Bebidas Caliente"
	},
	
	{
		"nombre":"Aromatica Frutos Rojos",
		"valor":3500,
		"categoria":"Bebidas Caliente"
	},
	
	{
		"nombre":"Aromatica Frutos Amarillos",
		"valor":3500,
		"categoria":"Bebidas Caliente"
	}
];

app.inicio(bd);