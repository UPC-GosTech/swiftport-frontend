import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { tsParticles, type ISourceOptions, type Container } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent implements AfterViewInit, OnDestroy {
  private particlesContainer?: Container;

  async ngAfterViewInit() {
    await loadFull(tsParticles);
    this.particlesContainer = await tsParticles.load({ id: 'auth-particles', options: this.particlesOptions });
  }

  ngOnDestroy() {
    this.particlesContainer?.destroy();
  }

  private particlesOptions: ISourceOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 60, density: { enable: true } },
      color: { value: ['#E6801A', '#E65A1A', '#FFD699'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: { min: 2, max: 4 } },
      move: { enable: true, speed: 1, direction: 'none', outModes: { default: 'out' } },
      links: { enable: true, color: '#E6801A', distance: 120, opacity: 0.2, width: 1 }
    },
    detectRetina: true
  };
} 