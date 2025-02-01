import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración básica
export const options = {
    vus: 10,        // 10 usuarios virtuales
    duration: '60s' // Duración de 60 segundos en tiempo
};

// Configuración base
const BASE_URL = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees';
const headers = {
    'Authorization': 'Basic VGVzdFVzZXI3MTk6bXZjWUYnaCU1Py13',
    'Content-Type': 'application/json'
};

export default function() {
    // 1. GET - Obtiene Lista de empleados
    let getListResponse = http.get(BASE_URL, { headers });
    check(getListResponse, {
        'GET lista funciona': (r) => r.status === 200
    });
    sleep(1);
    
    // 2. POST - Crear Agregar empleado
    let nuevoEmpleado = {
        firstName: "Natasha",
        lastName: "Romanoff",
        dependants: 3
    };
    
    let postResponse = http.post(
        BASE_URL, 
        JSON.stringify(nuevoEmpleado), 
        { headers }
    );
    check(postResponse, {
        'POST crear funciona': (r) => r.status === 200
    });
    
    // Obtener ID del empleado creado
    let empleadoId = '';
    if (postResponse.status === 200) {
        empleadoId = JSON.parse(postResponse.body).id;
    }
    sleep(1);
    
    // 3. GET - Obtener empleado específico con ID
    if (empleadoId) {
        let getOneResponse = http.get(
            `${BASE_URL}/${empleadoId}`, 
            { headers }
        );
        check(getOneResponse, {
            'GET uno funciona': (r) => r.status === 200
        });
        sleep(1);
        
        // 4. PUT - Actualizar empleado y dependientes
        let empleadoActualizado = {
            id: empleadoId,
            firstName: "Wanda",
            lastName: "Maximoff",
            dependants: 2
        };
        
        let putResponse = http.put(
            BASE_URL, 
            JSON.stringify(empleadoActualizado), 
            { headers }
        );
        check(putResponse, {
            'PUT funciona': (r) => r.status === 200
        });
        sleep(1);
        
        // 5. DELETE - Eliminar empleado
        let deleteResponse = http.del(
            `${BASE_URL}/${empleadoId}`, 
            null, 
            { headers }
        );
        check(deleteResponse, {
            'DELETE funciona': (r) => r.status === 200
        });
    }
    
    // Pausa entre iteraciones
    sleep(1);
}
