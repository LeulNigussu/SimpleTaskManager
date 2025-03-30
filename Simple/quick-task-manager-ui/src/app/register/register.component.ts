import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  user: any = { username: '', password: '', role: 'User' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        if (error.error) {
            this.errorMessage = error.error;
        }
      },
    });
  }
}