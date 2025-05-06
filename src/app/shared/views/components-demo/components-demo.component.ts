import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { SelectorComponent } from '../../components/selector/selector.component';
import { Columns } from '../../components/table/table.models';
import { CallbackPipe } from '../../pipes/callback.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import {SearchBarComponent} from '../../components/search-bar/search-bar.component';
import {SnackbarComponent} from '../../components/snackbar/snackbar.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [TableComponent, CallbackPipe, SelectorComponent, ButtonComponent, SearchBarComponent, SnackbarComponent, NgIf],
  templateUrl: './components-demo.component.html',
  styleUrl: './components-demo.component.scss'
})
export class ComponentsDemoComponent {


  onSearch(term: string) {
    console.log('Buscando:', term);
  }

  showSnackbar: boolean = false;
  snackbarMessage: string = '';

  showMessage(message: string) {
    this.snackbarMessage = message;
    this.showSnackbar = true;
  }

  onSnackbarClosed() {
    this.showSnackbar = false;
  }

  namna = (value: any) => {
    return value + 'ñamña';
  }
  options = ['Option 1', 'Option 2', 'Option 3'];

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
    },
    {
      header: {
        key: 'email',
        label: 'Actions',
      },
      cell: 'email',
      type: 'edit_option',
      sortable: false,
      hide: {
        visible: true,
        label: 'Email',
      }
    }
  ];
}
