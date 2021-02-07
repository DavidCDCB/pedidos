'use strict';

import dom from './dom-pruebas.js';//clase estatica
import data from './datos.js'

let productos = [];
let mesas = ["1","2","3","4","5","6","7"];

let asignaciones = [];

((doc, win) => {
	
	doc.addEventListener('DOMContentLoaded',event => {
		document.getElementById("alert").style.display = "none";
		dom.getElemento("cantidades").value=1;

		peticion("https://raw.githubusercontent.com/DavidCDCB/pedidos/master/productos.json").then(
			result =>{
				for (const producto of data) {
					productos.push(producto["nombre"]+"-"+producto["valor"]);
				}
				setItems(doc.querySelector("#productos"),productos);
				setItems(doc.querySelector("#mesas"),mesas);
			}
		);

		dom.getElemento("agregar").addEventListener('click', event => {
			asignar(dom.getElemento("mesas").value,
				dom.getElemento("productos").value,
				dom.getElemento("cantidades").value,
				dom.getElemento("detalles").value,
			);
		});

		dom.getElemento("copiar").addEventListener('click', event => {
			var copyText = document.getElementById("info");
			copyText.select();
			copyText.setSelectionRange(0, 99999);
			document.execCommand("copy");
		});
		preparacionAsignaciones(asignaciones,mesas);
		
	});

	let setItems=(elemento,listado)=>{
		for (const iterator of listado) {
			let option = document.createElement("option");
			option.text = iterator;
			elemento.add(option);
		}
	}

	let asignar=(mesa,producto,cantidad,detalles)=>{
		let total = 0;
		asignaciones[mesa-1]["productos"].push(
			producto.split("-")[0]+" $"+producto.split("-")[1]+" x"+cantidad
		);
		asignaciones[mesa-1]["detalles"]=detalles;

		for (let index = 0; index < cantidad; index++) {
			asignaciones[mesa-1]["total"] += parseInt(producto.split("-")[1]);
		}
		
		dom.getElemento("texto").innerText= producto+" agregado correctamente a mesa # "+mesa;
		dom.getElemento("alert").style.display = "block";
		window.setTimeout(function () {
			dom.getElemento("alert").style.display = "none";
		}, 3000);

		generarInfo();
		console.log(asignaciones);

	}
	
	let preparacionAsignaciones=(dic,lista)=>{
		for (const iterator of lista) {
			dic.push({
				"mesa":lista.indexOf(iterator)+1,
				"productos":[],
				"total":0,
				"detalles":""
			});
		}
	}

	const peticion = async (url) => {
		const response = await fetch(url).then((response)=>{
			return response.json();
		});
		return response;
	}

	let generarInfo=()=>{
		let info = "";

		for (const mesas of asignaciones) {
			if(mesas["productos"].length>0){
				console.log(mesas["mesa"]);
				info += "MESA #"+mesas["mesa"]+" TOTAL "+mesas["total"]+":\n";
				for (const producto of mesas["productos"]) {
					info += "  -> "+producto+"\n";
					console.log(productos);
				}
				if(mesas["detalles"] != "")
					info += "¡NOTA!\n  "+mesas["detalles"];
				info += "\n\n";
			}
		}
		
		console.log(info);
		dom.getElemento("info").value=info;
	}

	

})(document, window);
