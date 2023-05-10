import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 studentsList: Student[] = [];
 studentObj: Student = {
   id: '',
   first_name: '',
   last_name: '',
   email: '',
   mobile: ''
 }
 id: string = '';
 first_name: string = '';
 last_name: string = '';
 email: string = '';
 mobile: string = '';  
 
 constructor(private service: AuthService, private data: DataService) { }
 
  ngOnInit(): void {
    this.getAllStudents();
  }
  /* register() {
    this.service.logout();
  } */

  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching student data');
    })
  }

  resetForm() {
    this.id = '';
   this.first_name = '';
   this.last_name = '';
   this.email = '';
   this.mobile = '';  }

  addStudent() {
    if(this.first_name == "" || this.last_name == "" || this.mobile == "" || this.email == "") {
      alert("fill all input fields");
      return;
    }

    this.studentObj.id = '';
    this.studentObj.email = this.email;
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;

    this.data.addStudent(this.studentObj);
    this.resetForm();
  }
  deleteStudents(student: Student) {
    if(window.confirm('Are you sure you want to delete ' + student.first_name + '' + student.last_name + ' ?')) {
      this.data.deleteStudent(student);
    }
    
  }
}
