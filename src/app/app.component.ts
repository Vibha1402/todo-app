import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass

interface Todo {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule // Add CommonModule for ngClass
  ]
})
export class AppComponent {
  todoForm: FormGroup;
  todos: Todo[] = [];
  showDancingCat: boolean = false;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      todo: ['']
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      this.todos.push({
        text: this.todoForm.value.todo,
        completed: false
      });
      this.todoForm.reset();
    }
  }

  toggleComplete(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.showDancingCat = true;

    setTimeout(() => {
      console.log('Hiding dancing cat....');
      this.showDancingCat = false;
      // Remove the blur effect when the GIF disappears
      document.querySelector('.todo-app')?.classList.remove('blur-background');
    }, 1900); 
  }
}

