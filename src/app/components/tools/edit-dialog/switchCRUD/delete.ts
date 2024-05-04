import { CommonModule } from '@angular/common';
import { ReadService, } from './../../../../services/crudDataArray/extra-Read.service';
import { ExtraUpdateService } from './../../../../services/crudDataArray/extra-Update.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class deleteClass {
    constructor(
        public CommonModule: CommonModule,
        public serviceUnit: ReadService,
        public serviceUpdate: ExtraUpdateService) { }
}