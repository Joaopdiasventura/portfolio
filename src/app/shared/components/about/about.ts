import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about',
  imports: [NgClass, RevealOnScrollDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  public highlights = [
    {
      icon: 'code',
      title: 'Frontend Development',
      description: 'Expert in Angular and React',
    },
    {
      icon: 'server',
      title: 'Backend Development',
      description: 'Proficient in Node.js, REST APIs, and microservices',
    },
    {
      icon: 'database',
      title: 'Database Design',
      description: 'Experience with SQL, NoSQL, and cloud database solutions',
    },
    {
      icon: 'cloud',
      title: 'Cloud Management',
      description: 'Deploy applications to AWS, GCP, and Vercel',
    },
  ];
}
