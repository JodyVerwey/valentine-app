import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valentine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valentine.component.html',
  styleUrls: ['./valentine.component.css'],
})
export class ValentineComponent implements AfterViewInit {
  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  accepted = false;
  showPopup = false;

  private popupTimerStarted = false;

  showVideo = false;
  noMoveCount = 0;
  currentMedia: 'prob' | 'sien' | 'fokol' | null = null;

  gaanWegClicked = false;
  escalationStage = 0;

  explodeNoButton = false;
  hideNoButton = false;

  catVideos: { id: number; rotation: number }[] = [];
  catInterval: any = null;

  isMusicPaused = false;

  musicMoveCount = 0;
  musicButtonFrozen = false;
  musicControlMoveCount = 0;
  musicControlFrozen = false;
  musicTilt = 0;

  toggleMusic() {
    const audio = this.bgMusic?.nativeElement;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      this.isMusicPaused = false;
    } else {
      audio.pause();
      this.isMusicPaused = true;
    }
  }

  yes() {
    this.unmuteMusic();
    this.accepted = true;
    this.showPopup = false;

    setTimeout(() => {
      this.startCatApocalypse();
    }, 3000);
  }

  openBoredLink() {
    window.open('https://www.youtube.com/watch?v=A_XGYvcQEss', '_blank');
  }

  startCatApocalypse() {
    this.catVideos = [
      {
        id: 1,
        rotation: Math.floor(Math.random() * 360),
      },
    ];

    this.catInterval = setInterval(() => {
      if (this.catVideos.length >= 4) {
        clearInterval(this.catInterval);
        return;
      }

      this.catVideos.push({
        id: this.catVideos.length + 1,
        rotation: Math.floor(Math.random() * 360),
      });
    }, 1000);
  }

  unmuteMusic() {
    const audio = this.bgMusic?.nativeElement;
    if (!audio) return;

    audio.muted = false;
    audio.volume = 0.15;

    audio.play().catch(() => {});
  }

  moveMusicButton(event: MouseEvent) {
    if (this.musicButtonFrozen) {
      return;
    }

    const button = event.target as HTMLElement;

    if (!button.style.width) {
      const rect = button.getBoundingClientRect();
      button.style.width = rect.width + 'px';
      button.style.height = rect.height + 'px';
      button.style.left = rect.left + 'px';
      button.style.top = rect.top + 'px';
    }

    this.musicMoveCount++;

    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    button.style.left = Math.random() * maxX + 'px';
    button.style.top = Math.random() * maxY + 'px';
    button.style.right = 'auto';

    if (this.musicMoveCount >= 3) {
      this.musicButtonFrozen = true;
    }
  }

  moveMusicControl(event: MouseEvent) {
    if (this.musicControlFrozen) {
      return;
    }

    const container = (event.target as HTMLElement).closest(
      '.music-controls',
    ) as HTMLElement;

    if (!container) return;

    if (!container.style.left) {
      const rect = container.getBoundingClientRect();
      container.style.position = 'fixed';
      container.style.left = rect.left + 'px';
      container.style.top = rect.top + 'px';
      container.style.width = rect.width + 'px';
      container.style.height = rect.height + 'px';
      container.style.right = 'auto';
    }

    this.musicControlMoveCount++;

    const maxX = window.innerWidth - container.offsetWidth;
    const maxY = window.innerHeight - container.offsetHeight;

    container.style.left = Math.random() * maxX + 'px';
    container.style.top = Math.random() * maxY + 'px';

    if (this.musicControlMoveCount >= 3) {
      this.musicControlFrozen = true;
    }
  }

  setVolume(event: Event) {
    const audio = this.bgMusic?.nativeElement;
    if (!audio) return;

    const input = event.target as HTMLInputElement;
    const value = +input.value;

    audio.volume = value;

    this.musicTilt = (value - 0.5) * 1000;
  }

  moveNo(event: MouseEvent) {
    if (this.showVideo || this.explodeNoButton || this.hideNoButton) {
      return;
    }

    const button = event.target as HTMLElement;

    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    button.style.position = 'fixed';
    button.style.left = Math.random() * maxX + 'px';
    button.style.top = Math.random() * maxY + 'px';

    if (!this.popupTimerStarted) {
      this.popupTimerStarted = true;
      setTimeout(() => {
        if (!this.accepted) {
          this.showPopup = true;
        }
      }, 3000);
    }

    if (!this.gaanWegClicked) {
      return;
    }

    if (this.escalationStage === 1) {
      this.currentMedia = 'sien';
      this.showVideo = true;
      this.escalationStage = 2;
      return;
    }

    if (this.escalationStage === 2) {
      this.currentMedia = 'fokol';
      this.showVideo = true;
      this.escalationStage = 3;
      return;
    }
  }

  closePopup() {
    this.showPopup = false;
  }

  sorry() {
    this.showPopup = false;

    this.explodeNoButton = true;

    setTimeout(() => {
      this.hideNoButton = true;
    }, 1200);
  }

  gaanWeg() {
    this.showPopup = false;
    this.currentMedia = 'prob';
    this.showVideo = true;

    this.gaanWegClicked = true;
    this.noMoveCount = 0;
    this.escalationStage = 1;
  }

  closeVideo() {
    if (this.currentMedia === 'fokol') {
      this.explodeNoButton = true;

      setTimeout(() => {
        this.hideNoButton = true;
      }, 1200);
    }

    this.showVideo = false;
    this.currentMedia = null;
  }

  ngAfterViewInit() {
    const video = document.querySelector(
      '.background-video',
    ) as HTMLVideoElement;

    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }

  openIdolLink() {
    window.open('https://www.youtube.com/watch?v=GasotumAaqU', '_blank');
  }
}
