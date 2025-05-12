import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { ActivitiesService } from '../activities.service';
import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addHours, addMinutes } from 'date-fns';
import { HostListener } from '@angular/core';

// Interfaz para actividades pendientes
interface PendingActivity {
  id: number;
  code: string;
  description: string;
  company: string;
  requestedBy: string;
  requestDate: Date;
  priority: 'high' | 'medium' | 'low';
  activityForm: any;
}

@Component({
  selector: 'app-reprogramacion',
  templateUrl: './reprogramacion.component.html',
  styleUrls: ['./reprogramacion.component.scss']
})
export class ReprogramacionComponent implements OnInit {
  viewDate: Date = new Date();
  myDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  
  // Actividades pendientes
  pendingActivities: PendingActivity[] = [];
  filteredPendingActivities: PendingActivity[] = [];
  searchTerm: string = '';
  
  // Variable para controlar si hay un arrastre en curso
  draggingActivity: boolean = false;
  
  constructor(
    private activitiesService: ActivitiesService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadMockData();
    this.initCalendar();
  }
  
  // Cargar datos de prueba
  loadMockData(): void {
    // Datos de prueba para actividades pendientes
    this.pendingActivities = [
      {
        id: 101,
        code: 'ACT-2023-101',
        description: 'Transporte de personal a Plataforma A',
        company: 'Petroperú',
        requestedBy: 'Juan Pérez',
        requestDate: new Date(2023, 10, 15),
        priority: 'high',
        activityForm: {
          activity_id: 101,
          code_activity: 'ACT-2023-101',
          type_request: 'Transporte',
          type_services: 'Helicóptero',
          date_activity: '2023-11-20',
          tentative_schedule: '08:00 - 10:00',
          company: 'Petroperú',
          request_by: 'Juan Pérez',
          authority_by: 'Carlos Rodríguez',
          requesting_area: 'Operaciones',
          ceco_AFE: 'CECO-123',
          description_load: 'Personal técnico',
          type_load: 'Pasajeros',
          unit_measurement: 'Personas',
          number_packages: '8',
          weight_tons: '0.6',
          long: 'N/A',
          broad: 'N/A',
          high: 'N/A',
          m3: 'N/A',
          person_contact: 'Juan Pérez',
          communication_channel: 'Radio / Celular',
          local_area_authority: 'Pedro Suárez',
          communication_channel_local_area_authority: 'Radio',
          origin_zone: 'Malvinas',
          sub_zone_origin: 'Helipuerto',
          destination_zone: 'Plataforma A',
          destination_sub_zone: 'Helipuerto',
          location_origin: 'Malvinas',
          location_destination: 'Plataforma A',
          description_activity: 'Transporte de personal técnico para mantenimiento',
          comments: 'Personal lleva equipos de medición',
          flight_code: 'FLT-101'
        }
      },
      {
        id: 102,
        code: 'ACT-2023-102',
        description: 'Traslado de equipos a Estación 5',
        company: 'TGP',
        requestedBy: 'María López',
        requestDate: new Date(2023, 10, 16),
        priority: 'medium',
        activityForm: {
          activity_id: 102,
          code_activity: 'ACT-2023-102',
          type_request: 'Carga',
          type_services: 'Helicóptero',
          date_activity: '2023-11-21',
          tentative_schedule: '10:00 - 12:00',
          company: 'TGP',
          request_by: 'María López',
          authority_by: 'Roberto Gómez',
          requesting_area: 'Mantenimiento',
          ceco_AFE: 'CECO-456',
          description_load: 'Equipos de medición',
          type_load: 'Carga',
          unit_measurement: 'Kg',
          number_packages: '4',
          weight_tons: '0.3',
          long: '1.2',
          broad: '0.8',
          high: '0.5',
          m3: '0.48',
          person_contact: 'María López',
          communication_channel: 'Radio',
          local_area_authority: 'Luis Torres',
          communication_channel_local_area_authority: 'Radio',
          origin_zone: 'Malvinas',
          sub_zone_origin: 'Almacén',
          destination_zone: 'Estación 5',
          destination_sub_zone: 'Área técnica',
          location_origin: 'Malvinas',
          location_destination: 'Estación 5',
          description_activity: 'Traslado de equipos de medición para calibración',
          comments: 'Equipos frágiles',
          flight_code: 'FLT-102'
        }
      },
      {
        id: 103,
        code: 'ACT-2023-103',
        description: 'Evacuación médica desde Cashiriari',
        company: 'Pluspetrol',
        requestedBy: 'Roberto Sánchez',
        requestDate: new Date(2023, 10, 17),
        priority: 'high',
        activityForm: {
          activity_id: 103,
          code_activity: 'ACT-2023-103',
          type_request: 'Médico',
          type_services: 'Helicóptero',
          date_activity: '2023-11-22',
          tentative_schedule: 'Urgente',
          company: 'Pluspetrol',
          request_by: 'Roberto Sánchez',
          authority_by: 'Javier Medina',
          requesting_area: 'Seguridad y Salud',
          ceco_AFE: 'CECO-789',
          description_load: 'Paciente',
          type_load: 'Médico',
          unit_measurement: 'Persona',
          number_packages: '1',
          weight_tons: '0.08',
          long: 'N/A',
          broad: 'N/A',
          high: 'N/A',
          m3: 'N/A',
          person_contact: 'Dr. Alejandro Ruiz',
          communication_channel: 'Radio / Teléfono',
          local_area_authority: 'Carmen Vega',
          communication_channel_local_area_authority: 'Radio',
          origin_zone: 'Cashiriari',
          sub_zone_origin: 'Campamento',
          destination_zone: 'Malvinas',
          destination_sub_zone: 'Centro Médico',
          location_origin: 'Cashiriari',
          location_destination: 'Malvinas',
          description_activity: 'Evacuación médica de trabajador con síntomas de apendicitis',
          comments: 'Prioridad alta, requiere atención inmediata',
          flight_code: 'MED-103'
        }
      },
      {
        id: 104,
        code: 'ACT-2023-104',
        description: 'Suministro de víveres a San Martín 3',
        company: 'CNPC',
        requestedBy: 'Ana Castro',
        requestDate: new Date(2023, 10, 18),
        priority: 'low',
        activityForm: {
          activity_id: 104,
          code_activity: 'ACT-2023-104',
          type_request: 'Suministros',
          type_services: 'Helicóptero',
          date_activity: '2023-11-23',
          tentative_schedule: '14:00 - 16:00',
          company: 'CNPC',
          request_by: 'Ana Castro',
          authority_by: 'Miguel Prado',
          requesting_area: 'Logística',
          ceco_AFE: 'CECO-321',
          description_load: 'Víveres y suministros',
          type_load: 'Carga',
          unit_measurement: 'Kg',
          number_packages: '12',
          weight_tons: '0.5',
          long: '1.5',
          broad: '1.0',
          high: '0.8',
          m3: '1.2',
          person_contact: 'Ana Castro',
          communication_channel: 'Radio',
          local_area_authority: 'Jorge Mendoza',
          communication_channel_local_area_authority: 'Radio',
          origin_zone: 'Malvinas',
          sub_zone_origin: 'Almacén',
          destination_zone: 'San Martín 3',
          destination_sub_zone: 'Campamento',
          location_origin: 'Malvinas',
          location_destination: 'San Martín 3',
          description_activity: 'Entrega de víveres y suministros para campamento',
          comments: 'Incluye medicamentos',
          flight_code: 'SUP-104'
        }
      },
      {
        id: 105,
        code: 'ACT-2023-105',
        description: 'Inspección de líneas en Pagoreni',
        company: 'TGP',
        requestedBy: 'Daniel Ríos',
        requestDate: new Date(2023, 10, 18),
        priority: 'medium',
        activityForm: {
          activity_id: 105,
          code_activity: 'ACT-2023-105',
          type_request: 'Inspección',
          type_services: 'Helicóptero',
          date_activity: '2023-11-22',
          tentative_schedule: '11:00 - 14:00',
          company: 'TGP',
          request_by: 'Daniel Ríos',
          authority_by: 'Javier Mendoza',
          requesting_area: 'Mantenimiento',
          description_activity: 'Inspección visual de líneas de conducción',
          comments: 'Requiere sobrevuelo a baja altura'
        }
      },
      {
        id: 106,
        code: 'ACT-2023-106',
        description: 'Traslado de personal a Nuevo Mundo',
        company: 'Pluspetrol',
        requestedBy: 'Laura Vega',
        requestDate: new Date(2023, 10, 19),
        priority: 'low',
        activityForm: {
          activity_id: 106,
          code_activity: 'ACT-2023-106',
          type_request: 'Transporte',
          type_services: 'Helicóptero',
          date_activity: '2023-11-23',
          tentative_schedule: '09:00 - 11:00',
          company: 'Pluspetrol',
          request_by: 'Laura Vega',
          description_activity: 'Traslado de personal administrativo',
          comments: 'Confirmación pendiente'
        }
      },
      {
        id: 107,
        code: 'ACT-2023-107',
        description: 'Entrega de medicamentos a Kitepampani',
        company: 'Ministerio de Salud',
        requestedBy: 'Jorge Salazar',
        requestDate: new Date(2023, 10, 20),
        priority: 'high',
        activityForm: {
          activity_id: 107,
          code_activity: 'ACT-2023-107',
          type_request: 'Carga',
          type_services: 'Helicóptero',
          date_activity: '2023-11-24',
          tentative_schedule: '08:00 - 10:00',
          company: 'Ministerio de Salud',
          request_by: 'Jorge Salazar',
          description_activity: 'Entrega de medicamentos esenciales',
          comments: 'Prioridad por emergencia sanitaria'
        }
      }
    ];
    
    this.filteredPendingActivities = [...this.pendingActivities];
    
    // Datos de prueba para eventos del calendario
    const today = new Date();
    
    this.events = [
      {
        start: addHours(today, 8),
        end: addHours(today, 10),
        title: 'ACT-2023-001 - Transporte de personal',
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          id: 1,
          activityForm: {
            activity_id: 1,
            code_activity: 'ACT-2023-001',
            type_request: 'Transporte',
            type_services: 'Helicóptero',
            company: 'Petroperú',
            // ... otros datos
          }
        }
      },
      {
        start: addHours(today, 12),
        end: addHours(today, 14),
        title: 'ACT-2023-002 - Traslado de equipos',
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        meta: {
          id: 2,
          activityForm: {
            activity_id: 2,
            code_activity: 'ACT-2023-002',
            type_request: 'Carga',
            type_services: 'Helicóptero',
            company: 'TGP',
            // ... otros datos
          }
        }
      }
    ];
  }

  previousDay(): void {
    const date = new Date(this.viewDate);
    date.setDate(date.getDate() - 1);
    this.viewDate = date;
    this.myDate = date;
    // No llamamos a onDateChange para evitar recargar datos
    // Solo actualizamos la vista
    this.refresh.next(null);
  }

  nextDay(): void {
    const date = new Date(this.viewDate);
    date.setDate(date.getDate() + 1);
    this.viewDate = date;
    this.myDate = date;
    // No llamamos a onDateChange para evitar recargar datos
    // Solo actualizamos la vista
    this.refresh.next(null);
  }

  onDateChange(): void {
    this.viewDate = new Date(this.myDate);
    
    // Limpiamos los eventos actuales
    this.events = [];
    
    // Generamos nuevos eventos para la fecha seleccionada
    this.initCalendar();
  }

  onClickEvent(event: CalendarEvent): void {
    try {
      this.matDialog.open(ActivityInfoComponent, {
        width: '100%',
        maxWidth: '900px',
        disableClose: false,
        data: event.meta || {},
      }).afterClosed().subscribe((response) => {
        if (response && response.action === 'remove') {
          this.events = this.events.filter(e => e.meta && e.meta.id !== response.id);
          this.refresh.next(null);
        }
      });
    } catch (error) {
      console.error('Error al abrir el diálogo:', error);
    }
  }

  initCalendar(): void {
    // Obtenemos la fecha actual
    const today = new Date(this.viewDate);
    
    // Creamos varios eventos de ejemplo para diferentes horas del día
    this.events = [
      // Evento 1: Transporte de personal (mañana)
      {
        title: 'ACT-2023-101 - Transporte de personal a Plataforma A',
        start: this.setTime(today, 7, 0), // 7:00 AM
        end: this.setTime(today, 9, 0),   // 9:00 AM
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        color: {
          primary: '#ef4444',
          secondary: '#fee2e2'
        },
        meta: {
          id: 101,
          company: 'Petroperú',
          requestedBy: 'Juan Pérez',
          priority: 'high',
          activityForm: this.pendingActivities.find(a => a.id === 101)?.activityForm
        }
      },
      
      // Evento 2: Mantenimiento (mediodía)
      {
        title: 'ACT-2023-105 - Inspección de líneas en Pagoreni',
        start: this.setTime(today, 11, 30), // 11:30 AM
        end: this.setTime(today, 14, 0),    // 2:00 PM
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        color: {
          primary: '#f59e0b',
          secondary: '#fef3c7'
        },
        meta: {
          id: 105,
          company: 'TGP',
          requestedBy: 'Daniel Ríos',
          priority: 'medium',
          activityForm: {
            activity_id: 105,
            code_activity: 'ACT-2023-105',
            type_request: 'Inspección',
            type_services: 'Helicóptero',
            date_activity: today.toISOString().split('T')[0],
            company: 'TGP',
            request_by: 'Daniel Ríos'
          }
        }
      },
      
      // Evento 3: Suministro (tarde)
      {
        title: 'ACT-2023-104 - Suministro de víveres a San Martín 3',
        start: this.setTime(today, 15, 0), // 3:00 PM
        end: this.setTime(today, 16, 30),  // 4:30 PM
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        color: {
          primary: '#3b82f6',
          secondary: '#dbeafe'
        },
        meta: {
          id: 104,
          company: 'CNPC',
          requestedBy: 'Ana Castro',
          priority: 'low',
          activityForm: this.pendingActivities.find(a => a.id === 104)?.activityForm
        }
      }
    ];
    
    // Eliminamos de las actividades pendientes las que ya están en el calendario
    const scheduledIds = this.events.map(event => event.meta?.id);
    this.pendingActivities = this.pendingActivities.filter(activity => 
      !scheduledIds.includes(activity.id)
    );
    
    // Inicializamos las actividades pendientes filtradas
    this.filteredPendingActivities = [...this.pendingActivities];
    
    // Forzamos la actualización del calendario
    this.refresh.next(null);
  }

  // Método auxiliar para crear fechas con hora específica
  private setTime(date: Date, hours: number, minutes: number): Date {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    try {
      // Actualizamos el evento con las nuevas fechas
      this.events = this.events.map(iEvent => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd || addHours(newStart, 2)
          };
        }
        return iEvent;
      });
      
      // Actualizamos la vista
      this.refresh.next(null);
      
      this.snackBar.open('Evento actualizado', 'Cerrar', {
        duration: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
    }
  }
  
  // Métodos para el panel de actividades pendientes
  filterPendingActivities(priority: string): void {
    if (priority === 'all') {
      this.filteredPendingActivities = [...this.pendingActivities];
    } else {
      this.filteredPendingActivities = this.pendingActivities.filter(
        activity => activity.priority === priority
      );
    }
  }
  
  searchActivities(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPendingActivities = [...this.pendingActivities];
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredPendingActivities = this.pendingActivities.filter(activity => 
      activity.code.toLowerCase().includes(term) || 
      activity.description.toLowerCase().includes(term) ||
      activity.company.toLowerCase().includes(term) ||
      activity.requestedBy.toLowerCase().includes(term)
    );
  }
  
  getPriorityLabel(priority: string): string {
    switch(priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return '';
    }
  }
  
  // Métodos para drag & drop
  onDragEnded(event: CdkDragEnd, activity: PendingActivity): void {
    this.draggingActivity = false;
    
    // Quitar clase para desactivar la animación de cola
    const container = document.querySelector('.pending-activities-container');
    if (container) {
      container.classList.remove('dragging');
    }
    
    // Restauramos la posición de los elementos
    const items = document.querySelectorAll('.pending-activity-item');
    items.forEach((item) => {
      (item as HTMLElement).style.transform = '';
      (item as HTMLElement).style.transition = '';
    });
    
    // Limpiamos el resaltado de los segmentos de hora
    document.querySelectorAll('.cal-hour-segment').forEach(el => {
      el.classList.remove('drop-active');
    });
  }
  
  onActivityDropped(event: CdkDragDrop<any>): void {
    console.log('Drop event:', event);
    
    // Verificamos si el evento tiene los datos necesarios
    if (!event.item || !event.item.data) {
      console.error('No hay datos en el evento de drop');
      return;
    }
    
    const activity = event.item.data as PendingActivity;
    console.log('Activity being dropped:', activity);
    
    try {
      // Obtenemos las coordenadas del evento de drop
      const dropPoint = {
        x: event.dropPoint.x,
        y: event.dropPoint.y
      };
      console.log('Drop point:', dropPoint);
      
      // Obtenemos el elemento del calendario donde se soltó
      const calendarElement = document.querySelector('.cal-day-view');
      if (!calendarElement) {
        console.error('No se encontró el elemento del calendario');
        return;
      }
      
      // Calculamos la posición relativa dentro del calendario
      const calendarRect = calendarElement.getBoundingClientRect();
      const relativeY = dropPoint.y - calendarRect.top;
      console.log('Relative Y position:', relativeY);
      
      // Calculamos la hora basada en la posición vertical
      const totalHours = 14; // 20 - 6
      const pixelsPerHour = calendarRect.height / totalHours;
      const hourOffset = relativeY / pixelsPerHour;
      
      // Calculamos la hora y minutos
      let hour = Math.floor(6 + hourOffset); // 6 es dayStartHour
      let minute = Math.floor((hourOffset - Math.floor(hourOffset)) * 60);
      
      // Redondeamos los minutos a intervalos de 15 para alinear con los segmentos
      minute = Math.floor(minute / 15) * 15;
      
      // Aseguramos que la hora esté dentro del rango válido
      hour = Math.max(6, Math.min(19, hour)); // Entre 6 y 19 (dayStartHour y dayEndHour-1)
      
      console.log(`Programando actividad para las ${hour}:${minute < 10 ? '0' + minute : minute}`);
      
      // Creamos las fechas de inicio y fin
      const startTime = new Date(this.viewDate);
      startTime.setHours(hour, minute, 0);
      const endTime = addHours(startTime, 2); // Duración predeterminada de 2 horas
      
      // Creamos un nuevo evento en el calendario
      const newEvent: CalendarEvent = {
        title: `${activity.code} - ${activity.description}`,
        start: startTime,
        end: endTime,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        color: this.getPriorityColor(activity.priority),
        meta: {
          id: activity.id,
          activityForm: activity.activityForm,
          priority: activity.priority,
          company: activity.company,
          requestedBy: activity.requestedBy
        }
      };
      
      // Agregamos el evento al calendario
      this.events = [...this.events, newEvent];
      console.log('Evento añadido al calendario:', newEvent);
      
      // Eliminamos la actividad de la lista de pendientes
      this.pendingActivities = this.pendingActivities.filter(a => a.id !== activity.id);
      this.filteredPendingActivities = this.filteredPendingActivities.filter(a => a.id !== activity.id);
      
      // Forzamos la actualización del calendario
      this.refresh.next(null);
      
      this.snackBar.open('Actividad programada', 'Cerrar', {
        duration: 3000,
      });
    } catch (error) {
      console.error('Error al procesar el drop:', error);
      this.snackBar.open('Error al programar la actividad', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  // Método para obtener el color según la prioridad
  getPriorityColor(priority: string): any {
    switch(priority) {
      case 'high':
        return {
          primary: '#ef4444',
          secondary: '#fee2e2'
        };
      case 'medium':
        return {
          primary: '#f59e0b',
          secondary: '#fef3c7'
        };
      case 'low':
        return {
          primary: '#3b82f6',
          secondary: '#dbeafe'
        };
      default:
        return {
          primary: '#6b7280',
          secondary: '#f3f4f6'
        };
    }
  }

  // Método mejorado para el inicio del arrastre
  onDragStarted(event: CdkDragStart, activity: PendingActivity): void {
    this.draggingActivity = true;
    
    // Añadir clase para activar la animación de cola
    const container = document.querySelector('.pending-activities-container');
    if (container) {
      container.classList.add('dragging');
    }
    
    // Añadimos un efecto visual para los elementos que están debajo del que se arrastra
    const items = document.querySelectorAll('.pending-activity-item');
    const draggedIndex = this.filteredPendingActivities.findIndex(a => a.id === activity.id);
    
    items.forEach((item, index) => {
      if (index > draggedIndex) {
        // Calculamos cuánto debe subir cada elemento
        const translateY = -80; // Altura aproximada de un elemento
        (item as HTMLElement).style.transform = `translateY(${translateY}px)`;
        (item as HTMLElement).style.transition = 'transform 0.3s ease-out';
      }
    });
  }

  // Método para resaltar la zona donde se puede soltar
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    // Encontrar el segmento de hora sobre el que está el cursor
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    const hourSegment = elements.find(el => el.classList.contains('cal-hour-segment'));
    
    // Quitar la clase de todos los segmentos
    document.querySelectorAll('.cal-hour-segment').forEach(el => {
      el.classList.remove('drop-active');
    });
    
    // Añadir la clase al segmento actual
    if (hourSegment) {
      hourSegment.classList.add('drop-active');
    }
  }

  // Método para limpiar el resaltado cuando termina el arrastre
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    document.querySelectorAll('.cal-hour-segment').forEach(el => {
      el.classList.remove('drop-active');
    });
  }

  // Añadir este método para aplicar clases CSS según la prioridad
  eventClasses(event: CalendarEvent): string[] {
    if (!event.meta || !event.meta.priority) {
      return [];
    }
    
    return [`priority-${event.meta.priority}`];
  }
}
