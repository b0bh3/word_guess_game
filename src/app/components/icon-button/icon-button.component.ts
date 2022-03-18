import { Component, OnInit, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {
  @Input() icon: IconProp;
  faQestionCircle = faQuestionCircle;
  faWrench = faWrench;
  faChartLine = faChartLine;

  constructor() { }

  ngOnInit(): void {
    //console.log(typeof faQuestionCircle);
  }

  onClick() {
    // console.log('click');
  }
}
