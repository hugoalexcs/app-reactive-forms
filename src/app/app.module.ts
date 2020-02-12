
import { AppRoutingModule } from './app-routing.module';

import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgExTableModule } from './NgExTable/ngex-table-module';
import { DialogModule } from './NgExDialog/dialog.module';
import { NgxMyDatePickerModule } from './ngxMyDatePicker/ngx-my-date-picker.module';
import { AppComponent } from './app.component';

import { HttpDataService } from './Services/http-data.service';
import { MessageService } from './Services/message.service'

import { httpClientIntercetor } from "./Services/http-client-intercetor";
import { DirtyWarning } from './Services/dirty-warning';
import { AjaxLoaderComponent } from './ajax-loader.component';
import { ProductListComponent } from './PageContents/product-list.component';
import { ProductComponent } from './PageContents/product.component';
import { ContactsComponent } from './PageContents/contacts.component';
import { SearchComponent } from './PageContents/search.component';
import { ValidateErrorComponent } from './InputValidator/validate-error.component';
import { SideMenuComponent } from './side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NameEditorComponent,
    ProfileEditorComponent,    
    AjaxLoaderComponent,
    SideMenuComponent,
    ProductListComponent,
    ProductComponent,
    ContactsComponent,
    SearchComponent,
    ValidateErrorComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,    
    CommonModule,
    HttpClientModule,
    FormsModule, 
    NgExTableModule,
    DialogModule,
    NgxMyDatePickerModule.forRoot(),  
  ],
  providers: [
    HttpDataService,
    [DirtyWarning],
    [
        { provide: HTTP_INTERCEPTORS, useClass: httpClientIntercetor, multi: true }
    ],
    [MessageService]
],
entryComponents: [
    ProductComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
