import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../home.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { HttpClient } from '@angular/common/http';
interface PeriodicElement {
  id: string,
  name: string,
  surname: string,
age:string,
gender:string

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Name', 'Surname','Age','Gender','actions'];
  dataSource = new MatTableDataSource();
  dataCopy:any[]=[]
  subs:any[]=[]
  userInput:any

  objectData = {
    "name": "dfssg",
    "surname": "sgdsg",
    "id": "7",
    "age": "44",
    "gender": "sdgsg"
  };
  sample:PeriodicElement={
    id:"",

    name:"",
    surname:"",
  age:"",
  gender:""

  }

  sample1:PeriodicElement={
    id:"",

    name:"",
    surname:"",
  age:"",
  gender:""

  }
constructor(private dataService:HomeService,public dialog: MatDialog,private http:HttpClient){

}

transformToCSVHeaders(obj: any): { id: string, title: string }[] {
  const csvHeaders = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const headerObj = {
        id: key,
        title: key.charAt(0).toUpperCase() + key.slice(1) // Capitalize the first letter
      };
      csvHeaders.push(headerObj);
    }
  }
  return csvHeaders;
}


  async ngOnInit() {

(await this.dataService.getData()).subscribe((d:any)=>{
this.dataSource=d
this.dataCopy=d
})
  }



  async openDialog(elem:any){
    await import('./update-dialog/update-dialog.component').then(() => {
      const dialogRef = this.dialog.open(UpdateDialogComponent, {
          data:elem,
          backdropClass:"backdropBackground1",
          panelClass: 'my-class'
      });
      dialogRef.afterClosed().subscribe(async(result) => {
          //this.router.navigate(['/'], { relativeTo: this.route });

          if(typeof(result)!='undefined'){
            this.sample.name=result['Name']
            this.sample.id=result['Id']

            this.sample.age=result['Age']

            this.sample.gender=result['Gender']

            this.sample.surname=result['Surname']
            console.log(this.sample)
            let sub= this.http.post(`http://localhost:8800/update`,this.sample).subscribe(d=>{
              console.log(d)
              this.sample.name=""
              this.sample.id=""
              this.sample.age=""
              this.sample.gender=""
              this.sample.surname=""

            })
          }
         else{
          console.log("no data")
         }

      });
  });
  }

  async openDialog1(elem:any){
    await import('./delete-dialog/delete-dialog.component').then(() => {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data:elem,
          backdropClass:"backdropBackground1",
          panelClass: 'my-class'
      });
      dialogRef.afterClosed().subscribe((result) => {
       if(typeof(result)!='undefined'){
       // this.dataService.deletedata(elem.Id,result)
       let sub= this.http.delete(`http://localhost:8800/delete/${elem.Id}`).subscribe((d:any)=>{
        console.log(d)
          this.dataSource=d.data
          this.dataCopy=d.data
        })
        this.subs.push(sub)

        }
       else{
        console.log("no data")
       }
      });
  });
  }


  async openDialog2(){
    await import('./add-dialog/add-dialog.component').then(() => {
      const dialogRef = this.dialog.open(AddDialogComponent, {
          data:this.sample1,
          backdropClass:"backdropBackground1",
          panelClass: 'my-class'
      });
      dialogRef.afterClosed().subscribe(async(result) => {

        if(typeof(result)!='undefined'){
          result['id']=(this.maxinArr()+1).toString()

          // await this.dataService.add(result).then(res=>{
          //   console.log(res)
          //   // res.subscribe((d:any)=>{
          //   // })
          // })
          let sub= this.http.post(`http://localhost:8800/write`,result).subscribe((d:any)=>{
            this.dataSource=d.data
            this.dataCopy=d.data

          })
          this.subs.push(sub)

        }
       else{
        console.log("no data")
       }
      });
  });
  }

  maxinArr(){
    console.log(this.dataCopy)
    let ids=this.dataCopy.map(elm=>elm.Id)
    console.log(ids)
    let max=Math.max(...ids)
    console.log(max)
    return max
  }
  getdataById(){
this.http.get(`http://localhost:8800/get/${this.userInput}`).subscribe((res:any)=>{
  let b:any[]=[]
  res[0]['Id']=this.userInput
  console.log(res)
  this.dataSource=res
})
  }
}
