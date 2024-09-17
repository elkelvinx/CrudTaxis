import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SafeHtml,DomSanitizer } from '@angular/platform-browser';


@Pipe({name: 'changeLog'})
export class ChangeLogPipe  {
    constructor(private datePipe: DatePipe,private sanitizer: DomSanitizer) {}
mixNameId(name: string, id: number): string {
    const nameFormated = name + ' - (' + id + ')';
    return nameFormated;
}
mixNameIdLoop(data:any): any {
    for (let i = 0; i < data.length; i++) {
        data[i].userName = this.mixNameId(data[i].userName, data[i].idUser);
    }
    debugger
    return data;
}
}