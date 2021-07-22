import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datas : any;
  depandpro: any; //depandpro!: FormGroup;
  Schools : any ;
  constructor(private fb: FormBuilder, private apiservice : ApiService , private ns : NgxSpinnerService ) { }

  ngOnInit(): void {
    this.depandpro = this.fb.group({
      school_id : new FormControl(''),
      department_name: new FormControl('',[Validators.pattern("[a-zA-Z][a-zA-Z ]+$"),Validators.maxLength(20),Validators.minLength(2)]),//only alphabets, min length - 3, max length - 20
      programs: this.fb.array([],)
    });

    this.getAllSchools()
    this.getdata()
    
    
  }
  async getAllSchools()
  {
    this.ns.show()
    await this.apiservice.getSchools().toPromise()
    .then(res => {
      this.Schools = res
      console.log(this.Schools)
      this.ns.hide() 
    })
  }

  programs(): FormArray {
    return this.depandpro.get('programs') as FormArray;
  }

  newProgram(): FormGroup {
    return this.fb.group({
      program_name: new FormControl('',[Validators.minLength(3),Validators.pattern("[a-zA-Z][a-zA-Z ]+$")]),//only alphabets, min length - 3
      program_type: new FormControl('',[Validators.minLength(3),Validators.pattern("[a-zA-Z][a-zA-Z ]+$"),Validators.maxLength(5)])//only alphabets, min length - 3, max length-4
     });
  }

  async getdata()
{
  this.ns.show()
  await this.apiservice.getDepartmens().toPromise()
  .then(res => 
    {this.datas=res
    this.ns.hide()
    })
}
addProgram() {
  this.programs().push(this.newProgram());
}

removeProgram(empIndex: number) {
  this.programs().removeAt(empIndex);
}
async onSubmit() {
  console.log(this.depandpro.value.school_id)
  this.ns.show()
  await this.apiservice.addDep(this.depandpro.value).toPromise()
  .then(res => {
    console.log(res)
    this.ns.hide()
    this.getdata()     
    Swal.fire('Success','Department and Programs Added Sucessfully','success')
  })
  .catch(err => {
    console.log(err)
    Swal.fire({
      icon : 'error',
      title : 'Oops',
      text : 'Something went wrong !'
    })
  })
  this.ns.hide()
}

}
