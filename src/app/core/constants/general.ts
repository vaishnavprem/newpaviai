import {environment} from '../../../environments/environment';
import {OwlOptions} from 'ngx-owl-carousel-o';

export const API_URL = environment.apiUrl;
export const AVATAR_URL= environment.avatarUrl;

export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const TEXT_ONLY_PATTERN = /^[a-zA-Z -/]*$/;
export const ADDRESS_PATTERN = /^[a-zA-Z0-9\s,.'-]{3,}$/;
export const NUMBER_AFTER_TEXT_PATTERN = /^[a-zA-Z ]/;
export const DATE_ONLY_PATTERN = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
export const NO_SPACE_PATTERN = /^\S*$/;
export const NUMBERS_ONLY_PATTERN = /^[0-9]*$/;
export const YEAR_ONLY_PATTERN = /^\d{4}$/;
export const NAVBAR_LINKS = [
  {name: 'Home', route: '/'},
  {name: 'About us', route: '/users/about'},
  {name: 'Contact us', route: '/users/contact-us'},
  {name: 'Find job', route: '/jobs/find-job'},
  {name: 'Find employee', route: '/users/find-employees'},
];

export const OWL_CAROUSEL_OPTIONS: OwlOptions = {
  loop: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  nav: true,
  navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
  navSpeed: 700,
  margin: 20,
  startPosition: 8,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 2
    },
    940: {
      items: 2
    }
  },
};

export const HOMEPAGE_OWL_CAROUSEL_OPTIONS: OwlOptions = {
  loop: false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  nav: true,
  navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
  navSpeed: 700,
  margin: 20,
  startPosition: 8,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 2
    },
    940: {
      items: 2
    }
  },
};

export const FORM_OWL_CAROUSEL_OPTIONS: OwlOptions = {
  loop: false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  nav: true,
  navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
  navSpeed: 700,
  margin: 20,
  startPosition: 8,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
};

export const FINAL_DECISION = {
  0 : 'Decline',
  1 : 'Advance',
  2 : 'Offer',
  3 : 'Hired'
};



