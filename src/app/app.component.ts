import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cognito-multi-auth';

  private async setupOAuth() {
    this.oauthService.configure({
      redirectUri: window.location.origin + "/index.html",
      clientId: "spa-demo",
      scope: "openid profile email voucher",
      issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
      oidc: true,
    });
    this.oauthService.setStorage(sessionStorage);

    await this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  constructor(private oauthService: OAuthService) {
    this.setupOAuth();
  }
}
