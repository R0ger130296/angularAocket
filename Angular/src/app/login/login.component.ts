import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DataRx } from '../models/data-rx';
import { LoginService } from '../services/login.service';
import { PermissionsService } from '../services/permissions.service';

export interface DataLogin {
  data: {
    email: string;
    password: string;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;
  constructor(private router: Router,
    private loginServices:LoginService,
    private permisos: PermissionsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
      email:["admi@gmail.com",Validators.required],
      password:["1",Validators.required],
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
    this.loginServices.logIn(datalogin).subscribe((data:DataRx)=>{
  if(data.ok){
    if(this.permisos.decodeToken(data.token)){
      // sessionStorage.setItem("token", this.permisos.getToken())
      this.router.navigate(['/documentos/lista']);
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
