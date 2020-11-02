import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../services/common.service';

// import {CommonService} from '../services/common.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(public router: Router,
              public toastr: ToastrService,
              private common: CommonService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((res: HttpResponse<any>) => {

    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // this.common.formProcessing = false;
        // this.common.dataLoading = false;
        const message = err.error.message;

        if (typeof err.error === 'string') {
          if (err.status !== 422) {
            if (err.status === 404) {
              this.toastr.error('', 'Not found');
            } else {
              this.toastr.error(JSON.parse(err.error)['msg'])
            }
          } else {
            this.toastr.error(err.error); // db connection error
          }
        }

        // if (!this.common.showOverlay) {
        // Sequelize db connection error
        if (err.error.hasOwnProperty('db_error')) {
          this.toastr.error(err.error.db_error, 'Unable to connect to database');

          // Server connection error
        } else if (err.status === 200 || err.status === 0 || err.error.hasOwnProperty('conn_error') && err.status !== 304) {
          this.toastr.error('Please check server connection.', 'Unable to connect to server');
        } else {

          this.common.companyNameExists = err.error.hasOwnProperty('company_name_exists');

          if (err.error.hasOwnProperty('msg')) {
            this.toastr.error('', err.error.msg);
          } else if (message) {
            this.toastr.error(message.replace(/<(.|\n)*?>/g, ''));
          }
        }
        // }


      }
    }));
  }
}
