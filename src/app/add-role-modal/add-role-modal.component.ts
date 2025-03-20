import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.scss'],
})
export class AddRoleModalComponent {
  role = { name: '', description: '' };

  constructor(private modalController: ModalController, private roleService: RoleService) {}

  // Dismiss the modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // Save the role
  saveRole() {
    console.log('Saving Role:', this.role);
    if (this.role.name.trim() === '') {
      alert('Role name is required');
      return;
    }

    this.roleService.saveRole(this.role).subscribe(
      (data) => {
        alert('Role saved successfully');
        this.modalController.dismiss(true); // Pass true to indicate success
      },
      (error) => {
        alert('Failed to save role');
        console.error(error);
      }
    );
  }
}
