import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
url='http://localhost:8800'

  constructor(private http:HttpClient) {


   }

   async getData(){
    return this.http.get(this.url+'/readAll')
   }

   async update(data:any){
    return this.http.post(this.url+'/update',data)
   }

  deletedata(id:any,elem:any){
    console.log(id)
    console.log(elem.Id)
    let d=this.url + '/delete'
    console.log(d)
    this.http.delete(`http://localhost:8800/delete/${elem.Id}`)
   }

   async add(data:any) : Promise<any>{
    return this.http.post(this.url+'/write',data)
   }

  
}
