import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  imports: [CommonModule], // Add CommonModule here
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }

  goToCreateTask() {
    this.router.navigate(['/task-form']);
  }
}