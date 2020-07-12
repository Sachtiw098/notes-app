import { Component, OnInit } from '@angular/core';

export class Notes {
  title: string;
  content: string;
  index: any;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  contentTitle: string;
  contentModel: string;
  contentIndex: any;
  search: string;
  notes: Notes[];
  searchNotes: Notes[];
  mode: string;
  backdrop: boolean;
  sideNavOpen: boolean;

  constructor() {
    this.contentTitle = '';
    this.contentModel = '';
    this.contentIndex = '0';

    const defaultnotes: Notes = {
      title: 'New Note',
      content: '',
      index: '0'
    };
    this.notes = [];
    if (localStorage.length) {
      for (let p = 0; p < localStorage.length; p++) {
        const storedNote: Notes = {
          title: localStorage[p],
          content: localStorage[p],
          index: p,
        };
        if (p == 0) {
          this.contentModel = localStorage[p];
        }
        this.notes.push(storedNote);
      }
    } else {
      this.notes = [defaultnotes];
    }
    this.searchNotes = this.notes;
  }
  ngOnInit() {
    this.onResize();
  }

  addNote() {
    this.contentTitle = 'New Note';
    this.contentModel = '';
    this.contentIndex = String(this.notes.length);
    const newNotes: Notes = {
      title: this.contentTitle,
      content: this.contentModel,
      index: this.contentIndex,
    };
    this.notes.push(newNotes);

    // set the model values to '' again
    this.contentModel = '';
    this.searchNotes = this.notes;
  }

  showNote(note) {
    this.contentModel = this.notes[note.index].content;
    this.contentIndex = note.index;
    if (this.backdrop) {
      document.getElementById('sidenav-button').click();
    }
  }

  changeNote() {
    if (this.contentModel) {
      this.contentTitle = this.contentModel;
      this.notes[this.contentIndex].title = this.notes[this.contentIndex].content = this.contentTitle;
    } else {
      this.contentTitle = "New Note";
      this.notes[this.contentIndex].title = this.notes[this.contentIndex].content = this.contentTitle;
    }
    localStorage.setItem(this.contentIndex, this.contentModel);
    this.searchNotes = this.notes;
  }

  deleteNote() {
    this.notes.splice(this.contentIndex, 1);
    localStorage.clear();
    if (this.notes.length == 0) {
      const defaultNotes: Notes = {
        title: 'New Note',
        content: '',
        index: '0'
      };
      this.notes.push(defaultNotes);
    }
    for (let p = 0; p < this.notes.length; p++) {
      this.notes[p].index = p;
      localStorage.setItem(String(p), this.notes[p].content);
      if (p == 0) {
        this.contentModel = this.notes[p].content;
      }
    }
    this.searchNotes = this.notes;
  }

  searchNote(value) {
    this.searchNotes = this.notes.filter(
      (val) => val['title'].includes(value));
    for (let p in this.searchNotes) {

    }
    this.contentModel = this.searchNotes[0].content;
  }

  toggleSideNav(sidenav:any) {
    sidenav.toggle();
  }

  onResize() {
    if (window.innerWidth <= 600) {
      this.mode = "over";
      this.backdrop = true;
      this.sideNavOpen = false;
    } else {
      this.mode = "side";
      this.backdrop = false;
      this.sideNavOpen = true;
    }
  }

}
