import {Directive, HostBinding, HostListener, Output, EventEmitter} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

export interface FileHandle {
  file: File,
  url: SafeUrl
}

@Directive({
  selector: '[appFiledragdropdirective]'
})

export class FiledragdropdirectiveDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    /*let files: FileHandle[] = [];
    // @ts-ignore
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      // @ts-ignore
      const file = evt.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }*/
    // @ts-ignore
    const files: any = evt.dataTransfer.files;
    let valid_files: FileHandle[] = files;
    this.files.emit(valid_files);
  }
}
