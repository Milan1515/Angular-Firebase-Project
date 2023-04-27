import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email : string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then( res => {
      localStorage.setItem('token', 'true');


      if(res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/varify-email']);
      }
      
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('Registration Successful: ', res);
    alert('Registration Successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user)
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
       alert(err.message);
    })
  }

  forgotPassword(email : string) {
       this.fireauth.sendPasswordResetEmail(email).then(() => {
         this.router.navigate(['/varify-email']);
       }, err => {
         alert('Something went wrong')
       })
  }

  sendEmailForVarification(user: any) {
    console.log('Sending verification email for user: ', user);
   this.fireauth.currentUser.then(u => u?.sendEmailVerification()).then(() => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send email to your email. ')
    })
  }
googleSignIn() {
  return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
    this.router.navigate(['/dashboard']);
    localStorage.setItem('token', JSON.stringify(res.user?.uid));
  }, err => {
    alert(err.message)
  })
}
  
}
