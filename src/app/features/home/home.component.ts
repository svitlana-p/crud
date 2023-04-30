import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/core/services/item.service';
import { IData } from 'src/app/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  itemsSub!: Subscription;
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'salary', 'email', 'birth', 'gender', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.getItems().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data)
      },
      error: console.log
    })
  }
  ngOnDestroy(): void {
    if(this.itemsSub) this.itemsSub.unsubscribe();
  }

  onDelete(item: IData) {
    this.itemService.deleteItem(item).subscribe({
      next: () => {
        alert('Item successfully deleted!');
        this.itemsSub = this.itemService.getItems().subscribe((data) => {
          this.dataSource = new MatTableDataSource<IData>(data);
          this.dataSource.paginator = this.paginator;
        });
      }
    })
  }

}
