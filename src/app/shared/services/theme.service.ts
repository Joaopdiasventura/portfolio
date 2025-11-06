import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  public readonly theme = signal<Theme>('dark');

  public constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = (localStorage.getItem('theme') as Theme | null) ?? null;
      if (stored == 'light' || stored == 'dark') this.theme.set(stored);
      else
        this.theme.set(
          window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark',
        );

      effect(() => {
        const t = this.theme();
        document.documentElement.classList.toggle('light', t == 'light');
        localStorage.setItem('theme', t);
      });
    }
  }

  public toggle(): void {
    this.theme.set(this.theme() == 'light' ? 'dark' : 'light');
  }

  public setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
