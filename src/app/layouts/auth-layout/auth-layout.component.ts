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
    fpsLimit: 120,
    particles: {
      number: { value: 150, density: { enable: true } },
      color: { value: ['#E6801A', '#E65A1A', '#FFD699', '#FFE5CC'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.7,
        animation: {
          enable: true,
          speed: 5,
          sync: false
        }
      },
      size: {
        value: { min: 2, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        outModes: { default: 'out' },
        attract: { enable: true, rotate: { x: 600, y: 600 } }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#E6801A',
        opacity: 0.15,
        width: 1
      }
    },
    detectRetina: true
  };
} 