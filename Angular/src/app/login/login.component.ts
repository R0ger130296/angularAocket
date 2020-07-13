import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisosService } from '../servicios/permisos.service'
import { DataRx } from '../modelos/data-rx'
import { LoginService } from '../servicios/login.service'
// import { read } from 'fs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginData: FormGroup;
  constructor(private router: Router,
    private loginServices:LoginService,
    private permisos: PermisosService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
  }); 
  }

login():void{
  let email =this.loginData.get('email').value;
  let password =this.loginData.get('password').value;
  let datalogin = {
    data:{
      password,
      email
    }
  };
    this.loginServices.login(datalogin).subscribe((data:DataRx)=>{
  if(data.transaccion){
    if(this.permisos.decodificarToken(data.token)){
      sessionStorage.setItem('token',data.token)
      console.log(data.data[0].rol)
      this.router.navigate(['/menu']);
    }else{
     email='';
      password='';
      const Toast = Swal.fire({
        position: 'top-right',
        icon:'error',
        title:`${data.msg}`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  } error=>{
    email='';
      password='';
    const Toast = Swal.fire({
      position: 'top-right',
      icon:'error',
      title:`${error}`,
      showConfirmButton: false,
      timer: 3000
    });
  };
});
}
  
}