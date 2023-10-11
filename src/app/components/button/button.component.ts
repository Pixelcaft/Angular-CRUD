import { outputAst } from '@angular/compiler';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public text!: string;
  @Input() public class!: string;
  @Input() public icon?: any;
  @Input() public routerLink!: string;
  @Output() public onClick = new EventEmitter();
}
