import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from "rxjs/operators";
import { Role } from "../core/userRoles";
import { UserProviderService } from "../services/user-provider.service";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(private userProviderService: UserProviderService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users = this.userProviderService.getUsers();

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token'); //check if user is logged in
        const roleString = isLoggedIn && authHeader.split('.')[1]; 
        const role = roleString ? Role[roleString] : null; //get user role

         // wrap in delayed observable to simulate server api call
         return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return this.error('Username or password is incorrect');
                return this.ok({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }

            //get all users (admin only)
            if (request.url.endsWith('/users') && request.method === 'GET') { //authorize to url just if it is logged in with needed role
                if (role !== Role.Admin) return this.unauthorised();
                return this.ok(users);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }

    private ok(body:any) {
        return of(new HttpResponse({ status: 200, body }));
    }

    private unauthorised() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    private error(message:any) {
        return throwError({ status: 400, error: { message } });
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};