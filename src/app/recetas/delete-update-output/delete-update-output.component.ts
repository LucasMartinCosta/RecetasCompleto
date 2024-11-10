import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Receta } from '../../interfaces/recetas';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-update-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-update-output.component.html',
  styleUrl: './delete-update-output.component.css'
})
export class DeleteUpdateOutputComponent {
  @Input() receta!:Receta;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() detalles = new EventEmitter<number>();

  onUpdate(){
    this.update.emit(this.receta.id);
  }
  onDelete(){
    this.delete.emit(this.receta.id);
  }
  onDetalles(){
    this.detalles.emit(this.receta.id);
  }
  
}
