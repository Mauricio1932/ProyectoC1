/*obtener Media, mediana, moda, desviación media, desviación estandar, varianza 
    -frecuencia absoluta: obtener su suma de todos

*/

//librerias 
const { default: Decimal } = require("decimal.js-light");
const XLSX = require("xlsx");

//Arrays
var frecuenciaAbsoluta = []; //f (frecuencia absoluta)
var marcaClase = []; //x
var frecuenciaAcumulada = []; 
const  limiteIferior = [];
var limiteSuperior =[];
var sumaFrecuencias = 0;




function obtenerModa() {

    //¡no terminado, no mover nada!

    var mayor = 0, modaRepetida = 0, posicion = 0, moda = 0, resta = 0, suma = 0, divicionYmultimplicacion = 0,amplitud = 0;
    //obtemos el mayor 
    for (let i = 0; i < frecuenciaAbsoluta.length; i++) {
        const element = frecuenciaAbsoluta[i];
        if(element > mayor || element == mayor){
            mayor = element;
            posicion = i;
        }
    }
    // checa si no hay una moda repetida
    for (let i = 0; i < frecuenciaAbsoluta.length; i++) {
        const element = frecuenciaAbsoluta[i];
        if(element == mayor){
            modaRepetida++;
        }
    }
    //
    amplitud = ( limiteSuperior[posicion] - limiteIferior[posicion] )
    //aplicando primera resta de la formula (fi-fi-1)
    resta = (frecuenciaAbsoluta[posicion] - frecuenciaAbsoluta[posicion-1])
    //realiza suma  ((fi-fi-1) + (fi-fi-1))
    suma = ((frecuenciaAbsoluta[posicion] - frecuenciaAbsoluta[posicion-1]) + ((frecuenciaAbsoluta[posicion] - frecuenciaAbsoluta[posicion+1])))
    //divicion y multiplicacion ((fi-fi-1) / (fi-fi-1) + (fi-fi-1)) * Ai
    divicionYmultimplicacion = (resta/suma)* amplitud;
    //suma li + resultado de la divicion y multiplicacion 
    moda = limiteIferior[posicion] + divicionYmultimplicacion;
    console.log("--------------------------------------------")
    console.log("resultado de la moda: "+ moda.toFixed(2) )
    // console.log("suma"+ suma)
    // console.log("resta: "+ resta)
    // console.log("division  y multiplicacion" + divicionYmultimplicacion)
    // console.log("limite inferior: " + limiteIferior[posicion])
    // console.log("Amplitud " + ( limiteSuperior[posicion] - limiteIferior[posicion] ))
    // console.log("moda "+ frecuenciaAbsoluta[posicion])
    // console.log("p anterior: " + frecuenciaAbsoluta[posicion-1] )
    // console.log("p siguiente: " + frecuenciaAbsoluta[posicion+1] )
    // console.log("posicion "+ posicion);
    // console.log("este es el mayor: "+ mayor);
    // console.log("veces que se repite la moda: "+ modaRepetida)
}


function obtenerMediana() {
    /*
        Me=li +((n/2-Fi-1)/fi)*ai

        x = marca
        f = frecuecia abosluta
        F = frecuecia acumulada
        ai = limite superior - limite inferior 
        li = limite inferior
    */


    // var posision = 0;
    // var divicion = sumaFrecuencias/2;
    
    // var elemento =  frecuenciaAcumulada.find(elemento => ( elemento <= divicion))
    // let i = 0; 
    // for ( i; i < frecuenciaAcumulada.length; i++) {
    //     if (elemento >=  frecuenciaAcumulada[i] && elemento<= frecuenciaAcumulada[i] ){
    //         posision = i;
    //     }
    // }
    // console.log("elemento "+ i )
    // console.log("posicion "+ posision)
    // console.log("elemento "+ elemento)
    // console.log("divicion "+ divicion)
}

function obtenerMedia(){    

    var suma = 0 , divicion;
    var marca_clase = 0, frecuencia_absoluta =0;

    for (let i = 0 ; i < marcaClase.length; i++) {
        marca_clase = marcaClase[i];
        frecuencia_absoluta = frecuenciaAbsoluta[i];
        //realiza la la multiplicacion de MC y F absoluta, suma de estas para obtener un total
        suma = (suma + (marca_clase * frecuencia_absoluta));
        //suma de todos la columna de frecuencia absoluta
        sumaFrecuencias = frecuenciaAbsoluta[i] + sumaFrecuencias;
    }
    //realiza la divicion de suma totales de la multiplicacion y suma ENTRE la suma total F absoluta
    divicion = (suma/sumaFrecuencias);
    console.log("el total de la media es: " +  divicion.toFixed(3));
}


function leerExcel(ruta){

    //abrir documento
    const workbook = XLSX.readFile(ruta);
    const workbookSheets = workbook.SheetNames;

    //leer la hoja de excel este caso Hoja1
    const sheet = workbookSheets[0];
    //lee la tabla
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    //console.log(dataExcel);
    for (const itemFila of dataExcel) {
        //buscamos columna por medio de nombre y guardamos en un Arreglo
        marcaClase.push(parseInt(itemFila['Marca']))
        frecuenciaAbsoluta.push(parseInt(itemFila['Frecuencia absoluta']))
        frecuenciaAcumulada.push(parseInt(itemFila['Frecuencia acumulada']))
        limiteIferior.push(parseFloat(itemFila['Limite inferior exacto']))
        limiteSuperior.push(parseFloat(itemFila['Limite superior exacto']))
    }
}

leerExcel('datos.xlsx');
obtenerMedia();
obtenerMediana();
obtenerModa();