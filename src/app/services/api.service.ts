import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ApiService{
      [x: string]: any;
      BaseUrl : string = "http://localhost:8000";
      constructor(private apiRequest: HttpClient)
      {}
      
      getSchools()
      {
         return this.apiRequest.get(this.BaseUrl + '/api/getSchools');
      }
      
      getDepartmens()
      {
        return this.apiRequest.get(this.BaseUrl + '/api/getDepartments');
      }
      addSchool(data: any)
      {
        return this.apiRequest.post(this.BaseUrl + '/api/addSchool',data)
      }

      updateSchool(data : any, id : any)
      {
        return this.apiRequest.put(this.BaseUrl + '/api/updateSchool?id='+id,data)
      }
      
      deleteSchool(id : any)
      {
        const data : any = {
          id : id
        }
        console.log(data)
        return this.apiRequest.post(this.BaseUrl + '/api/deleteSchool',data)
      }

      editSchooldata(id : any)
      {
        const data : any = {
          id : id
        }
        console.log(data)
        return this.apiRequest.post(this.BaseUrl + '/api/getSchool',data)
      }
      
      addDep(data: any)
      {
        return this.apiRequest.post(this.BaseUrl + '/api/addData',data)
      }
      
      updateSch(data : any)
      {
        return this.apiRequest.put(this.BaseUrl + '/api/updateSchool',data)
      }
      
      addDepPros(data: any)
      {
          return this.apiRequest.post(this.BaseUrl + '/api/addData',data)
      }
}