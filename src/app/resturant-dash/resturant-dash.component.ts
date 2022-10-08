import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { resturantData } from './resturant.model';

@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css']
})
export class ResturantDashComponent implements OnInit {


  formValue!:FormGroup
  restaurentModelObj:resturantData=new resturantData;
  allRestaurentData: any
  showAdd!:boolean
  showbtn!:boolean

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {


    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      Address:[''],
      Services:['']

    })

    this.getAllData()
    


  }
  clickAddResto(){
    this.formValue.reset()
    this.showAdd=true
    this.showbtn=false
  }

      //now subscribing our data which is maped via services

      addResto(){
        this.restaurentModelObj.name=this.formValue.value.name;
        this.restaurentModelObj.email=this.formValue.value.email;
        this.restaurentModelObj.mobile=this.formValue.value.mobile;
        this.restaurentModelObj.Address=this.formValue.value.Address;
        this.restaurentModelObj.Services=this.formValue.value.Services;

this.api.postRestaurent(this.restaurentModelObj).subscribe
(res=>{
  console.log(res);
  alert("Restaurent Records Added Successfull")
  //clear fill form data 0
  let ref = document.getElementById('clear')
  ref?.click();
  this.formValue.reset()
  this.getAllData()
  
},
err=>{
  alert("Something went wrong!!!")
})

      }


//get all data
getAllData(){
  this.api.getRestaurent()
  .subscribe(res=>{
    this.allRestaurentData=res;
  })
}

//delete

deleteResto(data:any){

  this.api.deleteRestaurent(data.id).subscribe(res=>{
    alert("Restaurent Records Deleted")
    this.getAllData()
  })

}

//edit
onEditResto(data:any)


{

  this.showAdd=false;
    this.showbtn=true;
  this.restaurentModelObj.id=data.id
this.formValue.controls['name'].setValue(data.name)
this.formValue.controls['email'].setValue(data.email)
this.formValue.controls['mobile'].setValue(data.mobile)
this.formValue.controls['Address'].setValue(data.Address)
this.formValue.controls['Services'].setValue(data.Services)

}

//update

updateResto(){


  this.restaurentModelObj.name=this.formValue.value.name;
        this.restaurentModelObj.email=this.formValue.value.email;
        this.restaurentModelObj.mobile=this.formValue.value.mobile;
        this.restaurentModelObj.Address=this.formValue.value.Address;
        this.restaurentModelObj.Services=this.formValue.value.Services;

        this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id)
        .subscribe(res=>{
          alert("Restaurent Records Updated")
          let ref = document.getElementById('clear')
          ref?.click();
          this.formValue.reset()
          this.getAllData()
        })

}

}

