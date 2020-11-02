import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getNavbarLinksBasedOnUserRole'
})
export class GetNavbarLinksBasedOnUserRolePipe implements PipeTransform {

  transform(navbarLinks: any): unknown {
    const loginData = JSON.parse(localStorage.getItem('data'));
    let roles = undefined;
    if (loginData) {
      roles = loginData.roles;
    }
    if (roles=='company_user') {
      navbarLinks = navbarLinks.filter(n => n.name !== 'Find job');
    } else {
      navbarLinks = navbarLinks.filter(n => n.name !== 'Find employee');
    }

    return navbarLinks;
  }

}
