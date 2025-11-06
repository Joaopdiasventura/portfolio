import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input('appReveal') public direction: Direction = 'up';
  @Input() public revealDelay = 0;

  private observer?: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly render = inject(Renderer2);

  public ngOnInit(): void {
    const native = this.host.nativeElement;
    this.render.addClass(native, 'reveal');
    this.render.addClass(native, `from-${this.direction}`);

    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const action = (): void => this.render.addClass(native, 'visible');
            if (this.revealDelay > 0) setTimeout(action, this.revealDelay);
            else action();
            this.observer?.unobserve(native);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );
    this.observer.observe(native);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
