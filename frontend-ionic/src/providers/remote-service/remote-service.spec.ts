import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { AccountsPage } from './../../pages/accounts/accounts';
import { MyApp } from './../../app/app.component';
import { RemoteServiceProvider } from './remote-service';

import { } from "jasmine";


let remote = null;
let backend = null;
describe('remote service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RemoteServiceProvider,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(mockBackend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });


    beforeEach(inject([RemoteServiceProvider, MockBackend], (remoteService, mockBackend) => {
        remote = remoteService;
        backend = mockBackend;
    }));

    it('get account data', (done) => {
        let acc = { id: "2323nde76", name: "mohamed", number: 232323 }

        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({ body: acc });
            connection.mockRespond(new Response(options));
            expect(connection.request.url).toEqual('http://localhost:3000/account/getAccount/2323nde76');
            expect(connection.request.method).toEqual(RequestMethod.Get);
        });

        remote.getAccount('2323nde76').subscribe((response) => {
            expect(response).toEqual(acc);
            expect(response.name).toEqual("mohamed");
            done();
        });
    });

});