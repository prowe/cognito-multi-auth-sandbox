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
      
      responseType: 'code',
      issuer: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_huQRHNw3K',
      clientId: '5afmpt6r43bibig2ujj5giood2',
      dummyClientSecret: '1m8gndff73jq6slq5e0opkjcmde4m1i0852fn92qv08vqhhnn7gu',

      // issuer: 'https://accounts.google.com',
      // clientId: "336820793242-to5kpptve63os39t1vs06lje1o4epvl8.apps.googleusercontent.com",
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
