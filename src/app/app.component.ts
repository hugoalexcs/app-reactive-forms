import { Component, HostListener, ViewChild, ElementRef, OnInit, Renderer } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NgExDialogConfig } from './NgExDialog/dialog-config';
import { NgExTableConfig } from './NgExTable/ngex-table.config';
import { ExDialog } from "./NgExDialog/dialog.module";
import { DialogConfig, TableConfig, PageSizeList } from './Services/app.config';
import { httpClientIntercetor } from "./Services/http-client-intercetor";

import * as glob from './Services/globals';
import { SideMenuComponent } from './side-menu/side-menu.component';

export type EditorType = 'name' | 'profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(SideMenuComponent, { static: true }) sideMenuComponent: SideMenuComponent;
  @ViewChild("barButton", { static: true }) barButton: ElementRef;    
  showLoader: boolean = false;
  constructor(
      private ngExDialogConfig: NgExDialogConfig, 
      private ngExTableConfig: NgExTableConfig,
      private exDialog: ExDialog,
      private router: Router, private renderer: Renderer) {
  }
  title = 'app-reactive-forms';
  editor: EditorType = 'name';

    ngOnInit() {
      let pThis: any = this;
      //Merge config items.
      this.ngExDialogConfig.appConfig = DialogConfig;
      this.ngExTableConfig.appConfig = TableConfig;
      this.ngExTableConfig.appPageSizeList = PageSizeList;

      //value[0]: old route; value[1]: new route.
      //this.router.events.filter(value => value instanceof NavigationStart)
      //    .pairwise().subscribe((value: any) => {
      //        if (value[1].url != value[0].url) {
      //            //Dirty warning when clicking broswer navigation button or entering router matching URL.
      //            if (glob.caches.pageDirty) {
      //                //Use browser built-in dialog here. Any HTML template-based Angular dialog is processed after router action that has already reloaded target page. 
      //                if (window.confirm("Do you really want to discard data changes\nand leave the page?")) {
      //                    //Close any Angular dialog if opened.
      //                    if (pThis.exDialog.hasOpenDialog()) {                                
      //                        pThis.exDialog.clearAllDialogs();                                
      //                    }
      //                    //Reset flag.
      //                    glob.caches.pageDirty = false;
      //                }
      //                else {
      //                    //Cancel leaving action and stay on the page.
      //                    //This doesn't work.
      //                    value.preventDefault();                            
      //                }
      //            }
      //            else {
      //                //Auto close dialog if any is opened.
      //                if (pThis.exDialog.hasOpenDialog()) {
      //                    pThis.exDialog.clearAllDialogs();
      //                }
      //            }
      //        }
      //    });             
  }

  //Dirty warning when refreshing or closing browser.
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: any) {
      if (glob.caches.pageDirty) {
          let dialogText: string = "The page will be refreshed or rediracted to another site but there is unsaved data on this page.";
          event.returnValue = dialogText;
          return dialogText;
      }
  }  

  toggleCollapse() {
      let te = this.sideMenuComponent.menuItems.nativeElement.offsetHeight;
      if (te == 0) {
          this.renderer.setElementClass(this.sideMenuComponent.menuItems.nativeElement, "collapse", false);                        
      }
      else if (te > 0) {
          this.renderer.setElementClass(this.sideMenuComponent.menuItems.nativeElement, "collapse", true);            
      }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {         
      this.collapseSideMenu();      
  }

  onClickMenuItem($event) {
      this.collapseSideMenu();
  }

  collapseSideMenu() {
      //When both toggle button and side menu are shown, any resizing screen will close side menu.
      if (this.barButton.nativeElement.offsetHeight > 0 &&
          this.sideMenuComponent.menuItems.nativeElement.offsetHeight > 0) {
          this.renderer.setElementClass(this.sideMenuComponent.menuItems.nativeElement, "collapse", true);
      }  
  }

  get showNameEditor() {
    return this.editor === 'name';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}
