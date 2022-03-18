import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Colors } from 'Color';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-keyboard-item',
  templateUrl: './game-keyboard-item.component.html',
  styleUrls: ['./game-keyboard-item.component.css']
})
export class GameKeyboardItemComponent implements OnInit {
  @Input() value: string;
  @Input() displayValue: string;
  @Input() bgColor: string;
  @Output() newKeypressEvent = new EventEmitter<string>();
  @ViewChild('key') key: ElementRef;

  backspaceIcon = faBackspace;
  color: string;
  boxShadowY = 3;
  boxShadowOpacity = 0.6;

  constructor() { }

  ngOnInit(): void {
  }

  onKeyPressed() {
    this.newKeypressEvent.emit(this.value);
    this.boxShadowY = 1;
    this.boxShadowOpacity = .3;
    const height = this.key.nativeElement.offsetHeight;
    this.key.nativeElement.style.height = height-2+'px';
    this.key.nativeElement.style.marginTop = '6px';
    setTimeout(() => {
      this.boxShadowY = 3;
      this.boxShadowOpacity = .6;
      this.key.nativeElement.style.height = height+'px';
      this.key.nativeElement.style.marginTop = '4px';
    }, 100);
  }

  getColor() {
    if(this.bgColor == Colors.LighterGrey) {
      return Colors.UncheckedLetter;
    }
    return Colors.CheckedLetter;
  }

  getBoxShadow():string {
    const cssVarName = this.bgColor.slice(4, this.bgColor.length-1);
    // console.log(cssVarName);
    const hexValue = getComputedStyle(document.querySelector('.key')).getPropertyValue(cssVarName).split(' ')[1];
    // console.log( hexValue );
    let rgbColor = this.hexToRgb(hexValue);
    return `1px ${this.boxShadowY}px 0px rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${this.boxShadowOpacity})`;
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
