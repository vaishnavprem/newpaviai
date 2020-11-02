import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './modules/material.module';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/layout/header/header.component';
import {NavbarComponent} from './components/layout/navbar/navbar.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {RouterModule} from '@angular/router';
import {SaveWorkExperienceDialogComponent} from './components/dialogs/save-work-experience-dialog/save-work-experience-dialog.component';
import {SaveProgrammingSkillsDialogComponent} from './components/dialogs/save-programming-skills-dialog/save-programming-skills-dialog.component';
import {SaveEducationDialogComponent} from './components/dialogs/save-education-dialog/save-education-dialog.component';
import {SaveCertificationDialogComponent} from './components/dialogs/save-certification-dialog/save-certification-dialog.component';
import {UploadPdfDialogComponent} from './components/dialogs/upload-pdf-dialog/upload-pdf-dialog.component';
import {AddSocialLinksDialogComponent} from './components/dialogs/add-social-links-dialog/add-social-links-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InvitationDialogComponent} from './components/dialogs/invitation-dialog/invitation-dialog.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {SidebarComponent} from './components/layout/sidebar/sidebar.component';
import { ShowConfirmDialogComponent } from './components/dialogs/show-confirm-dialog/show-confirm-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SaveWorkExperienceDialogComponent,
    SaveProgrammingSkillsDialogComponent,
    SaveEducationDialogComponent,
    SaveCertificationDialogComponent,
    UploadPdfDialogComponent,
    AddSocialLinksDialogComponent,
    InvitationDialogComponent,
    SidebarComponent,
    ShowConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SaveWorkExperienceDialogComponent,
    SaveProgrammingSkillsDialogComponent,
    SaveEducationDialogComponent,
    SaveCertificationDialogComponent,
    UploadPdfDialogComponent,
    AddSocialLinksDialogComponent
  ]

})
export class CoreModule {
}
