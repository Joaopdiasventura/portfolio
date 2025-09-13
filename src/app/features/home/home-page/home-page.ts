import { Component } from '@angular/core';
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
export class HomePage {}
