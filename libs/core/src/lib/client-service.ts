import { Observable } from 'rxjs';

export interface IClientService {
    healthCheck(): Observable<boolean>;
}
