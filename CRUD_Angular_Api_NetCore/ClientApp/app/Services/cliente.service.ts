import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { ICliente } from '../Models/cliente.interface';

@Injectable()
export class ClienteService {

    constructor(private http: Http) { }

    //get
    getClientes() {
        return this.http.get("api/clientes")
            .map(data => <ICliente[]>data.json());
    }

    //post
    addCliente(Cliente : ICliente) {
        return this.http.post("api/clientes", Cliente);
    }

    //put
    editCliente(Cliente: ICliente) {
        return this.http.put(`api/clientes/${Cliente.idCliente}`, Cliente);
    }

    //delete
    deleteCliente(clienteId : number) {
        return this.http.delete(`api/clientes/${clienteId}`);
    }
}