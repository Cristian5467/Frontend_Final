//GET, POST , PUT Y DELETE

function getCar(){
    $.ajax({
        url:"http://152.70.120.190:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });
}

function postCar(){
    if ($("#name").val().length==0 || $("#description").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 ){
        alert("Todos los campos son obligatorios para actualizar los datos");
    }else{

    
    let cajas = {
        gama:{idGama: +$("#select-gama").val()},
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val()
    };
    console.log(cajas);
    $.ajax({
        url:"http://152.70.120.190:8080/api/Car/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el carro");
            window.location.reload();
        }
    });

}
}

function putCar(idBotonActualizar){

    if ($("#name").val().length==0 || $("#description").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 ){
        alert("Todos los campos son obligatorios para actualizar los datos");
   
}else{

let cajas = {
    idCar:idBotonActualizar,
    name:$("#name").val(),
    brand:$("#brand").val(),
    year:$("#year").val(),
    description:$("#description").val()
};

$.ajax({
    url:"http://152.70.120.190:8080/api/Car/update",
    type:"PUT",
    datatype:"JSON",
    contentType: "application/json",
    data: JSON.stringify(cajas),
    success:function(respuesta){
        alert("se ha actualizado con exito ");
        window.location.reload();
    }
});
}

}



function deleteCar(idBoton){
    Swal.fire({
        title: 'Esta seguro de borrar el carro? con el id:'+idBoton,
        text: "si estas seguro se borrara definitivamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'Se elimino con exito.',
            'success'
            
          )
    let myData={
        id:idBoton
    };
    $.ajax({
        url:"http://152.70.120.190:8080/api/Car/"+idBoton,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            window.location.reload();
        }

    });
   }
   })
}

function pintarRespuesta(items){
    let myTable='<table class="table-auto w-full text-left whitespace-no-wrap">' ;
    
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].name + "</td>";
        myTable+="<td>"+items[i].brand + "</td>";
        myTable+="<td>"+items[i].year + "</td>";
        myTable+="<td>"+items[i].description + "</td>";
        myTable+="<td>"+items[i].gama.name+ "</td>";
        myTable+="<td> <button onclick='putCar("+items[i].idCar+")'class='flex mx-auto text-white bg-cyan-800 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-900 rounded text-lg'> Actualizar </button> " ;
        myTable+="<td> <button onclick='deleteCar("+items[i].idCar+")'class='flex mx-auto text-white bg-cyan-800 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-900 rounded text-lg'> Borrar </button> " ;
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function getGamaRelacion(){
    $.ajax({
        url:"http://152.70.120.190:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-gama");
            $.each(respuesta, function (id,name) {
                $select.append('<option value='+name.idGama+'>'+name.name+'</option>');
            });
        }

    });
}