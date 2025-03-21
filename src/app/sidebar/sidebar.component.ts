import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule, CommonModule,
    MatSidenavModule, MatListModule, MatToolbarModule, MatMenuModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSmallScreen: boolean = false;
  isAdmin: boolean = false;
  showSidenav: boolean = true;
  dropdownOpen: boolean = false;
  public options: any[] = [
    { route: '/home/profile', title: 'Perfil', icon: 'person' },
    { route: '/home/management-specialties', title: 'Especialidades', icon: 'library_books', admin: true },
    { route: '/home/user-specialties', title: 'Mis especialidades', icon: 'work' },
    { route: '/home/users', title: 'Usuarios', icon: 'people',  },
  ];

  constructor(
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });

    this.auth.loggedUser$.subscribe((data: any) => {
      if (data) {
        this.isAdmin = data.isAdmin;
      }
    });
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    this.auth.logout();
  }
}
