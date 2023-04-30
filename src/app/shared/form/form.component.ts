import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnDestroy {
  @Input() title!: string;
  itemSub!: Subscription;

  constructor(private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    if (this.itemSub) this.itemSub.unsubscribe();
  }

  firstName = this.route.snapshot.params['lastName'];
  lastName = this.route.snapshot.params['lastName'];
  phone = this.route.snapshot.params['phone'];
  salary = this.route.snapshot.params['salary'];
  email = this.route.snapshot.params['email'];
  birth = this.route.snapshot.params['birth'];
  gender = this.route.snapshot.params['gender'];
  id = this.route.snapshot.params['id'];

  form = new FormGroup({
    firstName: new FormControl<string>(this.firstName ?? '', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl<string>(this.lastName ?? '', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl<string>(this.phone ?? '', [Validators.required, Validators.pattern("^(\\+38)?(0\\d{9})$")]),
    salary: new FormControl<number | null>(this.salary ?? null, [Validators.required]),
    email: new FormControl<string>(this.email ?? '', [Validators.required, Validators.email]),
    birth: new FormControl<Date | null>(this.birth ?? null, [Validators.required]),
    gender: new FormControl<string>(this.gender ?? '', [Validators.required]),
  });

  getId(): number {
    return this.id ? this.id : Date.now();
  }

  addItem(id: number, formValues: any): void {
    this.itemSub = this.itemService.addEditItem({ ...formValues, id }).subscribe({
      next: () => {
        const message = this.id ? 'Item edited successfully' : 'Item added successfully';
        this.showSuccessMessage(message);
        this.resetForm();
        this.navigateToHomePage();
      },
      error: (error) => {
        this.showErrorMessage(error);
      },
    });
  }

  showSuccessMessage(message: string): void {
    alert(message);
  }

  resetForm(): void {
    this.form.reset();
  }

  navigateToHomePage(): void {
    this.router.navigate(['/']);
  }

  showErrorMessage(error: Error): void {
    console.log(error);
  }

  onSubmit(): void {
    const formValues = this.form.value;
    if (this.form.valid) {
      const id = this.getId();
      this.addItem(id, formValues);
    }
  }

  onCancel(): void {
    if (confirm('Do you really want to Cancel?')) {
      this.navigateToHomePage();
    }
  }

}
