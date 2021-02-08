//https://es.vuejs.org/v2/guide/index.html
//https://es.vuejs.org/v2/guide/forms.html
//<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js" defer></script> 

let peticion = async (url) => {
	const response = await fetch(url).then((response)=>{
		return response.json();
	});
	return response;
}

let mensaje = (elemento) =>{
	window.setTimeout(function () {
		elemento=false;
	}, 3000);
}

var app = new Vue({
	el: '#app',
	data: {
		seleccionMesas: "1",
		cantidades: 1,
		seleccionProducto: "",
		detalles: "",
		productos: [],
		asignaciones: [],
		mesas : ["1","2","3","4","5","6","7"],
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
			peticion("https://raw.githubusercontent.com/DavidCDCB/pedidos/master/productos.json").then(
				result =>{
					for (const producto of result) {
						this.productos.push(producto["nombre"]+"-"+producto["valor"]);
					}
				}
			);

			
			this.preparacionAsignaciones(this.asignaciones,this.mesas);
			
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
		ver(seleccion){
			console.log(seleccion);
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
			mensaje(this.message);

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
						tInfo += "\n  👉 "+producto+"\n";
						
					}
					if(mesas["detalles"] != "")
						tInfo += "\n  ⚠️ ¡NOTA!\n    "+mesas["detalles"];
					tInfo += "\n------------------------------------------------\n";
				}
			}
			this.info = tInfo;
		},
		copiar(){

		}
		
	}
});

var bd = [
	{
		"nombre":"Sánd. pepe loco ETHOS",
		"valor":10000
	},
	{
		"nombre":"Sánd. pollo salsa queso",
		"valor":8000
	},
	{
		"nombre":"Chips de plátano",
		"valor":4000
	},
	{
		"nombre":"Nachos",
		"valor":4000
	},
	{
		"nombre":"Club Colombia",
		"valor":4000
	},
	{
		"nombre":"Pilsen",
		"valor":4000
	},
	{
		"nombre":"Póker",
		"valor":4000
	},
	{
		"nombre":"Corona",
		"valor":7000
	},
	{
		"nombre":"Tres cordilleras",
		"valor":7000
	},
	{
		"nombre":"Mi. Tradicional",
		"valor":5000
	},
	{
		"nombre":"Mi. Mango",
		"valor":6000
	},
	{
		"nombre":"Mi. Brava",
		"valor":7000
	},
	{
		"nombre":"Mi. Soda",
		"valor":4000
	},
	{
		"nombre":"Mi. Ethos mango",
		"valor":4000
	},
	{
		"nombre":"Med. Cristal",
		"valor":35000
	},
	{
		"nombre":"Med. Antioqueño",
		"valor":33000
	},
	{
		"nombre":"Med. Ron viejo de Caldas",
		"valor":40000
	},
	{
		"nombre":"Med. Ron 5 años de Caldas",
		"valor":45000
	},
	{
		"nombre":"Med. Tequila Jose Cuervo",
		"valor":60000
	},
	{
		"nombre":"Med. Brandy Domec",
		"valor":36000
	},
	{
		"nombre":"Med. Buchanas",
		"valor":100000
	},
	{
		"nombre":"Med. Old Par",
		"valor":120000
	},
	{
		"nombre":"Bot. Cristal",
		"valor":60000
	},
	{
		"nombre":"Bot. antioqueño",
		"valor":58000
	},
	{
		"nombre":"Bot. Ron viejo Caldas",
		"valor":70000
	},
	{
		"nombre":"Bot. Ron 5 años de Caldas",
		"valor":80000
	},
	{
		"nombre":"Bot. Tequila Jose Cuervo",
		"valor":110000
	},
	{
		"nombre":"Bot. Brandy Domec",
		"valor":65000
	},
	{
		"nombre":"Bot. Buchanas",
		"valor":180000
	},
	{
		"nombre":"Bot. Old par",
		"valor":160000
	},
	{
		"nombre":"Tra. Aguardiente",
		"valor":4000
	},
	{
		"nombre":"Tra. Tequila",
		"valor":9000
	},
	{
		"nombre":"Tra. Ron",
		"valor":5000
	},
	{
		"nombre":"Tra. Brandy",
		"valor":5000
	},
	{
		"nombre":"Tra. Crema cafe Whiskey",
		"valor":9000
	},
	{
		"nombre":"Tra. Crema natural Whiskey",
		"valor":9000
	},
	{
		"nombre":"Coc. Mojito",
		"valor":12000
	},
	{
		"nombre":"Coc. Mojito de F,L,M",
		"valor":15000
	},
	{
		"nombre":"Coc. Hawái",
		"valor":14000
	},
	{
		"nombre":"Coc. Caiparinha",
		"valor":16000
	},
	{
		"nombre":"Coc. Mojito Coco",
		"valor":15000
	},
	{
		"nombre":"Coc. Pantera rosa",
		"valor":16000
	},
	{
		"nombre":"Coc. Vodka orange",
		"valor":12000
	},

	{
		"nombre":"Coc. Daiquirí",
		"valor":12000
	},
	{
		"nombre":"Coc. Maracuyá",
		"valor":16000
	},
	{
		"nombre":"Coc. Vampiro",
		"valor":25000
	},
	{
		"nombre":"Coc. Uva ETHOS",
		"valor":9000
	},
	{
		"nombre":"Coc. Crema (Café)",
		"valor":9000
	},
	{
		"nombre":"Coc. Crema (Natural)",
		"valor":9000
	},
	{
		"nombre":"Lim. Coco",
		"valor":6000
	},
	{
		"nombre":"Lim. Cereza",
		"valor":6000
	},
	{
		"nombre":"Lim Natural",
		"valor":4000
	},
	{
		"nombre":"Gran. Café",
		"valor":8000
	},
	{
		"nombre":"Gran. Frutos rojos",
		"valor":6000
	},
	{
		"nombre":"Gran. Oreo",
		"valor":6000
	},
	{
		"nombre":"Gran. Milo",
		"valor":6000
	},
	{
		"nombre":"Gran. Lulo Maraculla",
		"valor":7000
	},
	{
		"nombre":"Gran. Ethos",
		"valor":7000
	},
	{
		"nombre":"Milo Frio",
		"valor":4000
	},
	{
		"nombre":"Malteada Chocolate",
		"valor":8000
	},
	{
		"nombre":"Malteada Frutos",
		"valor":9000
	},
	{
		"nombre":"Malteada Leches",
		"valor":8000
	},
	{
		"nombre":"Soda ETHOS",
		"valor":6000
	},
	{
		"nombre":"Soda cereza",
		"valor":6000
	},
	{
		"nombre":"Soda fresa",
		"valor":6000
	},
	{
		"nombre":"Café americano",
		"valor":2000
	},
	{
		"nombre":"Café Expresso",
		"valor":2000
	},
	{
		"nombre":"Capuccino",
		"valor":3000
	},
	{
		"nombre":"Capuccino Licor",
		"valor":6000
	},
	{
		"nombre":"Mokaccino",
		"valor":4000
	},
	{
		"nombre":"Milo",
		"valor":4000
	},
	
	{
		"nombre":"Aromatica Frutos Rojos",
		"valor":3500
	},
	
	{
		"nombre":"Aromatica Frutos Amarillos",
		"valor":3500
	}
];

app.inicio(bd);