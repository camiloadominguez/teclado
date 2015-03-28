var debug = "";
window.onload = function()
{
	operacion = "";
	cifras = []; //Guardará las cifras...
	code = " ";
	op = " ";
	//var numero = " ";
	var ultimo = " ";
	var ultimaCifra;
	operaciones = [
						{
							"tipo" 		: "Suma", 
							"operador"	: "+"
						},
						{
							"tipo" 		: "Resta", 
							"operador"	: "-"
						},
						{
							"tipo" 		: "Multiplicación", 
							"operador"	: "*"
						},
						{
							"tipo" 		: "División", 
							"operador"	: "/"
						}];
	//Para capturar los números...
	for(var i = 0; i <= 9; i++)
	{
		nom_div("numero_" + i).addEventListener('click', function(event)
		{
			//console.log("Valor de I: " + i);
			numero = event.target.id.split("_")[1];
			insertaNumeros(numero);
		});
		if(i >= 1 && i <= 4)
		{
			//Para los operadores...
			nom_div("operador_" + i).addEventListener('click', function(event)
			{
				//Saber si el final hay un operador...
				var ultimo = operacion.charAt(operacion.length - 1);
				if(!existeOperador(ultimo) && operacion !== "")
				{
					var operador = Number(event.target.id.split("_")[1]);
					var txtOperador = operaciones[operador - 1].operador;					
					operacion += txtOperador;
					nom_div("pantalla").innerHTML = operacion;
					//console.log(operaciones[operador - 1].tipo);
				}
			});
			//Para las demás acciones (limpiar, igual y punto)...
			if(i <= 3)
			{
				//console.log("acciones_" + i);
				nom_div("acciones_" + i).addEventListener('click', function(event)
				{
					var accion = Number(event.target.id.split("_")[1]);
					//console.log("Acción es: " + accion);
					var resultado = "";
					switch(accion)
					{
						case 1: operacion = ""; cifras = []; break;
						case 2: //Primero saber si ya existe un punto...
								//Traer la última cifra...
								ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf(".") < 0)
								{
									operacion += ".";
									cifras[cifras.length - 1] += ".";
								}
								resultado = operacion;
								break;
						case 3: 
								//Buscar al final si existe un operador
								if(operacion !== "")
								{
								    ultimo = operacion.charAt(operacion.length - 1);
									if(existeOperador(ultimo))
									{
										//Eliminar el último operador...
										operacion = operacion.substr(0, operacion.length - 1);
									}
									cifras = [];
									resultado = eval(operacion);
									operacion = cifras[0] = String(resultado);
								}
								break;
					}
					nom_div("pantalla").innerHTML = resultado;
				});
			}
		}
	}


	var insertaNumeros = function(numero)
	{
		if(numero == 43 || numero == 42 || numero == 45 || numero == 47)
		{
			console.log(String.fromCharCode(numero));
		var ot = "";
				ot = String.fromCharCode(numero);
				var ult = operacion.charAt(operacion.length - 1);
				if(!existeOperador(ult) && operacion !== "")
				{
				
					operacion += ot;
					nom_div("pantalla").innerHTML = operacion;
					//console.log(operaciones[operador - 1].tipo);
				}
		numero="";
		}
		if(numero===27)
		{
			operacion = "";
			cifras = [];
			numero = "";
		}
		if(numero===41)
		{
			punto();
			numero = "";
		}
		if(numero===13)
		{
			igual();
		}
		else
		{
			operacion += numero;
			var cont = 0;
			cifras[cont] = "";
			for(var c = 0; c < operacion.length; c++)
			{
				if(!existeOperador(operacion.charAt(c)) || operacion.charAt(c) === ".")
				{
					cifras[cont] += operacion.charAt(c);
				}
				else
				{
					cont++;
					cifras[cont] = "";
				}
			}
        }
		nom_div("pantalla").innerHTML = operacion;
	};

	//Para saber si existe un operador...
	var existeOperador = function(operador)
	{
		var existe = false; //Para saber si existe un operador al final...
		//Saber si es un operador...
		for(var c in operaciones)
		{
			if(operaciones[c].operador === operador)
			{
				existe = true;
				break;
			}
		}
		return existe;
	};
	
	window.onkeydown = function(e)
	{
		code = e.keyCode ? e.keyCode : e.which;
		console.log(code);
	};
	
	window.onkeyup = function(e)
	{
		code = e.keyCode ? e.keyCode : e.which;
		if(code >= 48 && code <= 57 || code === 46)
		{		
			console.log(code + " === " + String.fromCharCode(code));
			insertaNumeros(String.fromCharCode(code));
		}	
		if(code === 27 )
		{		
			insertaNumeros(code);
		}	
		if(code === 13 )
		{		
			insertaNumeros(code);
		}	
		if(code === 190 || code === 110)
		{		
			code=41;
			insertaNumeros(code);
		}	
			if(code == 106)
			{
				code=42;
				insertaNumeros(code);
			}
			if(code == 107)
			{
				code=43;
				insertaNumeros(code);
			}
			if(code == 109)
			{
				code=45;
				insertaNumeros(code);
			}
			if(code == 111)
			{
				code=47;
				insertaNumeros(code);
			}
	};
	function igual()
	{
		if(operacion !== "")
			{
			    ultimo = operacion.charAt(operacion.length - 1);
				if(existeOperador(ultimo))
				{
					//Eliminar el último operador...
					operacion = operacion.substr(0, operacion.length - 1);
				}
				cifras = [];
				resultado = eval(operacion);
				operacion = cifras[0] = String(resultado);
			}
	}
	function punto()
	{
		ultimaCifra = cifras[cifras.length - 1];
		//console.log(ultimaCifra);
		//Buscar si ya existe un punto...
		if(ultimaCifra.indexOf(".") < 0)
		{
			operacion += ".";
			cifras[cifras.length - 1] += ".";
		}
		resultado = operacion;
	}
	
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};