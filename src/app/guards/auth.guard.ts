import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
//The auth guard is an angular route guard that's used to prevent unauthorized users from accessing restricted routes, it does this by implementing the CanActivate interface which allows the guard to decide if a route can be activated with the canActivate() method.
//If the method returns true the route is activated (allowed to proceed), otherwise if the method returns false the route is blocked.

//http://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    //if it returns true, user can go to that route, if it returns false, user can't go
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {     //route.data.roles refers to this --> data: { roles: [Role.Admin] }
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
 
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}