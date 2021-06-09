import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountResponse } from '@app/@openapi/auth';
import { AuthenticationService } from '@app/@shared/service/authentication.service';
import { CurrentAccountService } from '@app/@shared/service/current-account.service';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
})
export class AccountProfileComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private currentAccountService: CurrentAccountService
  ) {}

  ngOnInit(): void {
    this.currentAccountService.get().subscribe((account) => {
      const { name, email, company } = account;
      this.formGroup = new FormGroup({
        name: new FormControl(name, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(email, [Validators.required, Validators.email]),
        company: new FormControl(company, [Validators.minLength(3)]),
      });
    });
  }

  onUpdate(account: AccountResponse): void {}

  get photoUrl(): string {
    return this.authenticationService.photoUrl;
  }
}
