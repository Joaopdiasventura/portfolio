import { Component, HostListener, signal } from '@angular/core';
import { Navigation } from '../../../shared/components/navigation/navigation';
import { Hero } from '../../../shared/components/hero/hero';
import { About } from '../../../shared/components/about/about';
import { Projects } from '../../../shared/components/projects/projects';
import { Contact } from '../../../shared/components/contact/contact';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-home-page',
  imports: [Navigation, Hero, About, Projects, Contact, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  public readonly hasScrolled = signal(false);

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    if (!this.hasScrolled()) this.hasScrolled.set(true);
  }
}
