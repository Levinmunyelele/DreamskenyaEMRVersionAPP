import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { ModalController } from '@ionic/angular';
import { AddRoleModalComponent } from '../add-role-modal/add-role-modal.component';



@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.page.html',
})
export class RoleManagementPage implements OnInit {
  roles: any[] = [];
  privileges: any[] = [];

  constructor(private modalController: ModalController, private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
    this.loadPrivileges();
  }



  loadRoles() {
    this.roleService.getRoles().subscribe(
      (data) => {
        this.roles = data.results; // Adjust based on API response structure
        console.log('Updated roles:', this.roles);
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  
  

  loadPrivileges() {
    this.roleService.getPrivileges().subscribe(
      (data) => {
        console.log(data.results);
        
        this.privileges = data?.results?.map((privilege: { uuid: any; display: any;  links: any[]; }) => ({
          uuid: privilege.uuid,
          display: privilege.display,
          selfUri: privilege.links?.find(link => link.rel === 'self')?.uri
        })) || [];
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }
  async addRole() {
    const modal = await this.modalController.create({
      component: AddRoleModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadRoles();
      }
    });

    await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
  

  editRole(role: any) {
    const updatedRole = { ...role, description: 'Updated description' };
    this.roleService.updateRole(role.uuid, updatedRole).subscribe(
      (data) => {
        this.loadRoles();
      },
      (error) => {
        console.error('Error updating role:', error);
      }
    );
  }

  deleteRole(roleUuid: string) {
    this.roleService.deleteRole(roleUuid).subscribe(
      () => {
        console.log(`Role with UUID ${roleUuid} deleted successfully.`);
        this.loadRoles(); 
      },
      (error) => {
        console.error('Error deleting role:', error);
      }
    );
  }
  
}
