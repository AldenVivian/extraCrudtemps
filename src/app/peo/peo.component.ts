import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-peo',
  templateUrl: './peo.component.html',
  styleUrls: ['./peo.component.css']
})
export class PeoComponent implements OnInit {

  peoForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.peoForm = this.fb.group({
      
      progarr: this.fb.array([this.fb.group({program:''})])
    })

  }
  ngOnInit(){
     /* Initiate the form structure */
     this.peoForm = this.fb.group({
      
      progarr: this.fb.array([this.fb.group({program:''})])
    })
    
  }

  get progs() {
    return this.peoForm.get('progarr') as FormArray;
  }


  addProgram() {
    this.progs.push(this.fb.group({program:''}));
  }

  
  deleteProgram(index:number) {
    this.progs.removeAt(index);
  }

}
