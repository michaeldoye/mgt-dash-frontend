import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfrimDialogComponent } from './auth/auth.service';
import { MaterialModule } from '../material.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ConfrimDialogComponent],
  entryComponents: [ConfrimDialogComponent],
  providers: [AngularFirestore]
})
export class CoreModule { }
