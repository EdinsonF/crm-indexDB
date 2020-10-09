(function(){
    let DB;
    const formulario = document.querySelector("#formulario");


    document.addEventListener('DOMContentLoaded', () =>{
        conectarDB();
        formulario.addEventListener('submit', validarCampos);
    });

    function conectarDB(){
        const abriConexion = window.indexedDB.open('crm', 1);

        abriConexion.onerror = function() {
            console.log("Hubo un error");
        }

        abriConexion.onsuccess = function() {
            DB = abriConexion.result;
        }    
    }


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

    function mostrarMensaje(mensaje, tipo){

        const alerta = document.querySelector(".alerta");
        if(!alerta){
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    
            if(tipo === 'error'){
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            }else{
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            divMensaje.textContent = mensaje;
            formulario.appendChild(divMensaje);
    
            setTimeout(() =>{
                divMensaje.remove();
            },2000);
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