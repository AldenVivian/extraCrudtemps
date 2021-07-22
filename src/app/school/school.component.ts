import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  data: any;
  SchoolForm : any; //SchoolForm! : FormGroup;
  schoolId : any;
  editd : boolean = false;
  schoolName : any = "";
  constructor(private ns : NgxSpinnerService,private apiService : ApiService) { }

  ngOnInit(): void {
    this.getSchools()
    this.initForm()
  }
  initForm()
  {
    this.SchoolForm = new FormGroup({
      school: new FormControl(this.schoolName,[Validators.required,Validators.minLength(3),Validators.pattern("[a-zA-Z][a-zA-Z ]+$"),Validators.maxLength(10)])
     })
  }
  async addSchool(){
    this.ns.show();
    await this.apiService.addSchool(this.SchoolForm.value).toPromise()
    .then( res => {
      console.log(res)
      this.ns.hide();
      Swal.fire('Success','School Added Sucessfully','success')
    })
    .catch(err => {
      console.log(err.message)
      Swal.fire({
       icon : 'error',
       title : 'Oops',
       text : 'Something went wrong !'
     })
      this.ns.hide()
    })
    this.getSchools()
}
async getSchools()
  {
    this.ns.show()
    await this.apiService.getSchools().toPromise()
    .then(res => {
      this.data = res
      console.log(res)
      this.ns.hide()
    })
    .catch(err => {
      this.ns.hide()
      Swal.fire({
        icon : 'error',
        title : 'Oops',
        text : 'Something went wrong !'
      })
    })
  }
  async delete(index: number){
    this.ns.show()
    const id = this.data[index].id
    await this.apiService.deleteSchool(id).toPromise()
    .then(res => {
    console.log(res)
    this.getSchools()
    this.ns.hide()
  })
    .catch(res => {
    console.log(res)
    this.ns.hide()
    Swal.fire({
      icon : 'error',
      title : 'Oops',
      text : 'Something went wrong !'
    })
  })
}
editSchool(index: number){
  this.ns.show()
  this.schoolId = this.data[index].id
  this.schoolName =   this.data[index].school_name
  this.editd = true
  
  this.initForm()
  this.ns.hide() 
}
async updateSchooldata()
{
  this.ns.show()
  const data : any = {
    id : this.schoolId,
    school_name : this.SchoolForm.value.school
  }
  await this.apiService.updateSch(data).toPromise()
  .then(res => {
    this.getSchools()
   this.ns.hide() 
  })
  .catch(err => {
    this.ns.hide()
    Swal.fire({
      icon : 'error',
      title : 'Oops',
      text : 'Something went wrong !'
    })
  })
  this.editd = false;
}

}
