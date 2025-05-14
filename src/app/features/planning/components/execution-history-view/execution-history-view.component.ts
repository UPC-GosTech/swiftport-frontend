import { Component } from '@angular/core';
import { DateNavigatorComponent } from 'src/app/shared/components/date-navigator/date-navigator.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { Columns } from 'src/app/shared/components/table/table.models';

interface TaskExecution {
  task: string;
  plannedDate: Date;
  realDate: Date;
  status: 'Completada' | 'En progreso' | 'Retrasada';
  comment: string;
}

@Component({
  selector: 'app-execution-history-view',
  templateUrl: './execution-history-view.component.html',
  styleUrl: './execution-history-view.component.scss',
  standalone: true,
  imports: [CommonModule, DateNavigatorComponent, ButtonComponent, TableComponent]
})
export class ExecutionHistoryViewComponent {
  selectedDate: Date = new Date();
  chart: Chart | null = null;

  allExecutions: TaskExecution[] = [
    {
      task: 'Carga de camión',
      plannedDate: new Date('2024-06-01'),
      realDate: new Date('2024-06-01'),
      status: 'Completada',
      comment: 'Sin incidencias.'
    },
    {
      task: 'Salida a ruta',
      plannedDate: new Date('2024-06-02'),
      realDate: new Date('2024-06-03'),
      status: 'Retrasada',
      comment: 'Retraso por tráfico.'
    },
    {
      task: 'Entrega parcial',
      plannedDate: new Date('2024-06-03'),
      realDate: new Date('2024-06-03'),
      status: 'Completada',
      comment: 'Entrega exitosa.'
    },
    {
      task: 'Descarga',
      plannedDate: new Date('2024-06-04'),
      realDate: new Date('2024-06-04'),
      status: 'En progreso',
      comment: 'En proceso.'
    },
    {
      task: 'Retorno',
      plannedDate: new Date('2024-06-05'),
      realDate: new Date('2024-06-06'),
      status: 'Retrasada',
      comment: 'Demora por mantenimiento.'
    }
  ];

  get executions() {
    // Filtrar por la semana del selectedDate
    const start = new Date(this.selectedDate);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return this.allExecutions.filter(e => e.plannedDate >= start && e.plannedDate <= end);
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    setTimeout(() => this.updateChart(), 0);
  }

  updateChart() {
    // Implementación en el template
  }

  exportToPDF() {
    // Lógica de exportación
    alert('Exportar a PDF (demo)');
  }
  exportToCSV() {
    // Lógica de exportación
    alert('Exportar a CSV (demo)');
  }

  columns: Columns[] = [
    {
      header: { key: 'task', label: 'Tarea' },
      cell: 'task',
      type: 'text',
      sortable: true
    },
    {
      header: { key: 'plannedDate', label: 'Fecha Planificada' },
      cell: 'plannedDate',
      type: 'date',
      sortable: true
    },
    {
      header: { key: 'realDate', label: 'Fecha Real' },
      cell: 'realDate',
      type: 'date',
      sortable: true
    },
    {
      header: { key: 'status', label: 'Estado' },
      cell: 'status',
      type: 'template',
      sortable: true
    },
    {
      header: { key: 'comment', label: 'Comentario' },
      cell: 'comment',
      type: 'text',
      sortable: false
    }
  ];
}
