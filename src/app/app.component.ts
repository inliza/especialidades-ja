import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Especialidades-JA';

  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.authService.setLoginValue()) {
      // this.authService.getLoggedRequest().subscribe((data) => {
      // });
    };
  }


}
