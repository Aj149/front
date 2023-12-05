import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PagoService } from '../pago.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-pago', 
  templateUrl: './formulario-pago.component.html', 
  styleUrls: ['./formulario-pago.component.css'], 
})
export class FormularioPagoComponent {
  
  formulario = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    numero_telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    nombre: ['', [Validators.required]],
    fechaExpiracion: ['', [Validators.required, this.formatoFechaValido()]],
    cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
    numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/)]],
    dia: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    mes: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    anio: ['', [Validators.required, Validators.min(2023), Validators.pattern(/^[0-9]+$/)]],
    hora: ['', [Validators.required, this.validarHora]]
  });
  
  realizarPago() {
    const data = {
      correo: this.formulario.get('correo')?.value,
      numero_telefono: this.formulario.get('numero_telefono')?.value,
      nombre: this.formulario.get('nombre')?.value,
      fecha_Expiracion: this.formulario.get('fechaExpiracion')?.value,
      cedula: this.formulario.get('cedula')?.value,
      dia: this.formulario.get('dia')?.value,
      mes: this.formulario.get('mes')?.value,
      anio: this.formulario.get('anio')?.value
    };

    this._pagoService.realizarPago(data)?.subscribe({
      next: (value: Object) => {
        console.log("Reserva exitosa", value);
      },
      error: (error: any) => {
        console.error("Error al realizar la reserva de una", error);
      }
    });
  }


  
  constructor(private http: HttpClient, private _pagoService: PagoService, private fb: FormBuilder) {
  }

  validarHora(control: { value: string; }) {
    const horaRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$/i;

    if (control.value && !horaRegex.test(control.value)) {
      return { formatoInvalido: true };
    }

    return null;
  }

  
  formatoFechaValido() {
    return (control: { value: string; }) => {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const esValido = regex.test(control.value);
      return esValido ? null : { formatoFechaInvalido: true };
    };
  }
  

  obtenerpagos(): void {
    this._pagoService.obtenerPagos().subscribe(data => {
      console.log(data);
    });
  }
  
}

