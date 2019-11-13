import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../Services/cliente.service';
import { ICliente } from '../../Models/cliente.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cliente-app',
    templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

    //cliente
    cliente: ICliente = <ICliente>{};
    clientes: ICliente[] = [];


    //variaveis do form
    formLabel: string;
    isEditMode: boolean = false;
    form: FormGroup;


    constructor(private clienteService: ClienteService, private f: FormBuilder) {


        this.form = f.group({

            "nome": ["", Validators.required],
            "sobrenome": ["", Validators.required],
            "dataNascimento": ["", Validators.required],
            "sexo": ["", Validators.required],
            "cpf": ["", Validators.required],
            "telefone": ["", Validators.required],
            "email": ["", Validators.required]
        });
        this.formLabel = "Adicionar Cliente";
    }

    private getClientes() {

        this.clienteService.getClientes().subscribe(
            data => this.clientes = data,
            error => alert(error),
            () => console.log(this.clientes)
        );
    }

    ngOnInit() {
        this.getClientes();
    }


    //método que recebe o submit do form da pagina
    onSubmit() {
        this.cliente.nome = this.form.controls["nome"].value;
        this.cliente.sobrenome = this.form.controls["sobrenome"].value;
        this.cliente.sexo = this.form.controls["sexo"].value;
        this.cliente.cpf = this.form.controls["cpf"].value;
        this.cliente.telefone = this.form.controls["telefone"].value;
        this.cliente.email = this.form.controls["email"].value;

        if (this.isEditMode) {
            this.clienteService.editCliente(this.cliente).subscribe(response => {
                this.getClientes(); this.form.reset();
            });
        } else {
            //Inserindo cliente e no mesmo método obtendo o retorno do getClientes.
            this.clienteService.addCliente(this.cliente).subscribe(response => {
                this.getClientes();
                this.form.reset();
            });
        }
    };

    cancel() { //volta ao modo inclusão
        this.formLabel = "Adicionar Cliente";
        this.isEditMode = false;
        this.cliente = <ICliente>{};

        //limpa os campos
        this.form.get("nome")!.setValue('');
        this.form.get("sobrenome")!.setValue('');
        this.form.get("sexo")!.setValue('');
        this.form.get("cpf")!.setValue('');
        this.form.get("telefone")!.setValue('');
        this.form.get("email")!.setValue('');
    };

    edit(ClienteForm: ICliente) {

        this.formLabel = "Editar Cliente";
        this.isEditMode = true;
        this.cliente = ClienteForm;

        this.form.get("nome")!.setValue(ClienteForm.nome);
        this.form.get("sobrenome")!.setValue(ClienteForm.sobrenome);
        this.form.get("sexo")!.setValue(ClienteForm.sexo);
        this.form.get("cpf")!.setValue(ClienteForm.cpf);
        this.form.get("telefone")!.setValue(ClienteForm.telefone);
        this.form.get("email")!.setValue(ClienteForm.email);
    };

    delete(cliente: ICliente) {
        if (confirm("Deseja excluir este cliente?")) {

            this.clienteService.deleteCliente(cliente.idCliente).subscribe
                (response => {
                    this.getClientes();
                    this.form.reset();
                })
        }
    };

}
