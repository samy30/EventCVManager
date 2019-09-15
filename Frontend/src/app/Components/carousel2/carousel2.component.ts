import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-carousel2',
  templateUrl: './carousel2.component.html',
  styleUrls: ['./carousel2.component.scss']
})
export class Carousel2Component implements OnInit {
  carrousels ;
  carcircles ;
  carbars ;
  currentC;
  carouselT;

  constructor( @Inject(DOCUMENT) document) {
    this.carrousels = document.getElementsByClassName('kaaba');
    this.carcircles = document.getElementsByClassName('firas_circle');
    this.carbars = document.getElementsByClassName('carbar');
    this.currentC = 0;
  }

  ngOnInit() {
    this.carbars[0].className = 'carbar baractive';
    this.carouselT = setTimeout(this.autocarousel.bind(this), 3000);
  }

autocarousel() {
    this.carrousels[this.currentC].className = 'kaaba';
    this.carcircles[this.currentC].className = 'firas_circle';
    this.carbars[this.currentC].className = 'carbar';
    this.currentC += 1;
    if (this.currentC === 3) { this.currentC = 0; }
    this.carrousels[this.currentC].className = 'kaaba caractive';
    this.carcircles[this.currentC].className = 'firas_circle ciractive';
    this.carbars[this.currentC].className = 'carbar baractive';
    this.carouselT = setTimeout(this.autocarousel.bind(this), 3000);
  }
nextCarousel(x) {
    clearTimeout(this.carouselT);
    this.carrousels[this.currentC].className = 'kaaba';
    this.carcircles[this.currentC].className = 'firas_circle';
    this.carbars[this.currentC].className = 'carbar';
    this.currentC += x;
    if (this.currentC === -1) { this.currentC = 2; }
    if (this.currentC === 3) { this.currentC = 0; }
    this.carrousels[this.currentC].className = 'kaaba caractive';
    this.carcircles[this.currentC].className = 'firas_circle ciractive';
    this.carbars[this.currentC].className = 'carbar baractive';
    this.carouselT = setTimeout(this.autocarousel.bind(this), 3000);
  }
carnum(x) {
    clearTimeout(this.carouselT);
    this.carrousels[0].className = 'kaaba';
    this.carcircles[0].className = 'firas_circle';
    this.carbars[0].className = 'carbar';
    this.carrousels[1].className = 'kaaba';
    this.carcircles[1].className = 'firas_circle';
    this.carbars[1].className = 'carbar';
    this.carrousels[2].className = 'kaaba';
    this.carcircles[2].className = 'firas_circle';
    this.carbars[2].className = 'carbar';
    this.currentC = x;
    this.carrousels[this.currentC].className = 'kaaba caractive';
    this.carcircles[this.currentC].className = 'firas_circle ciractive';
    this.carbars[this.currentC].className = 'carbar baractive';
    this.carouselT = setTimeout(this.autocarousel.bind(this), 30000);
  }

}
