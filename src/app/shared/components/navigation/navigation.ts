import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  signal,
  inject,
  HostListener,
  ElementRef,
  AfterViewInit,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation implements OnInit, OnDestroy, AfterViewInit {
  public isMenuOpen = signal(false);
  public activeSection = signal('home');
  public readonly navItems: { id: string; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  private observer?: IntersectionObserver;
  private scrollLockUntil = 0;
  private ticking = false;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly theme = inject(ThemeService);
  private readonly host = inject(ElementRef<HTMLElement>);

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(() => ({}), { threshold: 0.6 });
    for (const { id } of this.navItems) {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    }
    this.updateActiveByScroll();
  }

  public ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.activeSection.set('home');
    effect(() => {
      this.activeSection();
      this.updateUnderline();
    });
    setTimeout(() => {
      this.updateActiveByScroll();
      this.updateUnderline();
    });
  }

  @HostListener('window:load')
  public onWindowLoad(): void {
    this.updateActiveByScroll();
    this.updateUnderline();
  }

  public ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) this.observer?.disconnect();
  }

  public toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  public toggleTheme(): void {
    this.theme.toggle();
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.isMenuOpen()) this.isMenuOpen.set(false);

    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      if (Date.now() >= this.scrollLockUntil) this.updateActiveByScroll();
      this.updateUnderline();
      this.ticking = false;
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.updateActiveByScroll();
    this.updateUnderline();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) return;
    if (!isPlatformBrowser(this.platformId)) return;
    const hostEl = this.host.nativeElement;
    const target = event.target as Node | null;
    if (target && !hostEl.contains(target)) {
      this.isMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    if (this.isMenuOpen()) this.isMenuOpen.set(false);
  }

  private updateActiveByScroll(): void {
    const navH = this.getNavHeight() + 8;
    const currentId = this.activeSection();
    let bestId = currentId;
    let bestTop = -Infinity;
    let nextId: string | null = null;
    let nextTop = Infinity;
    for (const { id } of this.navItems) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top - navH;
      if (top <= 0 && top > bestTop) {
        bestTop = top;
        bestId = id;
      }
      if (top > 0 && top < nextTop) {
        nextTop = top;
        nextId = id;
      }
    }
    if (bestTop == -Infinity && nextId) bestId = nextId;
    if (bestId) this.activeSection.set(bestId);
  }

  private getNavHeight(): number {
    const bar = document.querySelector('.nav .bar') as HTMLElement | null;
    return bar?.offsetHeight ?? 64;
  }

  public scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const doScroll = (): void => {
      const rect = el.getBoundingClientRect();
      const target = window.scrollY + rect.top - this.getNavHeight() - 8;
      window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
      this.activeSection.set(sectionId);
    };

    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
      setTimeout(doScroll, 220);
    } else doScroll();

    this.scrollLockUntil = Date.now() + 800;
    this.updateUnderline();
  }

  private updateUnderline(): void {
    const container = document.querySelector('.desktop-nav') as HTMLElement | null;
    const underline = document.getElementById('nav-underline') as HTMLElement | null;
    if (!container || !underline) return;
    const id = this.activeSection();
    let active = container.querySelector(`.nav-link[data-id="${id}"]`) as HTMLElement | null;

    if (!active)
      active = container.querySelector('.nav-link:not([data-static])') as HTMLElement | null;

    if (!active) {
      underline.style.width = '0px';
      return;
    }
    const cr = container.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    const left = ar.left - cr.left;
    underline.style.transform = `translateX(${left}px)`;
    underline.style.width = `${ar.width}px`;
  }
}
