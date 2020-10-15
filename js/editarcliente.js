(function(){
    
    let idCliente;
    const nombre = document.querySelector("#nombre");
    const email = document.querySelector("#email");
    const telefono = document.querySelector("#telefono");
    const empresa = document.querySelector("#empresa");
   
    const formulario = document.querySelector("#formulario");

    

    document.addEventListener('DOMContentLoaded', () =>{
        conectarDB();
        const parametrosUrl = new URLSearchParams(window.location.search);
        idCliente     = parametrosUrl.get('id');

        setTimeout(() =>{
            obtenerCliente(idCliente);
        },250);

        formulario.addEventListener('submit', actualizar);
        
         
    });


     function  obtenerCliente(id){

        const transaction =   DB.transaction(['crm'], 'readwrite');
        const objectStore =  transaction.objectStore('crm');
        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                
                if(cursor.value.id === Number(id)){
                    console.log(cursor.value.nombre);
                    nombre.value = cursor.value.nombre;
                    email.value = cursor.value.email;
                    telefono.value = cursor.value.telefono;
                    empresa.value = cursor.value.empresa;

                }
               
                cursor.continue();
            }
            
            
        }
        
        
    }

   

    function actualizar(e){
        e.preventDefault();
        
        if(nombre.value === '' || email.value === '' || telefono.value === '' || empresa.value === ''){
            mostrarMensaje("Todos los campos son obligatorios", 'error');
        }else{

            const clienteActualizado = {
                nombre: nombre.value,
                email : email.value,
                telefono: telefono.value,
                empresa: empresa.value,
                id: Number(idCliente)
            }

            const transaction = DB.transaction(['crm'], 'readwrite');
            const objectStore = transaction.objectStore('crm');

            objectStore.put(clienteActualizado);

            transaction.oncomplete = function(){
                mostrarMensaje("Actualizado correctamente", 'success');
                
            }
            transaction.onerror = function(){
                console.log("hubo un erro");
            }
            
        }
        

    }
})();