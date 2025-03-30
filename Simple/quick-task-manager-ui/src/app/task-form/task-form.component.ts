import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  imports: [FormsModule],
})
export class TaskFormComponent {
  task = {
    title: '',
    description: '',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  createTask() {
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
    });
  }
}