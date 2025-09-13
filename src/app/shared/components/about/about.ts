import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [NgClass],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  public highlights = [
    {
      icon: 'code',
      title: 'Frontend Development',
      description: 'Expert in React, Angular, and Nextjs',
    },
    {
      icon: 'server',
      title: 'Backend Development',
      description: 'Proficient in Node.js with RESTful API and microsservice design',
    },
    {
      icon: 'database',
      title: 'Database Design',
      description: 'Experience with SQL, NoSQL, and cloud database solutions',
    },
    {
      icon: 'cloud',
      title: 'Cloud Managment',
      description: 'Upload applications in AWS, GCP, and Vercel',
    },
  ];
}
