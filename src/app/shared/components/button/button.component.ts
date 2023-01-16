import { Component, Input, OnInit } from '@angular/core';
import { ButtonType } from './buttonType';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: ButtonType = 'primary';

  @Input() text: string;

  constructor() { }

  ngOnInit(): void { }

}
