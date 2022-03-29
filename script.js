const beep = new Audio('beep.wav')
var contador = 0
var lastResult = 0
var total = 0
var offcanvas_el = document.getElementById("offcanvasExample")
var offcanvas = new bootstrap.Offcanvas(offcanvas_el, {backdrop: false})
function onScanSuccess(decodedText, decodedResult) {
	
	
	
	data = decodedText
	array_data=data.split(',')	
	
	if (decodedText !== lastResult) {
		lastResult = decodedText;
		contador++
		let fila = '<tr>';
		fila+='<th scope="row">'+ contador  +'</th>'
		fila += '<td>'+ array_data[2] + '</td>';
		fila += '<td>'+ array_data[1]+'.00' + '</td>';
		fila += '<td><input type="number"   class="form-control"></td>';
		fila += '<td><button class="btn btn-danger">Eliminar</button></td>';
		fila += '</tr>';
		beep.play()
		$('#tablaProducto tbody').append(fila);
		html5QrcodeScanner.clear();
		offcanvas.hide()
		calcular()
	}
	
	
}
var html5QrcodeScanner = new Html5QrcodeScanner(
 "qr-reader", { fps: 10, qrbox: 300 });


function scan(){
	html5QrcodeScanner.render(onScanSuccess);
}

function noscan(){
	html5QrcodeScanner.clear();
}



function calcular(){
	var total = 0
	$('#tablaProducto tbody').find('tr').each(function (i, el) {
		precio = 0
		cantidad = 0
		precio += parseFloat($(this).find('td').eq(1).text());
		cantidad += $(this).find('input').val();
		total += precio*cantidad
	
		  
		$('#tablaProducto tfoot tr th').eq(0).text("Total " + total + '$');    
    });
	
}
