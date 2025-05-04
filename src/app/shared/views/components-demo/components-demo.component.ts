import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { Columns } from '../../components/table/table.models';
import { CallbackPipe } from '../../pipes/callback.pipe';
@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [TableComponent, CallbackPipe],
  templateUrl: './components-demo.component.html',
  styleUrl: './components-demo.component.scss'
})
export class ComponentsDemoComponent {

  namna = (value: any) => {
    return value + 'ñamña';
  }
  loadingTest = false;
  tableTestData : any[] = [
    {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      city: 'Anytown',
      state: 'CA',
    },
    {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
    },
    {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
    }
  ]
  columns: Columns[] = [
    {
      header: {
        key: 'name',
        label: 'Name',
      },
      cell: 'name',
      type: 'text',
      sortable: false,
      hide: {
        visible: true,
        label: 'Name',
      }
    },
    {
      header: {
        key: 'age',
        label: 'Age',
      },
      cell: 'age',
      type: 'text',
      sortable: false,
      hide: {
        visible: true,
        label: 'Age',
      }
    }
  ];
}
