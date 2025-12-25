import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface Project {
  title: string;
  description: string;
  image: string;
  imageWebpSrcSet: string;
  imagePngSrcSet: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  imports: [RevealOnScrollDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  public fallback = 'assets/project-fallback.jpg';
  public readonly imageSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
  public readonly imageWidth = 960;
  public readonly imageHeight = 540;
  public projects: Project[] = [
    {
      title: 'Vox',
      description:
        'My graduation project, a voting system with advanced features, including user authentication, real-time voting, and a unique voting experience. Used by more than 500 students.',
      image: 'assets/images/vox-960.png',
      imageWebpSrcSet: 'assets/images/vox-480.webp 480w, assets/images/vox-960.webp 960w',
      imagePngSrcSet: 'assets/images/vox-480.png 480w, assets/images/vox-960.png 960w',
      technologies: ['Angular', 'Node.js', 'MongoDb', 'AWS'],
      githubUrl: 'https://github.com/Joaopdiasventura/vox-server',
      liveUrl: 'https://vox.joaopdias.dedyn.io',
    },
    {
      title: 'Stream processor',
      description:
        'A project developed to meet a product need of my company: an application that processes a text file with one million lines, saves it, and allows downloading an Excel file with all the data and formatting.',
      image: 'assets/images/stream-540.png',
      imageWebpSrcSet: 'assets/images/stream-480.webp 480w, assets/images/stream-540.webp 540w',
      imagePngSrcSet: 'assets/images/stream-480.png 480w, assets/images/stream-540.png 540w',
      technologies: ['Angular', 'Node.js', 'MongoDb', 'Web streams', 'Web workers'],
      githubUrl: 'https://github.com/Joaopdiasventura/stream-test-client',
    },
    {
      title: 'Chat',
      description:
        'A real-time chat platform with messaging, private and group audio/video calls, made to help a project from a different school.',
      image: 'assets/images/chat-1280.png',
      imageWebpSrcSet:
        'assets/images/chat-480.webp 480w, assets/images/chat-960.webp 960w, assets/images/chat-1280.webp 1280w',
      imagePngSrcSet:
        'assets/images/chat-480.png 480w, assets/images/chat-960.png 960w, assets/images/chat-1280.png 1280w',
      technologies: ['Angular', 'Node.js', 'MongoDb', 'Socket.io'],
      githubUrl: 'https://github.com/Joaopdiasventura/chat-client',
      liveUrl: 'https://chat-jojo.vercel.app',
    },
  ];

  public onImgError(e: Event): void {
    const el = e.target as HTMLImageElement;
    if (el.src != this.fallback) el.src = this.fallback;
  }
}
