import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ERROR } from '../../animations/error-input-animation';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  animations: [ERROR],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() labelText: string;
  @Input() required: boolean = false;
  @Input() placeholder: string;
  @Input() formControlName: string;

  private errors = {
    required: 'errors.required',
  };

  /** Input */
  @ViewChild('input') input: ElementRef;

  /* Keys pressed (mostly for select mode if aditional logic is required) */
  @Output('enterPress') enterPressEmitter = new EventEmitter<any>();
  @Output('upPress') upPressEmitter = new EventEmitter<any>();
  @Output('downPress') downPressEmitter = new EventEmitter<any>();

  public control: AbstractControl;

  disabled = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  private previousError: string;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  private _value;

  public get value() {
    return this._value;
  }

  public set value(v) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }

  writeValue(value: number): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  hasError() {
    return (
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  getError() {
    for (const key in this.control?.errors) {
      if (Object.prototype.hasOwnProperty.call(this.control.errors, key)) {
        this.previousError = this.errors[key];
        return this.errors[key];
      }
    }
    return this.previousError;
  }

  /** Enables parent components to set focus to the input inside */
  public focus() {
    this.input.nativeElement.focus();
  }

  /** When enter key is pressed in the input */
  public enterPressed() {
    this.enterPressEmitter.emit();
  }

  /** When up arrow key is pressed in the input */
  public upArrowPressed(e: Event) {
    this.upPressEmitter.emit();
  }

  /** When down arrow key is pressed in the input */
  public downArrowPressed(e: Event) {
    this.downPressEmitter.emit();
  }

  /** Prevent close on click inside of the modal */
  public preventClose(e: any): void {
    e.stopPropagation();
  }
}
