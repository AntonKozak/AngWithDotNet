import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Project {
  title: string;
  description: string;
  linkName: string;
  link: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  auction: Project = {
    title: 'Auction project "Auction House"',

    description: `Auction House is a web application that allows users to bid on items in real-time.
    The application features a user-friendly and 
    Microservices based app using .Net, Razor Pages, ASP.NET, NextJS, IdentityServer, RabbitMQ running on Docker and Kubernetes.`,
    linkName: 'GitHub Auction House',

    link: 'https://github.com/AntonKozak/Auction',
  };

  hms: Project = {
    title: 'HMS projects "7741 Anybus Communicator" and "7750 Wireless Bolt"',

    description: `The Anybus Communicator is a versatile gateway that connects
     industrial devices across different network protocols, such as EtherNet/IP and Modbus-TCP. 
    The Wireless Bolt is an innovative IoT solution that 
    facilitates wireless communication for industrial applications. 
    It supports multiple protocols for compatibility,
     offering reliable data transmission over long distances.  `,

     linkName: 'Anybus Communicator emulator',

    link: 'https://emulator.online-config.anybus.com/',
  };
  @Input() projects: Project[] = [this.hms, this.auction];
}
