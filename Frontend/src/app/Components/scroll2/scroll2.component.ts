import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-scroll2',
  templateUrl: './scroll2.component.html',
  styleUrls: ['./scroll2.component.scss']
})
export class Scroll2Component implements OnInit {
  scrollpicHeight;
  element0;
  element1;
  element2;
  element3;
  element4;
  @ViewChild('firas_img', {static: false}) firasImg;
  constructor( @Inject(DOCUMENT) document) {
    // this.firasImg = document.getElementById('firas_img') ;
    this.element0 = document.getElementsByClassName('firas_txt')[0] ;
    this.element1 = document.getElementsByClassName("firas_txt")[1];
    this.element2 = document.getElementsByClassName("firas_txt")[2];
    this.element3 = document.getElementsByClassName("firas_txt")[3];
    this.element4 = document.getElementsByClassName("firas_txt")[4];
  }

  ngOnInit() {
    this.scrollpicHeight = Math.ceil(this.firasImg.nativeElement.offsetWidth * 1.7);
    this.firasImg.style['height'] = this.scrollpicHeight + 'px';
    this.element0.style["top"] = "0px";
    this.element1.style["top"] = Math.ceil(this.scrollpicHeight / 5) + 'px';
    this.element2.style["top"] = Math.ceil(this.scrollpicHeight / 5 * 2) + 'px';
    this.element3.style["top"] = Math.ceil(this.scrollpicHeight / 5 * 3) + 'px';
    this.element4.style["top"] = Math.ceil(this.scrollpicHeight / 5 * 4) + 'px';
    document.addEventListener('scroll', () => {
      let domRect = document.getElementsByClassName('firas_txt')[0].getBoundingClientRect();
      if (domRect.top < 400) {
        document.getElementsByClassName('firas_txt')[0].className = 'firas_txt txtright righttxtactive';
      } else {
        document.getElementsByClassName('firas_txt')[0].className = 'firas_txt txtright';
      }
      // _________________________________________________________________________________________________
      domRect = document.getElementsByClassName('firas_txt')[1].getBoundingClientRect();
      if (domRect.top < 400) {
        document.getElementsByClassName('firas_txt')[1].className = 'firas_txt txtleft lefttxtactive';
      } else {
        document.getElementsByClassName('firas_txt')[1].className = 'firas_txt txtleft';
      }
      // _________________________________________________________________________________________________
      domRect = document.getElementsByClassName('firas_txt')[2].getBoundingClientRect();
      if (domRect.top < 400) {
        document.getElementsByClassName('firas_txt')[2].className = 'firas_txt txtright righttxtactive';
      } else {
        document.getElementsByClassName('firas_txt')[2].className = 'firas_txt txtright';
      }
      // _________________________________________________________________________________________________
      domRect = document.getElementsByClassName('firas_txt')[3].getBoundingClientRect();
      if (domRect.top < 400) {
        document.getElementsByClassName('firas_txt')[3].className = 'firas_txt txtleft lefttxtactive';
      } else {
        document.getElementsByClassName('firas_txt')[3].className = 'firas_txt txtleft';
      }
      // _________________________________________________________________________________________________
      domRect = document.getElementsByClassName('firas_txt')[4].getBoundingClientRect();
      if (domRect.top < 400) {
        document.getElementsByClassName('firas_txt')[4].className = 'firas_txt txtright righttxtactive';
      } else {
        document.getElementsByClassName('firas_txt')[4].className = 'firas_txt txtright';
      }
    });
  }

}
