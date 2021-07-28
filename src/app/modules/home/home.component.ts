import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractSubscriptionComponent } from 'src/app/@cors/base-subscription.component';
import { TodoList } from './home.interface';
import { v4 as uuidv4 } from 'uuid';
import { timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { format } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent
  extends AbstractSubscriptionComponent
  implements OnInit
{
  myForm: FormGroup;
  todoList: TodoList[] = [];
  time: string = '';
  @ViewChild('el', { static: false}) el: ElementRef;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    /** init form */
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    });

    /** show clock */
    this.rxSubscribe(
      timer(0, 1000).pipe(
        map(() => new Date()),
        share()
      ),
      (time) => {
        this.time = format(time, 'yyyy-MM-dd kk:mm:ss');
      }
    );
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    const name = this.myForm.get('name')?.value;

    if (name) {
      this.todoList.push({
        id: uuidv4(),
        name,
        isChecked: false,
      });
      this.myForm.reset();
    }
  }

  /**
   * tracking function
   * @param index
   * @param item
   * @returns
   */
  trackByFn(index: number, item: TodoList): number {
    return index;
  }

  /**
   * remove item
   * @param id
   */
  removeItem(id: string): void {
    this.todoList = this.todoList.filter((item) => item.id !== id);
  }

  /**
   * change checkbox
   * @param id 
   */
  changeCheckbox(id: string): void {
    const idx = this.todoList.findIndex((item) => item.id === id);
    this.todoList[idx] = {
      ...this.todoList[idx],
      isChecked: !this.todoList[idx].isChecked,
    };
  }
}
