import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [NgClass],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  public contactInfo = [
    {
      icon: 'mail',
      label: 'Email',
      value: 'joaopdias.dev@gmail.com',
      href: 'mailto:joaopdias.dev@gmail.com',
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+55 (11) 986553558',
      href: 'tel:+5511986553558',
    },
    {
      icon: 'map',
      label: 'Location',
      value: 'São Paulo, BR',
      href: 'https://maps.app.goo.gl/mg9YnGrptCRBWR4YA',
    },
  ];

  public socialLinks = [
    {
      icon: 'github',
      label: 'GitHub',
      href: 'https://github.com/Joaopdiasventura',
      username: '@Joaopdiasventura',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/joaopdias-dev',
      username: '/in/joaopdias-dev',
    },
  ];
}
