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
import { UserSidebarComponent } from './components/layout/user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './components/layout/admin-sidebar/admin-sidebar.component';
import { CompanySidebarComponent } from './components/layout/company-sidebar/company-sidebar.component';
import { DashboardFooterComponent } from './components/layout/dashboard-footer/dashboard-footer.component';
import { UserDashboardHeaderComponent } from './components/layout/user-dashboard-header/user-dashboard-header.component';
import { CompanyDashboardHeaderComponent } from './components/layout/company-dashboard-header/company-dashboard-header.component';
import { AdminDashboardHeaderComponent } from './components/layout/admin-dashboard-header/admin-dashboard-header.component';


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
    ShowConfirmDialogComponent,
    UserSidebarComponent,
    AdminSidebarComponent,
    CompanySidebarComponent,
    DashboardFooterComponent,
    UserDashboardHeaderComponent,
    CompanyDashboardHeaderComponent,
    AdminDashboardHeaderComponent
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
    UserSidebarComponent,
    AdminSidebarComponent,
    CompanySidebarComponent,
    DashboardFooterComponent,
    UserDashboardHeaderComponent,
    CompanyDashboardHeaderComponent,
    AdminDashboardHeaderComponent,
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
