import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private async setupOAuth() {
    this.oauthService.configure({
      redirectUri: window.location.origin,
      scope: "openid profile email",
      strictDiscoveryDocumentValidation: false,
      oidc: true,
      
      issuer: 'https://accounts.google.com',
      clientId: "336820793242-to5kpptve63os39t1vs06lje1o4epvl8.apps.googleusercontent.com",
      // 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
    });
    
    this.oauthService.setStorage(sessionStorage);

    await this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  constructor(private oauthService: OAuthService) {
    this.setupOAuth();
  }

  get claimEntries(): [string, any][] {
    if (this.oauthService.hasValidIdToken()) {
      return Object.entries(this.oauthService.getIdentityClaims());
    }
    return [];
  }

  public logout() {
    this.oauthService.logOut();
  }
}
