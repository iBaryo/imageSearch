import { Component, OnInit, Input } from '@angular/core';
import { Image } from "app/image.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input('image')
  public image : Image;
  constructor() { }

  ngOnInit() {
  }

}
