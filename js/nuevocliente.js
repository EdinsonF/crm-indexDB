(function(){
  
    const formulario = document.querySelector("#formulario");


    document.addEventListener('DOMContentLoaded', () =>{
        conectarDB();
        formulario.addEventListener('submit', validarCampos);
    });

    


    function validarCampos(e){
        e.preventDefault();
        const nombre = document.querySelector("#nombre").value;
        const email = document.querySelector("#email").value;
        const telefono = document.querySelector("#telefono").value;
        const empresa = document.querySelector("#empresa").value;
        
        if(nombre=== '' || email === '' || telefono === '' || empresa === ''){
            mostrarMensaje("Todos los campos son obligatorios", "error");
        }else{

            const cliente = {
                nombre,
                email,
                telefono,
                empresa    
            }
            cliente.id = Date.now()
            
            registrarCliente(cliente);
        }
        
    }

    

    function registrarCliente(cliente){
             
        //REGISTRAR EN INDEXDB
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.oncomplete = function(){
            
        mostrarMensaje("Registro exitoso", "success");
        formulario.reset();
        
        }  
    }

    
})();