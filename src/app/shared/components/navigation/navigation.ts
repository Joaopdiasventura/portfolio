import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  signal,
  inject,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation implements OnInit, OnDestroy {
  public isMenuOpen = signal(false);
  public activeSection = signal('home');
  public navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  private observer?: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);
  private ticking = false;

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(() => ({}), { threshold: 0.6 });
    for (const { id } of this.navItems) {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    }
    this.updateActiveByScroll();
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) this.observer?.disconnect();
  }

  public scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
    this.activeSection.set(sectionId);
    this.isMenuOpen.set(false);
  }

  public toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.updateActiveByScroll();
      this.ticking = false;
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateActiveByScroll();
  }

  private updateActiveByScroll(): void {
    const center = window.innerHeight / 2;
    let bestId = this.activeSection();
    let bestDist = Number.POSITIVE_INFINITY;
    for (const { id } of this.navItems) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top - center);
      if (d < bestDist) {
        bestDist = d;
        bestId = id;
      }
    }
    if (bestId) this.activeSection.set(bestId);
  }
}
